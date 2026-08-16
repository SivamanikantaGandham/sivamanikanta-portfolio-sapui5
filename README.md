# Sivamanikanta Gandham — SAPUI5 Portfolio

A genuine **SAPUI5 (OpenUI5) freestyle application** — `Component.js`, `manifest.json`,
XML views, a controller, and a JSON model — rebuilt from the original React/Three.js
portfolio. Same content (real experience, skills, projects, certifications — nothing
invented), presented as a standard freestyle UI5 app instead of a React SPA.

This is a **separate project** from the React version delivered earlier — pick whichever
one you want to actually deploy, or keep both.

## Why this is different from the React version

- Built entirely on `sap.m`, `sap.ui.layout`, `sap.f`, and `sap.tnt` — all part of the
  **open** OpenUI5 distribution (no proprietary SAP-only libraries like
  `sap.suite.ui.commons`), so it runs from the public OpenUI5 CDN and builds with the
  open-source `@ui5/cli` tooling.
- No 3D hero sphere — Three.js has no equivalent in the UI5 control library, and
  reimplementing it as a raw `sap.ui.core.HTML` embed would just be the old React/Three.js
  code wrapped in a UI5 shell, not an actual UI5 rewrite. The hero section keeps the
  gradient/glow background and tech-badge row instead.
- One XML view, one controller, one JSON model (`webapp/model/portfolio.json`) — edit
  that file to update your content; it's the single source of truth like
  `portfolio.js` was in the React version.

## Project structure

```
webapp/
  Component.js            app entry point
  manifest.json            app descriptor (models, deps, min UI5 version)
  index.html               bootstraps UI5 from the OpenUI5 CDN
  view/App.view.xml        the entire single-page layout (all sections)
  controller/App.controller.js   nav scrolling + resume/email/call/LinkedIn actions
  model/portfolio.json     all your content — edit this to update the site
  model/models.js          device model helper
  css/style.css            dark navy/cyan theme (matches the original design)
  i18n/i18n.properties      UI text + app title/description
  assets/                  resume PDF
  img/                     favicon
  Staticfile               Cloud Foundry staticfile buildpack config
ui5.yaml                   UI5 tooling config (framework version, libraries)
manifest.yml               Cloud Foundry deploy config (BTP trial)
```

## Local development

```bash
npm install
npm start
```
`npm start` runs `ui5 serve -o index.html`, which opens the app in your browser with
live reload. First run downloads the OpenUI5 framework libraries listed in `ui5.yaml`
(cached locally afterward).

Note: in dev mode the browser console shows a harmless `Component-preload.js` 404 —
`ui5 serve` doesn't generate preload bundles, so the framework falls back to loading
the individual files. It's cosmetic and does not affect the app.

## Production preview (local)

```bash
npm run build
npm run preview
```
`npm run preview` serves the self-contained `dist/` build at
http://localhost:8082 and opens it in your browser. This is the cleanest preview — no
CDN dependency and no dev-mode 404s, exactly what gets deployed.

## Production build

```bash
npm run build
```
This runs `ui5 build self-contained --all`, bundling the app **and** the OpenUI5 framework
itself into `dist/` — so the deployed site doesn't depend on the public CDN staying
reachable. The `--all` flag includes all framework dependency files so dynamically-loaded
modules (e.g. locale calendars) are present at runtime. Output is ~5 MB (mostly the
bundled framework runtime).

## Deploy to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo>.git
git push -u origin main
```
`.gitignore` excludes `node_modules/` and `dist/` — only source goes to GitHub.

## Deploy to SAP BTP Trial (Cloud Foundry, static site)

Same pattern as the React version — `manifest.yml` here points at `dist/` instead of
`build/`, since UI5's self-contained build is what gets deployed.

**1. Log in to your BTP trial Cloud Foundry environment:**
```bash
cf login -a https://api.cf.<your-region>.hana.ondemand.com
```
Find this under your BTP trial subaccount → Cloud Foundry → Overview.

**2. Target your org and space:**
```bash
cf target -o <your-org> -s dev
```

**3. Build, then push:**
```bash
npm run build
cf push
```

The app name in `manifest.yml` is `sivamanikanta-portfolio-ui5` — trial routes are
shared across all trial users, so if that hostname is taken, change `name:` in
`manifest.yml` (or run `cf push <different-name>`).

Once deployed:
```
https://<app-name>.cfapps.<region>.hana.ondemand.com
```

**If you'd rather deploy via the HTML5 Application Repository + a Launchpad content
site** (the more "SAP-native" route, giving you a tile in a Fiori Launchpad site instead
of a bare URL), that needs an `mta.yaml` and the `html5-apps-repo` / `portal` services
instead of `manifest.yml` — let me know and I'll set that up; it's a different deploy
shape from what's here.

## Editing content

Everything text-based lives in `webapp/model/portfolio.json` — contact info, stats,
skills, experience, projects, the SAP stack diagram, certifications, education, roadmap,
and the "why work with me" points. Change the JSON, refresh — no rebuild needed in dev
mode (`npm start`).

To swap the resume PDF, replace the file in `webapp/assets/` and update the filename
reference in `webapp/controller/App.controller.js` (`onDownloadResume`) if you rename it.
