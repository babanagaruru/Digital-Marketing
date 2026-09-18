# Python FastAPI Backend Architecture & Interview Cheatsheet

## Overview
This directory contains a parallel, production-ready Python backend implementing the exact same REST API contracts as the Node.js/Express server.

### Quick Start
```bash
# 1. Create a Python virtual environment (optional)
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# 2. Install dependencies
pip install -r requirements.txt

# 3. Start ASGI server
uvicorn main:app --reload --port 8000
```
Visit `http://localhost:8000/docs` for the interactive Swagger/OpenAPI UI!

---

## Technical Comparison: Node.js Express vs. Python FastAPI

| Feature | Node.js (Express + TypeScript) | Python (FastAPI + Pydantic) |
| :--- | :--- | :--- |
| **Language** | TypeScript / JavaScript | Python 3.10+ |
| **Concurrency** | Single-threaded Event Loop (libuv) | Async/Await with `asyncio` & ASGI |
| **Data Validation** | Manual / Zod / Joi | Automatic via Pydantic Type Hints |
| **API Documentation** | Manual Swagger configuration | Auto-generated interactive Swagger (`/docs`) |
| **Ecosystem Advantage** | Unified frontend/backend language | Rich Data Science, ML/AI, & Analytics libraries |
| **Ideal For** | High-throughput I/O, WebSockets, SPAs | AI pipelines, data processing, rapid prototyping |

---

## Interview Talking Point: "Why Both?"
> *"I designed the system to be clean and modular. For our primary production deployment in this project, I used Node.js/Express with SQLite to keep a unified TypeScript codebase between the React client and backend services.*
>
> *However, because digital marketing platforms frequently ingest high volumes of ad attribution data and run machine learning models for predictive churn and automated copy generation, I also designed an equivalent Python FastAPI microservice. This demonstrates my ability to work across both JavaScript and Python backend ecosystems."*
