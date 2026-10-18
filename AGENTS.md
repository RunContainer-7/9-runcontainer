# AGENTS.md

Guidance for AI agents and contributors working on this repository.

## What this is

A static VitePress website and documentation portal for RunContainer, a Windows application management and isolation tool. **This repo is the website only.** Never add application code, installers or release workflows for the desktop app.

## Layout

```
docs/
  index.md                      Landing page (VitePress home layout + <HomeSections/>)
  downloads.md, changelog.md, community.md
  guide/ getting-started/ user-guide/ troubleshooting/ safety/ reference/
  public/                       logo.svg, favicon.svg, icons/ (feature icons)
  .vitepress/
    config.mts                  Site config, nav, the single shared sidebar, base path
    project.ts                  ALL external links + releases (single source of truth)
    theme/
      index.ts                  Registers global components
      Layout.vue                Adds HeroVisual (home-hero-image) and Breadcrumbs (doc-before)
      custom.css                Theme tokens (dark default, light variant) + landing styles
      components/               HomeSections, HeroVisual, WorkflowSteps, Breadcrumbs,
                                ProjectLink, ReleaseList, CommunityLinks
.github/workflows/deploy-pages.yml   GitHub Pages deployment
netlify.toml                         Netlify build (base "/")
```

## Key decisions

- **Base path** comes from the `DOCS_BASE` env var (default `/`). The GitHub workflow sets it from `actions/configure-pages`' `base_path` output, so don't hardcode a repo name.
- **No invented links.** External project URLs live only in `project.ts`. Empty strings render as "not yet published" (`ProjectLink`, `CommunityLinks`, `ReleaseList`), and the GitHub social icon and edit links appear only when `repoUrl` is set. Don't link to project destinations anywhere else.
- **Breadcrumbs** are derived from the sidebar groups in `config.mts`. A new docs page must be added to the `sidebar` array to get breadcrumbs and prev/next links.
- **Docs structure mirrors LiveContainer's docs** (Intro → Installation → Guides → FAQ), extended with Troubleshooting, Safety and Reference.
- Spelling is British English (`lang: en-GB`).

## Content rules (mandatory)

- Describe user-facing behaviour only. Don't describe the underlying virtualisation or isolation technology, internal architecture, paths or development notes.
- Never claim complete security, malware protection or universal compatibility.
- Mark unconfirmed details (requirements, features, labels) as unconfirmed.
- Never invent releases, versions, checksums, dates, contact details or community channels.

## Conventions

- Use root-relative Markdown links without `.md` (for example `/user-guide/running`). VitePress applies the base path.
- In Vue components, wrap internal hrefs with `withBase()`.
- Use theme CSS variables (`--vp-c-*`) so both themes keep their contrast. Respect `prefers-reduced-motion`.
