# GitHub Pages Deployment & Blank Page Fix Guide

If your GitHub Pages project was showing a **blank white page**, this document explains exactly why it happened and how it is now fixed.

---

## 1. Why Did GitHub Pages Show a Blank Page?

### The Root Cause: Absolute Asset Paths
By default, Vite builds HTML with root-relative paths:
```html
<!-- ❌ Broken on GitHub Pages -->
<script type="module" src="/assets/index-xxx.js"></script>
<link rel="stylesheet" href="/assets/index-xxx.css">
```
When hosted on GitHub Pages, your URL is usually:
`https://<your-username>.github.io/<repository-name>/`

Because the asset path started with `/`, the browser tried to download files from:
`https://<your-username>.github.io/assets/index-xxx.js` (missing `/<repository-name>/`)!

GitHub replied with a **404 Not Found**. The JavaScript never loaded, so `<div id="root"></div>` stayed empty, producing a **blank page**.

---

## 2. What Was Fixed in This Codebase

1. **Configured Relative Base in `vite.config.ts`**:
   We added `base: './'` so all script and stylesheet tags are generated with relative URLs:
   ```html
   <!-- ✅ Works everywhere (root, subfolder, GitHub Pages) -->
   <script type="module" src="./assets/index-xxx.js"></script>
   <link rel="stylesheet" href="./assets/index-xxx.css">
   ```
2. **Added Automated GitHub Actions Workflow (`.github/workflows/deploy.yml`)**:
   Whenever you push to `main` or `master`, GitHub automatically builds and deploys your website directly to GitHub Pages without any manual steps!
3. **Resilient Static Host Handling**:
   When your site is hosted statically on GitHub Pages (where no active Node or Python server is running), the application automatically falls back to client-side storage (`localStorage`) and interactive simulation mode, so all forms, audits, calculators, and modals continue to work.

---

## 3. How to Enable GitHub Pages (2-Minute Setup)

Follow these steps on your GitHub repository:

1. Go to your repository on **GitHub.com**.
2. Click on **Settings** (top tab with gear icon).
3. In the left sidebar, click on **Pages** (under the "Code and automation" section).
4. Under **Build and deployment**:
   * Change **Source** from *"Deploy from a branch"* to **"GitHub Actions"**.
5. Push your latest code to GitHub:
   ```bash
   git add .
   git commit -m "Fix GitHub Pages blank page with relative base path"
   git push origin main
   ```
6. Click the **Actions** tab on your GitHub repository. You will see the **Deploy to GitHub Pages** workflow run and turn green (takes ~45 seconds).
7. Visit your live site at:
   `https://<your-username>.github.io/<repository-name>/`

Your site will now load instantly with no blank page!

---

## 4. Alternative: Deploying via `gh-pages` Branch (Manual Method)

If you prefer building locally and pushing to a `gh-pages` branch:

```bash
# 1. Install gh-pages
npm install --save-dev gh-pages

# 2. Build the project
npm run build

# 3. Deploy the dist folder to the gh-pages branch
npx gh-pages -d dist
```

Then in **Settings > Pages**, set the source branch to `gh-pages` and folder to `/(root)`.

---

## 5. Running the Backend Server (Express or Python)

GitHub Pages provides **static web hosting** (HTML/CSS/JS only). If you want to demonstrate the live backend and SQLite database to interviewers on your local machine or a cloud host (Render, Railway, Cloud Run):

* **Node.js Express Backend:**
  ```bash
  npm run dev
  # Visit http://localhost:3000
  ```

* **Python FastAPI Microservice:**
  ```bash
  cd backend_python
  pip install -r requirements.txt
  uvicorn main:app --reload --port 8000
  # Interactive Swagger API docs available at: http://localhost:8000/docs
  ```
