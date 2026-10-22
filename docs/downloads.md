---
title: Downloads
description: Official RunContainer releases and source code.
aside: false
---

<script setup lang="ts">
import { project } from './.vitepress/project'
const latest = project.latestDownload
</script>

# Downloads

RunContainer is **free and open source**. Its source code is at [github.com/RunContainer-7/runcontainer](https://github.com/RunContainer-7/runcontainer).

<div class="rc-dl-status">
  <span class="rc-badge rc-badge--stable">Stable</span>
  <p><strong>RunContainer {{ latest.version }} is available for Windows.</strong></p>
  <p><a :href="latest.url">Download {{ latest.filename }}</a> (about {{ latest.sizeMb }} MB)</p>
  <p>SHA-256: <code>{{ latest.sha256 }}</code></p>
  <p>Full notes are on the <a :href="latest.releaseUrl">release page</a>.</p>
</div>

::: danger Beware of unofficial downloads
Any file presented as a RunContainer installer that isn't linked from this page is **not official**. Don't run it.
:::

## How to check your download

Before you run the installer, compare its checksum with the SHA-256 value above. In PowerShell, in the folder with the file:

```powershell
Get-FileHash .\RunContainer-Setup-0.6.8.exe -Algorithm SHA256
```

If the hash doesn't match, delete the file and download it again from this page.

## Release channels

| Channel | Purpose | Status |
| --- | --- | --- |
| **Stable** | Recommended for general use | Available: {{ latest.version }} |
| **Preview** | Early builds for testing, which may contain bugs | Earlier build: 0.5.0 |
| **Source code** | Browse or build from source | <ProjectLink to="repoUrl" label="Source repository" /> |

## Published releases

<ReleaseList />

## Installation requirements

RunContainer's installer is built for **64-bit Windows (x64)** and supports Windows 10 and Windows 11, Home through Education. Virtual-machine environments need a Pro, Enterprise or Education edition plus virtualization support. See [Prerequisites](/getting-started/prerequisites) for details and [Installation](/getting-started/installation) for the steps.

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
