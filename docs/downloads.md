---
title: Downloads
description: Official RunContainer releases and source code.
aside: false
---

# Downloads

RunContainer is **free and open source**. Its source code is at [github.com/RunContainer-7/runcontainer](https://github.com/RunContainer-7/runcontainer).

<div class="rc-dl-status">
  <span class="rc-badge rc-badge--preview">Preview</span>
  <p><strong>RunContainer 0.5.0 preview is available for Windows.</strong> It's an early build for testing, so expect rough edges. There's no stable release yet.</p>
  <p><a href="https://github.com/RunContainer-7/runcontainer/releases/download/v0.5.0/RunContainer-Setup-0.5.0.exe">Download RunContainer-Setup-0.5.0.exe</a> (about 100 MB)</p>
  <p>SHA-256: <code>0b624bdbac04c26f58c1ff30072cbb8096204c7267ca9333a0c64e9548b8ee16</code></p>
  <p>Full notes are on the <a href="https://github.com/RunContainer-7/runcontainer/releases/tag/v0.5.0">release page</a>.</p>
</div>

::: danger Beware of unofficial downloads
Any file presented as a RunContainer installer that isn't linked from this page is **not official**. Don't run it.
:::

## How to check your download

Before you run the installer, compare its checksum with the SHA-256 value above. In PowerShell, in the folder with the file:

```powershell
Get-FileHash .\RunContainer-Setup-0.5.0.exe -Algorithm SHA256
```

If the hash doesn't match, delete the file and download it again from this page.

## Release channels

| Channel | Purpose | Status |
| --- | --- | --- |
| **Stable** | Recommended for general use | <span class="rc-unpublished-tag">not yet available</span> |
| **Preview** | Early builds for testing, which may contain bugs | Available: 0.5.0 |
| **Source code** | Browse or build from source | <ProjectLink to="repoUrl" label="Source repository" /> |

## Published releases

<ReleaseList />

## Installation requirements

RunContainer's installer is built for 64-bit Windows. Official supported Windows versions and system requirements haven't been confirmed yet. See [Prerequisites](/getting-started/prerequisites) for what's currently known, and [Installation](/getting-started/installation) for the steps.

## Stay informed

New releases are announced on this page and in the [Changelog](/changelog). Official project links are listed on [Community & links](/community).

<style>
.rc-dl-status {
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 20px 22px;
  margin: 24px 0;
  background: var(--vp-c-bg-soft);
}
.rc-dl-status p { margin: 10px 0 0; }
</style>
