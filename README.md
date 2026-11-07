# davidollerhead.com

The personal website and portfolio landing page of **David Ollerhead**, live at [davidollerhead.com](https://davidollerhead.com).

---

## Current Version (2026)

A focused, single-file landing page featuring tactile interactive push buttons, smooth physics, and modern web standards.

- **Structure:** Zero-build static architecture ([index.html](./index.html))
- **Styling:** Vanilla CSS with custom properties, light/dark themes, and system fonts
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

The site is served by GitHub Pages directly from the root of the `main` branch. Merging a pull request into `main` deploys it automatically, usually within a minute. An empty `.nojekyll` file skips Jekyll processing so files are served as-is.

---

## Repository Archive & History

This repository preserves 20 years of iterations and experiments across web development eras:

| Era / Version | Code at Tag | Archive Branch | Description & Tech Stack |
| :--- | :--- | :--- | :--- |
| **Current (2026)** | [`2026`](https://github.com/oller/davidollerhead.com/tree/2026) | `main` | Minimal tactile landing page (vanilla CSS, Vexo analytics, semantic landmarks). |
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
