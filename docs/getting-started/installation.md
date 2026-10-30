<script setup lang="ts">
import { project } from '../.vitepress/project'
const latest = project.latestDownload
const nightly = project.latestNightly
</script>

# Installation

::: tip Only download from Downloads
**Only download RunContainer from the [Downloads](/downloads) page.** Files claiming to be RunContainer that aren't linked from that page aren't official.
:::

## Install on Windows

1. Open the [Downloads](/downloads) page and download the installer for your edition:
   - **Stable** (recommended): <code>{{ latest.filename }}</code>
   - **Nightly** (experimental, blue): <code>{{ nightly.filename }}</code>

   They install separately, so installing Nightly does not replace Stable or its apps.
2. Check the file's SHA-256 checksum against the value on that page (see [Downloads](/downloads#how-to-check-your-download)).
3. Run the installer and follow the setup wizard. You can choose a different install folder. The wizard creates a desktop shortcut. Windows may warn you about the file; the section below explains why.
4. Open RunContainer from the desktop shortcut or the Start menu.

## Windows may still warn you (and that is expected)

Stable 0.9.3 is self-signed. Older Stable installers and Nightly remain unsigned. Windows does not trust a self-signed certificate by default, so it may still show an unknown-publisher or untrusted-certificate warning. SmartScreen can also warn about files without an established reputation.

Compare the file's SHA-256 with the checksum for your edition on [Downloads](/downloads). A match confirms the file matches that listing, but does not establish that the file is safe. If your browser or security software flags it, do not assume the warning is a false positive or disable protection; investigate or ask for help before proceeding.

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
