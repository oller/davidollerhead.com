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

| Era / Year | Tag | Branch | Description & Tech Stack |
| :--- | :--- | :--- | :--- |
| **2026** (Current) | [`2026`](https://github.com/oller/davidollerhead.com/releases/tag/2026) | `main`, `gh-pages` | Single-page tactile landing page (Tailwind CSS 4, Vexo, semantic landmark tags). |
| **2021** | [`2021`](https://github.com/oller/davidollerhead.com/releases/tag/2021) | `gh-pages` | Initial migration to a minimal single-page GitHub Pages site. |
| **2015** | [`2015`](https://github.com/oller/davidollerhead.com/releases/tag/2015) | `archive/jekyll-2015` | Final Grunt & Jekyll build with Critical CSS, Parker CSS metrics, responsive image LQIP, and blog posts. |
| **2014** | [`2014`](https://github.com/oller/davidollerhead.com/releases/tag/2014) | `archive/jekyll-2015` | Full rewrite with Yeoman (`generator-jekyllrb`), Grunt, Bower, Singularity grid, and Sass. |
| **2013** | [`2013`](https://github.com/oller/davidollerhead.com/releases/tag/2013) | `archive/jekyll-2015` | First Jekyll portfolio iteration with PureCSS, HTML5 Boilerplate, and JAPR asset pipeline. |
| **2006** | [`2006`](https://github.com/oller/davidollerhead.com/releases/tag/2006) | `2006` | Nostalgic archive of original site (XHTML 1.0 Strict, Prototype.js, Scriptaculous, Flash `.swf`, and Photoshop `.psd` designs). |

To explore any previous version, simply check out its tag:

```bash
# Example: Check out the 2006 retro site
git checkout 2006

# Example: Check out the 2015 Jekyll blog & portfolio
git checkout 2015
```
