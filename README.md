# RunContainer website

The public website and documentation portal for **RunContainer**, a Windows application management and isolation tool for installing and running Windows applications inside environments managed by RunContainer.

This repository contains only the website. It doesn't contain the RunContainer application.

## What's included

- **Landing page:** overview, features, workflow diagram, getting started, system requirements, responsible use, FAQ, changelog highlights and contribution information.
- **Documentation portal:** Introduction, Getting started, User guide, Troubleshooting, Safety & privacy and Reference, with local full-text search, sidebar navigation, breadcrumbs and previous/next links.
- **Downloads**, **Changelog** and **Community & links** pages that show "not yet published" until real, verified destinations exist.

## Technology

- [VitePress](https://vitepress.dev/) 1.x with Markdown content
- Vue single-file components and custom CSS in `docs/.vitepress/theme/`
- Dark theme by default, with a light theme toggle
- Static output, so no backend is required

## Run locally

Requires Node.js 20 or later.

```bash
npm ci
npm run docs:dev       # dev server with hot reload
npm run docs:build     # production build → docs/.vitepress/dist
npm run docs:preview   # preview the production build
```

## Adding official links and releases

All external project links and releases are defined in **`docs/.vitepress/project.ts`**. Empty values show as "not yet published" across the site. When the source repository, issue tracker, security channel, community platforms or releases become public, add them there. The header GitHub icon, edit links, Downloads, Changelog and Community pages then update automatically.

## Deployment

### Netlify

`netlify.toml` installs dependencies with `npm ci`, builds with `npm run docs:build` and publishes `docs/.vitepress/dist` with base path `/`.

### GitHub Pages

`.github/workflows/deploy-pages.yml` builds and deploys the site on every push to `main`. The base path is taken from GitHub Pages itself (`actions/configure-pages`), so it's correct for project sites (`/<repo>/`), `<user>.github.io` repositories and custom domains, without any hardcoding.

One-time setup when the repository is hosted on GitHub:

1. Push this repository to GitHub.
2. Go to **Settings → Pages → Build and deployment** and set **Source** to **GitHub Actions**.
3. Push to `main`, or run the workflow manually from the **Actions** tab.
4. The site will then be at `https://<owner>.github.io/<repository>/`. For this repository's name, that's `https://<owner>.github.io/runcontainer-website/`.

The workflow uses only `contents: read`, `pages: write` and `id-token: write`, and needs no secrets.

## Content rules

The public text follows these rules. Please keep them when editing:

- Describe user-facing behaviour only, not internal implementation or isolation technology.
- Never promise complete security, malware protection or universal compatibility.
- Never invent releases, download links, versions, requirements or community channels.
