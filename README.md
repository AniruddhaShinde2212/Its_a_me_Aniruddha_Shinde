# aniruddha.dataeng — Personal Portfolio

> A data-engineering themed personal website built with React + Vite.  
> Terminal aesthetic. Green on black. Deployed via GitHub Actions.

---

## Live site
>> https://aniruddhashinde2212.github.io/Its_a_me_Aniruddha_Shinde/

---

## What this is

A personal portfolio website styled to look and feel like a data engineering workspace — think Databricks notebooks, terminal logs, and REST API explorers — rather than a generic portfolio template.

**Four pages, each with a data engineering theme:**

| Route | Theme | Content |
|---|---|---|
| `/home` | Terminal + Delta table | Hero block, skills table, live pipeline DAG, Medallion Architecture |
| `/schema` | Database schema browser | Resume as a queryable Delta table, experience records, DESCRIBE sidebar |
| `/logs` | Application log stream | Career timeline as `journalctl` output, grep filter, live tail mode |
| `/status` | REST API health dashboard | Contact info as API endpoints, POST message form, availability status |

---

## Tech stack

| Tool | Version | Purpose |
|---|---|---|
| React | 19 | UI component framework |
| Vite | 8 | Dev server and production bundler |
| JetBrains Mono | — | Monospace font (via Google Fonts) |
| CSS Variables | — | Theming — dark terminal green palette |
| GitHub Actions | — | CI/CD — auto build and deploy on every push |

No additional runtime dependencies. No routing library — navigation is a single `useState` in `App.jsx`.

---

## Project structure

```
aniruddha-portfolio/
├── .github/
│   └── workflows/
│       └── deploy.yml            # GitHub Actions — build + deploy pipeline
├── index.html                    # Entry point — loads fonts, mounts React
├── package.json                  # Dependencies and npm scripts
├── vite.config.js                # Vite build configuration
│
└── src/
    ├── main.jsx                  # React root mount
    ├── App.jsx                   # Page router (useState-based)
    ├── App.css                   # App shell styles
    ├── index.css                 # Global CSS variables + utilities
    │
    ├── components/
    │   ├── Nav/
    │   │   ├── Nav.jsx           # Top nav bar — terminal prompt + live UTC clock
    │   │   └── Nav.css
    │   └── StatusBar/
    │       ├── StatusBar.jsx     # Bottom VS Code-style status bar
    │       └── StatusBar.css
    │
    └── pages/
        ├── Home/
        │   ├── Home.jsx          # Landing page — hero, skills, pipeline, architecture
        │   └── Home.css
        ├── Schema/
        │   ├── Schema.jsx        # Resume — Delta table schema view
        │   └── Schema.css
        ├── Logs/
        │   ├── Logs.jsx          # About / career — log stream view
        │   └── Logs.css
        └── Status/
            ├── Status.jsx        # Contact — API health dashboard
            └── Status.css
```

---

## Running locally

**Prerequisites:** Node.js 18 or above.

```bash
# 1. Clone the repo
git clone https://github.com/aniruddha/portfolio.git
cd portfolio

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
```

Open `http://localhost:5173` in your browser.  
The dev server supports hot module replacement — save a file and the browser updates instantly without a full reload.

---

## Building for production

```bash
npm run build
```

Output goes to the `dist/` folder. To preview the production build locally before pushing:

```bash
npm run preview
```

---

## Deployment — GitHub Actions

This project uses **GitHub Actions** for automated CI/CD. Every push to the `main` branch triggers the workflow automatically — no manual steps needed after the initial setup.

### How the pipeline works

```
Push to main
    │
    ▼
.github/workflows/deploy.yml triggers
    │
    ├── Checkout code
    ├── Setup Node.js 20
    ├── npm install
    ├── npm run build  →  dist/
    │
    ▼
Deploy dist/ to hosting target
```

### Workflow file

The workflow lives at `.github/workflows/deploy.yml`:

```yaml
name: Deploy Portfolio

on:
  push:
    branches:
      - main
  workflow_dispatch:        # allows manual trigger from GitHub UI

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Deploy
        # Replace this step depending on your hosting target
        # See options below
```

### Hosting target options

**GitHub Pages** — add this as the Deploy step:

```yaml
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v4
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

Then go to your repo → Settings → Pages → set Source to `gh-pages` branch.

> If your site is served from a subdirectory (e.g. `github.com/username/portfolio`),  
> add `base: '/portfolio/'` to `vite.config.js` so asset paths resolve correctly.

**Vercel** — add this as the Deploy step:

```yaml
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          working-directory: ./
```

**Netlify** — add this as the Deploy step:

```yaml
      - name: Deploy to Netlify
        uses: nwtgck/actions-netlify@v3
        with:
          publish-dir: './dist'
          production-branch: main
          github-token: ${{ secrets.GITHUB_TOKEN }}
          deploy-message: "Deploy from GitHub Actions"
        env:
          NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
          NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
```

### Adding secrets

For Vercel or Netlify deployments, you need to add secrets to your GitHub repo:

1. Go to your repo on GitHub
2. Settings → Secrets and variables → Actions → New repository secret
3. Add the required tokens (e.g. `VERCEL_TOKEN`, `NETLIFY_AUTH_TOKEN`)

The `GITHUB_TOKEN` for GitHub Pages is provided automatically — no setup needed.

### Triggering a deployment manually

Go to your repo → Actions → Deploy Portfolio → Run workflow → Run workflow.  
Useful when you want to redeploy without pushing a code change.

### Checking deployment status

Go to your repo → Actions tab. Each run shows:

- ✅ Green — build succeeded, site is live
- ❌ Red — something failed, click the run to see the logs
- 🟡 Yellow — currently running

---

## Is GitHub Actions free for this project?

**Yes — completely free**, as long as your repository is public.

GitHub Actions is free and unlimited for public repositories on standard GitHub-hosted runners. For private repos, the free tier includes 2,000 minutes/month (resets monthly), and your spending limit defaults to $0 — so you cannot be charged without explicitly raising it.

A typical portfolio build (install + build) takes under 2 minutes. Even on a private repo you'd get ~1,000 free deploys per month before hitting any limit.

---

## Customisation guide

### Change your content — no JSX knowledge needed

All personal data lives in arrays and objects at the **top of each page file**. Edit the values and the UI updates automatically on next deploy.

| File | What to edit | What changes |
|---|---|---|
| `src/pages/Home/Home.jsx` | `SKILLS_TABLE` array | Skills Delta table on the home page |
| `src/pages/Home/Home.jsx` | `PIPELINE_STEPS` array | Live Airflow DAG widget |
| `src/pages/Schema/Schema.jsx` | `EXPERIENCE` array | Work experience record |
| `src/pages/Schema/Schema.jsx` | `SKILLS_DATA` array | Full skills table with proficiency levels |
| `src/pages/Schema/Schema.jsx` | `EDUCATION` object | Education panel |
| `src/pages/Logs/Logs.jsx` | `LOG_ENTRIES` array | Career timeline log entries |
| `src/pages/Status/Status.jsx` | `ENDPOINTS` array | Contact API endpoints |
| `src/pages/Status/Status.jsx` | `METRICS` array | Health check cards |

### Change the colour scheme

All colours are CSS variables in `src/index.css`:

```css
--green:  #4ade80;   /* primary accent — change this to retheme the whole site */
--bg:     #080c08;   /* page background */
```

### Change the font

**Step 1** — swap the Google Fonts URL in `index.html`:

```html
<link href="https://fonts.googleapis.com/css2?family=YOUR_FONT&display=swap" rel="stylesheet" />
```

**Step 2** — update the variable in `src/index.css`:

```css
--font-body:    'Your Font', monospace;
--font-display: 'Your Font', monospace;
```

Popular monospace alternatives: `Fira Code`, `Cascadia Code`, `Source Code Pro`, `IBM Plex Mono`.

### Add your photo

Place your photo in the `public/` folder as `profile.jpg`.

In `src/pages/Home/Home.jsx`, find the `.photo-placeholder` div and replace it:

```jsx
<img
  src="/profile.jpg"
  alt="Aniruddha Shinde"
  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
/>
```

---

## Key design decisions

**No routing library** — navigation is a single `useState('home')` in `App.jsx`. The `pages` object maps page names to components. Simple, zero-dependency, and easy to extend.

**Data at the top, JSX at the bottom** — every page file keeps all personal data in arrays/objects at the top. You can update your resume content without touching any JSX.

**CSS variables for everything** — colours, fonts, spacing, and radii are all defined as variables in `index.css`. One variable change propagates across the whole site instantly.

**One CSS file per component** — each `.jsx` file has a matching `.css` file imported at the top. No CSS-in-JS, no Tailwind — plain CSS scoped by class naming convention.

**Scanline overlay** — `body::before` in `index.css` adds a subtle repeating-gradient scanline effect for the terminal aesthetic without any extra libraries.

---

## Author

**Aniruddha Shinde**  
Data Engineer — Pune, India

| | |
|---|---|
| Email | [aniruddhashinde2212@gmail.com](mailto:aniruddhashinde2212@gmail.com) |
| LinkedIn | [linkedin.com/in/aniruddha](https://linkedin.com/in/aniruddhas1) |
| GitHub | [github.com/aniruddha](https://github.com/aniruddhashinde2212) |
| Phone | +91 7038182738 |

---

## Licence

Personal project — not licensed for reuse. Free to use as inspiration.
