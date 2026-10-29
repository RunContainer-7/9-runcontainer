---
title: Downloads
description: Official RunContainer Stable and Nightly installers and checksums.
aside: false
---

<script setup lang="ts">
import { project } from './.vitepress/project'
const latest = project.latestDownload
const nightly = project.latestNightly
</script>

# Downloads

RunContainer is **free and open source**. Its source code is at [github.com/RunContainer-7/runcontainer](https://github.com/RunContainer-7/runcontainer).

## Download RunContainer

Two editions are published for 64-bit Windows 10 and 11. They install separately, so you can keep both.

<div class="rc-dl-grid">
  <article class="rc-dl-card rc-dl-card--stable">
    <span class="rc-badge rc-badge--stable">Stable</span>
    <h3>RunContainer {{ latest.version }}</h3>
    <p class="rc-dl-lede">The green edition. Recommended for everyday use.</p>
    <a class="rc-dl-button" :href="latest.url">Download Stable</a>
    <p class="rc-dl-file"><code>{{ latest.filename }}</code></p>
    <p class="rc-dl-meta">64-bit Windows · about {{ latest.sizeMb }} MB</p>
    <details>
      <summary>SHA-256 checksum</summary>
      <code class="rc-dl-hash">{{ latest.sha256 }}</code>
    </details>
    <p class="rc-dl-links">
      <a :href="latest.releaseUrl">Release notes</a>
      <span aria-hidden="true">·</span>
      <a :href="project.releasesUrl">All releases</a>
    </p>
  </article>
  <article class="rc-dl-card rc-dl-card--nightly">
    <span class="rc-badge rc-badge--nightly">Nightly</span>
    <h3>RunContainer Nightly {{ nightly.version }}</h3>
    <p class="rc-dl-lede">The blue early-access edition. Experimental: expect bugs.</p>
    <a class="rc-dl-button rc-dl-button--quiet" :href="nightly.url">Download Nightly</a>
    <p class="rc-dl-file"><code>{{ nightly.filename }}</code></p>
    <p class="rc-dl-meta">64-bit Windows · about {{ nightly.sizeMb }} MB</p>
    <details>
      <summary>SHA-256 checksum</summary>
      <code class="rc-dl-hash">{{ nightly.sha256 }}</code>
    </details>
    <p class="rc-dl-links">
      <a :href="nightly.releaseUrl">Release notes</a>
      <span aria-hidden="true">·</span>
      <a :href="project.releasesUrl">All releases</a>
    </p>
  </article>
</div>

::: tip Which one should I download?
Most people want **Stable**. Choose **Nightly** only if you want early access to experimental features and are comfortable with bugs and changes between builds. Both are unsigned; check the checksum for the file you downloaded.
:::

## Choose your version

| | Stable | Nightly |
| --- | --- | --- |
| Best for | Everyday use | Early access and testing experimental features |
| Look | Green and teal | Blue |
| Updates | Stable releases | Nightly prereleases |
| Developer mode | Not included since Stable 0.9.1; existing VM files are left in place | Included in Settings; enables the experimental Virtualise tab and technical RC-Brain details |
| Reliability | Recommended for most users | Experimental: bugs and changes are expected |

They install into separate folders and keep **separate app libraries, settings, updates and virtual machines**. Installing Nightly does not copy your Stable apps or machines, and it does not delete them: Stable's files stay in `%APPDATA%\RunContainer`, Nightly's in `%APPDATA%\RunContainer Nightly`.

::: warning Windows may still warn about the installer
The current Stable and Nightly installers are **not code-signed**, so Windows may show “Unknown publisher” or other warnings. Compare the SHA-256 value above with the file you downloaded before running it. A warning alone does not establish whether a download is safe. Do not turn off real-time protection. See [Installation](/getting-started/installation) for more information.
:::

::: danger Beware of unofficial downloads
Only download RunContainer from official project links. Check the file and its checksum before running it.
:::

## How to check your download

Before running an installer, compare its checksum with the SHA-256 value for the edition you downloaded. In PowerShell, in the folder with the file, use `Get-FileHash` with the installer filename and `-Algorithm SHA256`. If the hash does not match, delete the file and download it again from the official link.

## Published releases

Stable releases are listed below. Nightly prereleases are published separately, on the [GitHub releases page](https://github.com/RunContainer-7/runcontainer/releases).

<ReleaseList />

## Installation requirements

RunContainer's installer is built for **64-bit Windows (x64)** and supports Windows 10 and Windows 11. See [Prerequisites](/getting-started/prerequisites) for details and [Installation](/getting-started/installation) for the steps.

## Code signing

**The current installers are not code-signed.** Windows may show “Unknown publisher”; compare the SHA-256 of your download with the value above. The project's application to the [SignPath Foundation](https://signpath.org/) was declined for now; the project can reapply after gaining broader public recognition. Signing identifies who built a file and helps verify it was not altered; it is not a claim that the software is safe.

## Stay informed

New releases are announced on this page and in the [Changelog](/changelog). Official project links are listed on [Community & links](/community).

<style>
.rc-dl-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 18px;
  margin: 24px 0 8px;
}
.rc-dl-card {
  border: 1px solid var(--vp-c-divider);
  border-radius: 14px;
  padding: 22px 24px 18px;
  background: var(--vp-c-bg-soft);
}
.rc-dl-card--stable {
  border-color: color-mix(in srgb, var(--vp-c-brand-1) 45%, var(--vp-c-divider));
}
.rc-dl-card h3 {
  margin: 12px 0 6px;
  font-size: 1.25rem;
}
.rc-dl-lede { margin: 0 0 18px; color: var(--vp-c-text-2); }
.rc-dl-button {
  display: block;
  text-align: center;
  padding: 10px 14px;
  border-radius: 8px;
  font-weight: 600;
  color: var(--vp-c-bg);
  background: var(--vp-c-brand-1);
  text-decoration: none;
}
.rc-dl-button:hover { background: var(--vp-c-brand-2); }
.rc-dl-button--quiet {
  color: var(--vp-c-text-1);
  background: transparent;
  border: 1px solid color-mix(in srgb, #2f6fed 55%, var(--vp-c-divider));
}
.rc-dl-button--quiet:hover {
  color: var(--vp-c-bg);
  background: #2f6fed;
}
.rc-dl-file { margin: 12px 0 0; font-size: 0.82rem; overflow-wrap: anywhere; }
.rc-dl-meta { margin: 6px 0 0; font-size: 0.82rem; color: var(--vp-c-text-2); }
.rc-dl-card details { margin-top: 12px; font-size: 0.82rem; }
.rc-dl-card summary { cursor: pointer; color: var(--vp-c-text-2); }
.rc-dl-hash {
  display: block;
  margin-top: 8px;
  padding: 8px;
  border-radius: 6px;
  font-size: 0.72rem;
  line-height: 1.5;
  overflow-wrap: anywhere;
  background: var(--vp-c-bg-alt);
}
.rc-dl-links { margin: 16px 0 0; font-size: 0.85rem; display: flex; gap: 8px; flex-wrap: wrap; }
.rc-dl-links a { font-weight: 500; }
.rc-badge--nightly {
  color: #dce8ff;
  background: color-mix(in srgb, #2f6fed 28%, transparent);
  border: 1px solid color-mix(in srgb, #2f6fed 55%, transparent);
}
</style>
