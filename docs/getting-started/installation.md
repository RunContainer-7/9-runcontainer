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
3. Run the installer and follow the setup wizard. You can choose a different install folder. The wizard creates a desktop shortcut.
4. Open RunContainer from the desktop shortcut or the Start menu.

If Windows warns about the file, the installer isn't code-signed. Continue only if you downloaded it from the official Downloads page. See [Windows warns me about the file](/troubleshooting/setup#windows-warns-me-about-the-file).

Then read [First launch](/getting-started/first-launch) to see what to expect when you open RunContainer, or follow the [Walkthrough](/getting-started/walkthrough).

## Building from source

RunContainer is free and open source. The source is at [github.com/RunContainer-7/runcontainer](https://github.com/RunContainer-7/runcontainer). The repository's README gives these steps (RunContainer is a Windows application):

1. Clone the repository: `git clone https://github.com/RunContainer-7/runcontainer.git`
2. Open the folder and install dependencies: `npm install`
3. Start the app: `npm start`

The repository's package.json also includes a Windows installer build (`npm run dist`), which produces the same kind of setup file as the release.
