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
  <p v-if="latest.sha256">SHA-256: <code>{{ latest.sha256 }}</code></p>
  <p v-else>The SHA-256 checksum is added here once the release build is published.</p>
  <p>Full notes are on the <a :href="latest.releaseUrl">release page</a>.</p>
</div>

::: warning Windows may still warn about the installer
Release installers are **not code-signed**, so Windows shows “Unknown publisher” and you should check the SHA-256 value above before you run the file. Windows may show a blue “Windows protected your PC” box, and Microsoft Defender or your browser may label the download as a virus or “potentially unwanted software”, or remove it from your Downloads folder. That is a reputation false positive for a newly published build, not a detection of known malware.

Do **not** turn off real-time protection. The exact steps to verify the file, restore it from Protection history and install it anyway are in [Installation → Windows will probably warn you](/getting-started/installation#windows-may-still-warn-you-and-that-is-expected).
:::

::: danger Beware of unofficial downloads
Any file presented as a RunContainer installer that isn't linked from this page is **not official**. Don't run it.
:::

## How to check your download

Before you run the installer, compare its checksum with the SHA-256 value above. In PowerShell, in the folder with the file:

<code>Get-FileHash .\{{ latest.filename }} -Algorithm SHA256</code>

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

## Code signing

**Release installers are not code-signed at the moment.** Windows therefore shows “Unknown publisher”, and the SHA-256 value above is what to check your download against.

RunContainer was built for the [SignPath Foundation](https://signpath.org/) programme, which signs qualifying open-source Windows software at no cost, and the release workflow is ready for it. That application was declined for now: the programme issues its own certificate only to projects that already show public traction, such as stars, contributors and coverage elsewhere, and it invited a reapplication once RunContainer has more of it. Releases therefore publish unsigned rather than failing.

Once a signing service is in place:

- It signs only the installer that the project's release workflow built from the tagged commit, on GitHub-hosted runners. Forks and modified builds are never covered.
- The signature is read back off the file with `Get-AuthenticodeSignature` before the installer is attached to the release, and a release whose installer is not validly signed fails instead of publishing.
- Every signing request is approved by a person, so nothing is signed by a machine without review.
- Signing roles and the privacy statement will be set out in [Policies](/policies).

You can verify a download yourself by comparing its SHA-256 with the value above:

<code>Get-FileHash .\{{ latest.filename }} -Algorithm SHA256</code>

Signing identifies who built the file and proves it has not been altered since. It is not a claim that the software is safe.

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
