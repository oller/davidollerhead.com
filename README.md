# davidollerhead.com

Personal website of **David Ollerhead**, live at [davidollerhead.com](https://davidollerhead.com).

## Stack

Built with [Eleventy 3](https://www.11ty.dev/) (`src/` → `_site/`), featuring the tactile D/O landing page alongside `/now/` and `/notes/`.

- **Styling:** Vanilla CSS with `light-dark()` theming, a View Transitions circular theme wipe, a CSS anchor-positioned nav hover pill, and system fonts.
- **Syntax Highlighting:** Build-time [Shiki](https://shiki.style/) (`@shikijs/markdown-it`) using `catppuccin-latte` (light) and `tokyo-night` (dark), switched via CSS.
- **Feeds:** Atom feed for notes at `/feed.xml` (`@11ty/eleventy-plugin-rss`).
- **Analytics:** [Vexo](https://vexo.co).
- **Hosting:** [GitHub Pages](https://pages.github.com) on `gh-pages` with custom domain (`CNAME: davidollerhead.com`).

## Local Development

```bash
npm install
npm run dev    # live-reloading dev server at http://localhost:8080/
npm run build  # production build into _site/
```

## Content

### Notes

Add a Markdown file under `src/notes/` (e.g. `src/notes/my-note.md`):

```markdown
---
title: Your Note Title
date: 2026-11-19
description: Short summary for metadata.
slug: my-note
---

Note content in Markdown...
```

- `title` (required): Shown in `/notes/`, on the note page, and in `/feed.xml`.
- `date` (required): `YYYY-MM-DD`; notes sort reverse-chronologically.
- `description` (optional): Meta description for the page.
- `slug` (optional): Overrides the URL slug (defaults to the filename).

Each file builds to `/notes/<slug>/` and is automatically listed in `/notes/` and `/feed.xml`.

### Now page

Edit `src/now.md` and bump the `updated` (`YYYY-MM-DD`) frontmatter date.

## Deployment & PR Previews

- **Production:** Pushes to `main` (and manual `workflow_dispatch` runs) trigger [deploy.yml](.github/workflows/deploy.yml), which builds `_site/` (including `CNAME` and `.nojekyll`) and publishes it to the `gh-pages` branch while preserving `pr-preview/`.
- **PR previews:** Pull requests trigger [pr-preview.yml](.github/workflows/pr-preview.yml), which builds the branch with `--pathprefix=/pr-preview/pr-<number>/` (rewriting URLs via `EleventyHtmlBasePlugin`), deploys it to `https://davidollerhead.com/pr-preview/pr-<number>/`, posts a sticky preview link on the PR, and removes the preview when the PR closes.

## Archive & History

This repository keeps 20 years of previous versions as tags and archive branches:

| Version | Tag | Branch | Tech Stack |
| :--- | :--- | :--- | :--- |
| **Current** | - | `main` | Eleventy 3, vanilla CSS (`light-dark()`, View Transitions, anchor positioning), Shiki, Atom feed. |
| **Single-page (2026)** | [`2026`](https://github.com/oller/davidollerhead.com/tree/2026) | - | Single-file tactile D/O landing page (vanilla CSS, Vexo analytics). |
| **Jekyll v2 (2014–2015)** | [`2015`](https://github.com/oller/davidollerhead.com/tree/2015) | `archive/jekyll-2015` | Blog & portfolio built with Yeoman, Grunt, Sass, and critical CSS inlining. |
| **Jekyll v1 (2013–2014)** | [`2013`](https://github.com/oller/davidollerhead.com/tree/2013) | `archive/jekyll-2015` | Original Jekyll site with YUI PureCSS, HTML5 Boilerplate, and JAPR. |
| **Classic (2006)** | [`2006`](https://github.com/oller/davidollerhead.com/tree/2006) | `2006` | XHTML 1.0 Strict, Prototype.js, Scriptaculous, Flash `.swf`, and Photoshop designs. |

Check out any tag to inspect an older version (e.g. `git checkout 2006` or `git checkout 2015`).
