"""
ApexDigital Growth Studio - Python FastAPI Microservice Backend Companion
--------------------------------------------------------------------------
This is a production-grade FastAPI backend demonstrating Python-based RESTful API
development with SQLite database persistence, Pydantic type validation, and
OpenAPI documentation.

Can be run via:
    pip install -r requirements.txt
    uvicorn main:app --reload --port 8000
"""

from fastapi import FastAPI, HTTPException, Query, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr, Field
from typing import Optional, List
import sqlite3
import datetime
import uuid
import os

app = FastAPI(
    title="ApexDigital Lead Engine API",
    description="Backend microservice for digital marketing lead capture, audit scoring, and database management.",
    version="1.0.0"
)

# Enable CORS for frontend client
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

DB_FILE = os.path.join(os.path.dirname(__file__), "database.sqlite")

def get_db_connection():
    """Create a database connection with dict-like row access."""
    conn = sqlite3.connect(DB_FILE)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    """Initialize SQLite tables."""
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.executescript("""
        CREATE TABLE IF NOT EXISTS leads (
            id TEXT PRIMARY KEY,
            name TEXT NOT NULL,
            business_name TEXT NOT NULL,
            email TEXT NOT NULL,
            phone TEXT,
            website_url TEXT,
            service TEXT NOT NULL,
            budget TEXT NOT NULL,
            message TEXT NOT NULL,
            status TEXT NOT NULL DEFAULT 'New',
            created_at TEXT NOT NULL,
            updated_at TEXT
        );

        CREATE TABLE IF NOT EXISTS audits (
            id TEXT PRIMARY KEY,
            website_url TEXT NOT NULL,
            speed_score INTEGER NOT NULL,
            seo_score INTEGER NOT NULL,
            mobile_score INTEGER NOT NULL,
            tracking_health TEXT,
            issues_json TEXT,
            quick_wins_json TEXT,
            created_at TEXT NOT NULL
        );
    """)
    conn.commit()

    # Seed initial leads if empty
    cursor.execute("SELECT COUNT(*) as count FROM leads")
    if cursor.fetchone()["count"] == 0:
        cursor.execute("""
            INSERT INTO leads (id, name, business_name, email, phone, website_url, service, budget, message, status, created_at, updated_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, (
            "lead-py-1",
            "Sarah Jenkins",
            "Aura Lifestyle Co.",
            "sarah@auralifestyle.io",
            "+1 (555) 234-5678",
            "https://auralifestyle.example.com",
            "all_in_one",
            "$3,000 - $5,000/mo",
            "Looking to scale our e-commerce store with Meta Ads and fix mobile speed.",
            "Qualified",
            datetime.datetime.utcnow().isoformat(),
            datetime.datetime.utcnow().isoformat()
        ))
        conn.commit()
    conn.close()

# Run DB initialization on startup
init_db()

# --- Pydantic Data Models ---
class LeadCreate(BaseModel):
    name: str = Field(..., min_length=2, description="Client full name")
    businessName: str = Field(..., min_length=2, description="Company/brand name")
    email: EmailStr = Field(..., description="Business email address")
    phone: Optional[str] = None
    websiteUrl: Optional[str] = None
    service: str = Field(default="all_in_one", description="Requested marketing service")
    budget: str = Field(default="$1,500 - $3,500 / month")
    message: Optional[str] = "Website inquiry"

class LeadUpdateStatus(BaseModel):
    status: str = Field(..., regex="^(New|Qualified|Proposal Sent|Closed)$")

class LeadResponse(BaseModel):
    id: str
    name: str
    businessName: str
    email: str
    phone: Optional[str]
    websiteUrl: Optional[str]
    service: str
    budget: str
    message: str
    status: str
    createdAt: str

# --- REST Endpoints ---
@app.get("/api/health")
def health_check():
    """Health check endpoint providing runtime and database metrics."""
    conn = get_db_connection()
    leads_count = conn.execute("SELECT COUNT(*) as count FROM leads").fetchone()["count"]
    audits_count = conn.execute("SELECT COUNT(*) as count FROM audits").fetchone()["count"]
    conn.close()

    return {
        "status": "healthy",
        "runtime": "Python 3.10+ / FastAPI (ASGI)",
        "database": "SQLite 3",
        "stats": {
            "total_leads": leads_count,
            "total_audits": audits_count
        }
    }

@app.get("/api/leads", response_model=dict)
def get_leads(
    status: Optional[str] = Query(None, description="Filter by status: New, Qualified, Proposal Sent"),
    search: Optional[str] = Query(None, description="Search by name, business or email")
):
    """Retrieve all leads from SQLite with optional filtering."""
    conn = get_db_connection()
    query = "SELECT * FROM leads WHERE 1=1"
    params = []

    if status and status != "all":
        query += " AND status = ?"
        params.append(status)

    if search:
        query += " AND (name LIKE ? OR business_name LIKE ? OR email LIKE ?)"
        pattern = f"%{search}%"
        params.extend([pattern, pattern, pattern])

    query += " ORDER BY created_at DESC"
    cursor = conn.execute(query, params)
    rows = cursor.fetchall()
    conn.close()

    leads = []
    for r in rows:
        leads.append({
            "id": r["id"],
            "name": r["name"],
            "businessName": r["business_name"],
            "email": r["email"],
            "phone": r["phone"],
            "websiteUrl": r["website_url"],
            "service": r["service"],
            "budget": r["budget"],
            "message": r["message"],
            "status": r["status"],
            "createdAt": r["created_at"]
        })

    return {"success": True, "count": len(leads), "leads": leads}

@app.post("/api/leads", status_code=status.HTTP_201_CREATED)
def create_lead(lead_in: LeadCreate):
    """Validate and insert a new lead into SQLite database using parameterized SQL."""
    lead_id = f"lead-py-{int(datetime.datetime.utcnow().timestamp())}-{uuid.uuid4().hex[:4]}"
    now_iso = datetime.datetime.utcnow().isoformat()

    conn = get_db_connection()
    conn.execute("""
        INSERT INTO leads (id, name, business_name, email, phone, website_url, service, budget, message, status, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, (
        lead_id,
        lead_in.name.strip(),
        lead_in.businessName.strip(),
        lead_in.email.lower().strip(),
        lead_in.phone.strip() if lead_in.phone else None,
        lead_in.websiteUrl.strip() if lead_in.websiteUrl else None,
        lead_in.service,
        lead_in.budget,
        lead_in.message.strip() if lead_in.message else "Website inquiry",
        "New",
        now_iso,
        now_iso
    ))
    conn.commit()
    conn.close()

    return {
        "success": True,
        "message": "Lead saved in SQLite database via FastAPI.",
        "lead": {
            "id": lead_id,
            "name": lead_in.name,
            "businessName": lead_in.businessName,
            "email": lead_in.email,
            "phone": lead_in.phone,
            "websiteUrl": lead_in.websiteUrl,
            "service": lead_in.service,
            "budget": lead_in.budget,
            "message": lead_in.message,
            "status": "New",
            "createdAt": now_iso
        }
    }

@app.patch("/api/leads/{lead_id}")
def update_lead_status(lead_id: str, update: LeadUpdateStatus):
    """Update lead pipeline status in database."""
    conn = get_db_connection()
    cursor = conn.execute(
        "UPDATE leads SET status = ?, updated_at = ? WHERE id = ?",
        (update.status, datetime.datetime.utcnow().isoformat(), lead_id)
    )
    conn.commit()
    affected = cursor.rowcount
    conn.close()

    if affected == 0:
        raise HTTPException(status_code=404, detail="Lead ID not found.")

    return {"success": True, "leadId": lead_id, "updatedStatus": update.status}

@app.delete("/api/leads/{lead_id}")
def delete_lead(lead_id: str):
    """Delete a lead record from database."""
    conn = get_db_connection()
    cursor = conn.execute("DELETE FROM leads WHERE id = ?", (lead_id,))
    conn.commit()
    affected = cursor.rowcount
    conn.close()

    if affected == 0:
        raise HTTPException(status_code=404, detail="Lead ID not found.")

    return {"success": True, "message": f"Lead {lead_id} removed."}
