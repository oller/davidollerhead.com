# davidollerhead.com

The personal website of **David Ollerhead**, live at [davidollerhead.com](https://davidollerhead.com).

---

## Current Version (2026)

A minimal personal site built with [Eleventy](https://www.11ty.dev/), preserving the tactile D/O landing page alongside `/now/` and `/notes/` sections.

- **Static Site Generator:** [Eleventy 3.x](https://www.11ty.dev/) (`src/` → `_site/`)
- **Styling:** Vanilla CSS with custom properties, light/dark themes, View Transitions circular wipe, and system fonts
- **Syntax Highlighting:** Build-time highlighting via [Shiki](https://shiki.style/) (`@shikijs/markdown-it`) using `tokyo-night` (dark) and `github-light` (light), switched purely via CSS
- **Feeds:** Atom feed for notes at `/feed.xml` (`@11ty/eleventy-plugin-rss`)
- **Interactions:** Custom skeuomorphic / neumorphic "D" and "O" toggle buttons on the homepage with custom cubic-bezier transitions and programmatic press on load
- **Analytics:** [Vexo](https://vexo.co)
- **Hosting:** [GitHub Pages](https://pages.github.com) via custom domain (`CNAME: davidollerhead.com`)

---

## Local Development

Install dependencies first:

```bash
npm install
```

Start the Eleventy dev server with live reload:

```bash
npm run dev
```

Build the production site into `_site/`:

```bash
npm run build
```

---

## Writing a New Note

Notes live in `src/notes/` as Markdown files (for example, `src/notes/my-note.md`).

Each note uses YAML frontmatter at the top of the file:

```markdown
---
title: Your Note Title
date: 2026-11-19
description: Short summary for metadata.
slug: my-note
---

Note content in Markdown...
```

- `title` (required): Display title in `/notes/`, on the note page, and in `/feed.xml`.
- `date` (required): Publication date (`YYYY-MM-DD`); notes are listed reverse-chronologically.
- `description` (optional): Meta description for the note page.
- `slug` (optional): Overrides the URL slug. If omitted, Eleventy uses the filename (`fileSlug`).

A note with `slug: my-note` (or filename `my-note.md`) builds to `_site/notes/my-note/index.html` and is served at `/notes/my-note/`. It is automatically included in `/notes/` and `/feed.xml`.

---

## Deployment Workflow

The site is built and deployed to GitHub Pages via the [GitHub Actions workflow](.github/workflows/deploy.yml) on pushes to `main` (and manual `workflow_dispatch` runs). The workflow runs `npm ci` and `npm run build`, then uploads `_site/` with `actions/upload-pages-artifact` and deploys with `actions/deploy-pages`. `CNAME` and `.nojekyll` are copied into `_site/` during the build.

> **Important (post-merge step):** After merging these changes into `main`, switch GitHub Pages in repository **Settings → Pages → Build and deployment → Source** from **Deploy from a branch** to **GitHub Actions**.

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
