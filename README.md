# aniruddha.dataeng — Personal Portfolio

> A data-engineering themed personal website built with React + Vite.  
> Terminal aesthetic. Green on black. Deployed and live.

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

No additional dependencies. No routing library — navigation is a single `useState` in `App.jsx`.

---

## Project structure

```
aniruddha-portfolio/
├── index.html                        # Entry point — loads fonts, mounts React
├── package.json                      # Dependencies and npm scripts
├── vite.config.js                    # Vite build configuration
│
└── src/
    ├── main.jsx                      # React root mount
    ├── App.jsx                       # Page router (useState-based)
    ├── App.css                       # App shell styles
    ├── index.css                     # Global CSS variables + utilities
    │
    ├── components/
    │   ├── Nav/
    │   │   ├── Nav.jsx               # Top nav bar — terminal prompt + live UTC clock
    │   │   └── Nav.css
    │   └── StatusBar/
    │       ├── StatusBar.jsx         # Bottom VS Code-style status bar
    │       └── StatusBar.css
    │
    └── pages/
        ├── Home/
        │   ├── Home.jsx              # Landing page — hero, skills, pipeline, architecture
        │   └── Home.css
        ├── Schema/
        │   ├── Schema.jsx            # Resume — Delta table schema view
        │   └── Schema.css
        ├── Logs/
        │   ├── Logs.jsx              # About / career — log stream view
        │   └── Logs.css
        └── Status/
            ├── Status.jsx            # Contact — API health dashboard
            └── Status.css
```

---

## Running locally

**Prerequisites:** Node.js 18 or above.

```bash
# 1. Clone or unzip the project
cd aniruddha-portfolio

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
```

Open `http://localhost:5173` in your browser.  
The dev server supports hot module replacement — save a file and the browser updates instantly.

---

## Building for production

```bash
npm run build
```

Output goes to the `dist/` folder. This is what you deploy.

To preview the production build locally before deploying:

```bash
npm run preview
```

---

## Deployment

This project is a standard static site — the `dist/` folder after `npm run build` contains everything needed.

### Vercel (recommended)

```bash
npm install -g vercel
vercel
```

Vercel auto-detects Vite. Accept all defaults. Subsequent deployments:

```bash
vercel --prod
```

### Netlify

Drag and drop the `dist/` folder at [app.netlify.com/drop](https://app.netlify.com/drop), or connect your GitHub repo and set:

- Build command: `npm run build`
- Publish directory: `dist`

### GitHub Pages

```bash
npm install -D gh-pages
```

Add to `package.json` scripts:

```json
"deploy": "gh-pages -d dist"
```

Then:

```bash
npm run build
npm run deploy
```

---

## Customisation guide

### Change your content — no JSX knowledge needed

All personal data lives in arrays and objects at the **top of each page file**. Edit those values and the UI re-renders automatically.

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

All colours are CSS variables in `src/index.css`. The two lines that control everything:

```css
--green:  #4ade80;   /* primary accent — change this to change the whole theme */
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

**Data at the top, JSX at the bottom** — every page file keeps all personal data in arrays/objects at the top. You can update your resume without touching any JSX.

**CSS variables for everything** — colours, fonts, spacing, and radii are all defined as variables in `index.css`. One variable change propagates across the whole site instantly.

**One CSS file per component** — each `.jsx` file has a matching `.css` file imported at the top. No CSS-in-JS, no Tailwind — plain CSS scoped by naming convention.

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
