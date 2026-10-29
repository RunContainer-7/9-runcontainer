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

## Choose your version

RunContainer has **two editions** for Windows:

| | Stable | Nightly |
| --- | --- | --- |
| Best for | Everyday use | Early access and testing experimental features |
| Look | Green and teal | Blue |
| Updates | Stable releases | Nightly prereleases |
| Developer mode | Present in the current Stable 0.9.0; planned to move to Nightly in a future Stable update | Available in Settings; enables the experimental Virtualise tab and technical RC-Brain details |
| Reliability | Recommended for most users | Experimental: bugs and changes are expected |

They install separately and keep **separate app libraries, settings and updates**. Installing Nightly does not automatically copy your Stable apps or virtual machines. Existing Stable VM files are not deleted by installing Nightly.

## Stable

<div class="rc-dl-status">
  <span class="rc-badge rc-badge--stable">Stable</span>
  <p><strong>RunContainer {{ latest.version }} is available for Windows.</strong></p>
  <p><a :href="latest.url">Download {{ latest.filename }}</a> (about {{ latest.sizeMb }} MB)</p>
  <p v-if="latest.sha256">SHA-256: <code>{{ latest.sha256 }}</code></p>
  <p v-else>The SHA-256 checksum is added here once the release build is published.</p>
  <p>Full notes are on the <a :href="latest.releaseUrl">release page</a>.</p>
</div>

## Nightly

The first Nightly is **0.9.1-nightly.1**, based on Stable 0.9.0. It establishes the separate experimental edition; future Nightly releases can introduce features early. Expect bugs, particularly in the experimental VM tools.

[Download RunContainer-Nightly-Setup-0.9.1-nightly.1.exe](https://github.com/RunContainer-7/runcontainer/releases/download/v0.9.1-nightly.1/RunContainer-Nightly-Setup-0.9.1-nightly.1.exe) (about 104 MB) · [Nightly release page](https://github.com/RunContainer-7/runcontainer/releases/tag/v0.9.1-nightly.1)

SHA-256: `14e2a7bbef93ecf55a6f97c539dbb334757bbd652f9ed7bfd40baa4cfab64b04`

::: warning Windows may still warn about the installer
The current Stable and Nightly installers are **not code-signed**, so Windows may show “Unknown publisher” or other warnings. Check the appropriate SHA-256 value above before running a file. A warning alone does not establish whether a download is safe. Do not turn off real-time protection. See [Installation](/getting-started/installation) for more information.
:::

::: danger Beware of unofficial downloads
Only download RunContainer from official project links. Check the file and its checksum before running it.
:::

## How to check your download

Before running an installer, compare its checksum with the SHA-256 value for the edition you downloaded. In PowerShell, in the folder with the file, use `Get-FileHash` with the installer filename and `-Algorithm SHA256`. If the hash does not match, delete the file and download it again from the official link.

## Published releases

<ReleaseList />

## Installation requirements

RunContainer's installer is built for **64-bit Windows (x64)** and supports Windows 10 and Windows 11. See [Prerequisites](/getting-started/prerequisites) for details and [Installation](/getting-started/installation) for the steps.

## Code signing

**The current installers are not code-signed.** Windows may show “Unknown publisher”; compare the SHA-256 of your download with the value above. The project's application to the [SignPath Foundation](https://signpath.org/) was declined for now; the project can reapply after gaining broader public recognition. Signing identifies who built a file and helps verify it was not altered; it is not a claim that the software is safe.

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
