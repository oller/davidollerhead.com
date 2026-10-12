# davidollerhead.com

The personal website and portfolio landing page of **David Ollerhead**, live at [davidollerhead.com](https://davidollerhead.com).

---

## Current Version (2026)

A focused, single-file landing page featuring tactile interactive push buttons, smooth physics, and modern web standards.

- **Structure:** Zero-build static architecture ([index.html](./index.html))
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com) via browser runtime
- **Interactions:** Custom skeuomorphic / neumorphic "D" and "O" toggle buttons with custom cubic-bezier transitions and programmatic press on load
- **Analytics:** [Vexo](https://vexo.co)
- **Hosting:** [GitHub Pages](https://pages.github.com) via custom domain (`CNAME: davidollerhead.com`)

---

## Local Development

Because the site is a self-contained static page, no build step or package manager is required. You can serve it locally using any static web server:

```bash
npx serve .
```

Then open `http://localhost:3000` in your browser.

---

## Deployment Workflow

The site is served by GitHub Pages from the `gh-pages` branch. 

To deploy changes made on `main`:

```bash
git push origin main
git push origin main:gh-pages
```

---

## Repository Archive & History

This repository preserves 20 years of iterations and experiments across web development eras:

| Era / Version | Code at Tag | Archive Branch | Description & Tech Stack |
| :--- | :--- | :--- | :--- |
| **Current (2026)** | [`2026`](https://github.com/oller/davidollerhead.com/tree/2026) | `main` | Minimal tactile landing page (Tailwind CSS 4, Vexo analytics, semantic landmarks). |
| **Jekyll v2 (2014–2015)** | [`2015`](https://github.com/oller/davidollerhead.com/tree/2015) | `archive/jekyll-2015` | Full blog & portfolio built with Yeoman, Grunt, Sass, Critical CSS inlining, and case studies. |
| **Jekyll v1 (2013–2014)** | [`2013`](https://github.com/oller/davidollerhead.com/tree/2013) | `archive/jekyll-2015` | Original Jekyll iteration with YUI PureCSS, HTML5 Boilerplate, and JAPR asset pipeline. |
| **Classic (2006)** | [`2006`](https://github.com/oller/davidollerhead.com/tree/2006) | `2006` | Nostalgic archive of original site (XHTML 1.0 Strict, Prototype.js, Scriptaculous, Flash `.swf`, and Photoshop designs). |

To explore any previous version, simply check out its tag:

```bash
# Example: Check out the 2006 retro site
git checkout 2006

# Example: Check out the 2015 Jekyll blog & portfolio
git checkout 2015
```
