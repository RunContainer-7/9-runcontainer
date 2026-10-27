<script setup lang="ts">
import { project } from '../.vitepress/project'
const latest = project.latestDownload
</script>

# Installation

::: tip Only download from Downloads
**Only download RunContainer from the [Downloads](/downloads) page.** Files claiming to be RunContainer that aren't linked from that page aren't official.
:::

## Install on Windows

1. Open the [Downloads](/downloads) page and download <code>{{ latest.filename }}</code>.
2. Check the file's SHA-256 checksum against the value on that page (see [Downloads](/downloads#how-to-check-your-download)).
3. Run the installer and follow the setup wizard. You can choose a different install folder. The wizard creates a desktop shortcut. Windows may warn you about the file; the section below explains why, and exactly how to get past it safely.
4. Open RunContainer from the desktop shortcut or the Start menu.

## Windows may still warn you (and that is expected)

Release installers are signed for open source through the [SignPath Foundation](https://signpath.org/) — **free code signing provided by SignPath.io, certificate by SignPath Foundation** — so a signed build shows a publisher instead of “Unknown publisher”.

Signing is not a promise of silence. SmartScreen reputation is built from clean downloads over time, so a brand-new version can still be treated as an unknown file, and any release published before signing was in place is unsigned. You may therefore still see one or both of these:

- **SmartScreen:** a blue “Windows protected your PC” box. Click **More info**, check the app name is RunContainer and that the publisher is either unknown or SignPath Foundation, then click **Run anyway**.
- **Microsoft Defender or your browser:** a “file contains a virus or potentially unwanted software” warning, or the file disappears from your Downloads folder. This is a reputation false positive, not a detection of known malware. Open **Windows Security → Virus & threat protection → Protection history**, find the RunContainer entry and choose **Restore** (or **Allow on device**).

**This is not malware.** RunContainer is an open-source Windows launcher. It does not install itself as a service, does not add itself to startup, and does not upload your files. Every build published here is produced by the public GitHub Actions workflow from the public source at [github.com/RunContainer-7/runcontainer](https://github.com/RunContainer-7/runcontainer). You do not have to take our word for it:

1. **Check the checksum.** Compare the SHA-256 on the [Downloads](/downloads) page with <code>Get-FileHash .\{{ latest.filename }} -Algorithm SHA256</code>. A mismatch means the file is not the published build.
2. **Read the code.** The whole application, including the installer script and the release workflow, is in the repository. Nothing is minified away from inspection.
3. **Build it yourself.** `git clone`, `npm install`, `npm run dist` produces an installer from the same source. See [Building from source](#building-from-source).

Do **not** turn off real-time protection permanently to install RunContainer. Restore or allow the one file, install, and leave protection on. If your security product keeps flagging it, submit the file to Microsoft as a false positive and open an issue so we can look at it.

Earlier releases were unsigned as well; this section exists because the warnings are the most common support question.

Then read [First launch](/getting-started/first-launch) to see what to expect when you open RunContainer, or follow the [Walkthrough](/getting-started/walkthrough).

## Upgrading, including from 0.6.5

Run the current installer from [Downloads](/downloads) over your existing copy. Your apps and environments are kept; only the application files are replaced.

If you are still on **0.6.5**, you may have seen the app stop with a “Cannot find module” JavaScript error before its window opened. That build could not start, so its own update notice never ran and it cannot update itself. Download the current installer and run it once by hand. It closes any leftover RunContainer process — including an error window from the crashed copy — before replacing files. From 0.6.6 onward the app starts normally and shows an update notice for later releases.

## Building from source

RunContainer is free and open source. The source is at [github.com/RunContainer-7/runcontainer](https://github.com/RunContainer-7/runcontainer). The repository's README gives these steps (RunContainer is a Windows application):

1. Clone the repository: `git clone https://github.com/RunContainer-7/runcontainer.git`
2. Open the folder and install dependencies: `npm install`
3. Start the app: `npm start`

The repository's package.json also includes a Windows installer build (`npm run dist`), which produces the same kind of setup file as the release.
