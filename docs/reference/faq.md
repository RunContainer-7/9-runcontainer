<script setup lang="ts">
import { project } from '../.vitepress/project'
const latest = project.latestDownload
</script>

# Frequently asked questions

## General

### What is RunContainer?

A Windows application management and isolation tool. With it, you install and run Windows applications inside environments that RunContainer manages, instead of directly on your PC. → [Introduction](/guide/introduction)

### Is it like LiveContainer?

The idea is similar. [LiveContainer](https://github.com/LiveContainer/LiveContainer) lets iOS apps run inside its own managed space instead of being installed on the device directly. RunContainer applies the same idea to Windows applications. The two are separate, unrelated projects.

### Is RunContainer free?

RunContainer is free and open source. Its source code is public at [github.com/RunContainer-7/runcontainer](https://github.com/RunContainer-7/runcontainer). It is released under the MIT licence. The full text is in the [LICENSE file](https://github.com/RunContainer-7/runcontainer/blob/master/LICENSE).

### Is it available now?

Yes. RunContainer {{ latest.version }} is the current stable release for Windows. The official installer is on the [Downloads](/downloads) page and on the [GitHub Releases page](https://github.com/RunContainer-7/runcontainer/releases/latest); both point at the same file, verifiable by its SHA-256 checksum. There is an official download link, and it has been available since the first release.

### Will RunContainer update itself?

No. When a newer release is published, RunContainer shows a notice at the top of the window. It never installs an update for you. To update, download the new installer from [Downloads](/downloads) and run it over the existing installation. Your environments and applications stay in place. You can dismiss the notice, and it returns when the next version is published.

### How do I install RunContainer if I don't have it yet?

Download <code>{{ latest.filename }}</code> from [Downloads](/downloads) or the [latest GitHub release](https://github.com/RunContainer-7/runcontainer/releases/latest), then follow [Installation](/getting-started/installation). Stable installers from 0.9.3 onward are self-signed; older Stable installers and Nightly are unsigned. Windows may warn for either, because self-signed certificates are not publicly trusted.

### I am on 0.6.5 and it stops with a JavaScript error

0.6.5 could fail before its window opened, so its own update notice never appeared and it cannot update itself. Download the current installer from [Downloads](/downloads) and run it once by hand. It replaces the broken files, keeps your apps and environments, and closes the leftover 0.6.5 process (including its error window) before installing. Later releases update from the in-app notice as usual.

### Is there an iPhone companion?

Yes, as an experimental feature. An iPhone companion is a home-screen web app that connects to RunContainer on a Windows PC and shows an app that is already running there. It does not run Windows executables or iOS apps on the phone itself, and it cannot start an app: start it on the PC first. Remote access needs the PC switched on and a network path between the two, either the same Wi-Fi or a private network such as Tailscale. → [iPhone companion](/user-guide/companion)

The documentation website is not the companion. It describes RunContainer; it does not connect to your PC.

## Using RunContainer

### Can I use applications I already have installed?

Applications installed directly on your PC stay where they are. To use an application inside RunContainer, install it into an environment. → [Installing applications](/user-guide/applications)

### Can I run applications from more than one environment at once?

Yes. Each application runs in its own environment. → [Running & stopping](/user-guide/running)

### Why do I have to sign in again in a new environment?

Each environment keeps its own copy of an application's settings and sign-ins. → [Settings & profiles](/user-guide/settings)

### Will every Windows application work?

No. Applications that need drivers, system services, anti-cheat or deep system access often don't. → [Unsupported applications](/troubleshooting/unsupported-apps)

## Safety

### Does RunContainer protect me from malware?

No. Isolation reduces the impact an application has on the rest of your PC, but it isn't malware protection or a guarantee of safety. → [Isolation is not a guarantee](/safety/not-a-guarantee)

### Is it safe to sign into accounts inside an environment?

Only as safe as the application itself. The application can see whatever you type into it. → [Privacy & credentials](/safety/privacy)

### How do I report a security problem?

→ [Reporting security issues](/reference/security)

## Project

### How can I help?

→ [Contributing](/reference/contributing)

### Where's the source code?

RunContainer is free and open source. The source code is at [github.com/RunContainer-7/runcontainer](https://github.com/RunContainer-7/runcontainer). → [Community & links](/community#source-code)

### Where can I get support?

Visit the [Support page](/support) for the Discord server and tips on asking for help.
