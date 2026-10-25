/**
 * Single source of truth for every public, external project link.
 *
 * Only add a URL here once it is real, public and approved. Empty strings
 * are rendered across the site as "not yet published" instead of a link,
 * so nothing on the website ever points to an invented destination.
 */
export interface CommunityLink {
  name: string
  url: string
  description: string
}

export const project = {
  name: 'RunContainer',
  tagline: 'Run Windows applications inside managed environments.',

  /** Public source repository. RunContainer is free and open source. */
  repoUrl: 'https://github.com/RunContainer-7/runcontainer',
  /** Issue tracker for bug reports and feature requests. */
  issuesUrl: 'https://github.com/RunContainer-7/runcontainer/issues',
  /** Published releases page. */
  releasesUrl: 'https://github.com/RunContainer-7/runcontainer/releases',
  /** Community chat server for questions and support. */
  discordUrl: 'https://discord.gg/UKTGRMMmC4',
  /** Official video guides: how RunContainer works, shown step by step. */
  youtubeUrl: 'https://www.youtube.com/@RunContainer',
  /** Private vulnerability reporting channel (e.g. GitHub security advisories). */
  securityUrl: '',
  /** Officially established community platforms only. */
  community: [] as CommunityLink[],

  /** The current Stable installer. Used by the Downloads and Installation pages. */
  latestDownload: {
    version: '0.7.4',
    filename: 'RunContainer-Setup-0.7.4.exe',
    url: 'https://github.com/RunContainer-7/runcontainer/releases/download/v0.7.4/RunContainer-Setup-0.7.4.exe',
    releaseUrl: 'https://github.com/RunContainer-7/runcontainer/releases/tag/v0.7.4',
    sha256: 'c51b3ffca02d13d4ad208ad2872706836a33181224a9efaabd2837656a10ff3e',
    sizeMb: 98.8,
  },

  /** Published releases, newest first. */
  releases: [
    {
      version: '0.7.4',
      date: '2026-10-25',
      channel: 'stable',
      url: 'https://github.com/RunContainer-7/runcontainer/releases/tag/v0.7.4',
      notes: [
        'Apps that ask Windows for administrator rights now start instead of failing. Windows refuses them to a normal process with error 740 (this is what stopped the VirtualBox setup), so RunContainer recognises the refusal, asks Windows for approval once, and starts the same contained launcher elevated. The Job Object caps and the app’s own data folder still apply; the window stays on your desktop and is labelled administrator-approved, because Windows does not allow a normal process to host an elevated window.',
        'Stop and Reset work for those apps too. An elevated launcher cannot be killed from a normal process, so Stop is delivered through a file it polls, and it ends the whole job rather than just the first process.',
        'The app list shows each application’s real icon next to its name. Icons were being extracted with a command that never received the file path, so every app fell back to a phone placeholder; they are now real PNGs extracted from the executable and shown inline, and older entries are converted on the next start. An app without an icon gets a clean lettered tile.',
        'RC-Brain was retrained on the elevation evidence and now treats a 740 refusal as an environment condition rather than a reason to restart the app. Familiar-holdout accuracy is 99.6% (action 98.5%), unseen families 96.8%, final split 96.3% (action 95.0%), with zero unsafe actions.',
        'The documentation now says the whole idea in one sentence — “an app that opens other apps inside itself” — and has an animated Simulation page, also embedded in the introduction, that plays the flow: pick an app, press Run, the window opens inside RunContainer.',
        'Reset & remove no longer contradicts itself: Reset keeps the environment, the installed app and its files; only Delete removes them. Administrator apps and the 740 case are documented in Install & launch errors and in Known limitations.',
      ],
    },
    {
      version: '0.7.3',
      date: '2026-10-23',
      channel: 'stable',
      url: 'https://github.com/RunContainer-7/runcontainer/releases/tag/v0.7.3',
      notes: [
        'Run no longer leaves a standalone window on the desktop. Graphical apps are started with a hidden first window, hosted inside RunContainer the moment that window exists, and the second RunContainer window opens as soon as you press Run so there is a RunContainer surface on screen from the first second.',
        'Fixed RC-Brain restarting apps that were correctly shown inside RunContainer. Its window check only looked at ordinary top-level windows, so a hosted window counted as missing and the app was diagnosed as hung and restarted. The check now walks the whole window tree and recognises windows hosted by RunContainer itself.',
        'Hosting is much quicker: the Win32 host assembly is cached and warmed in the background, and the watcher starts before the app. On the test PC the app window was inside RunContainer 126 ms after containment was confirmed, down from about two seconds.',
        'Pressing Run on an already-running app now hosts its existing window instead of leaving it on the desktop. Installers use the same RunContainer window as apps, so setup never covers the main window’s controls.',
        'If Windows refuses to host a window (for example an app that asks for administrator rights), the window is shown on the desktop instead of staying invisible, and RunContainer keeps trying.',
      ],
    },
    {
      version: '0.7.2',
      date: '2026-10-23',
      channel: 'stable',
      url: 'https://github.com/RunContainer-7/runcontainer/releases/tag/v0.7.2',
      notes: [
        'RunContainer keeps watching while an app runs instead of looking for a window once at launch. Installer wizards that open their real window from a second process, apps that show a splash first and dialogs that appear later are hosted as they appear, usually within half a second.',
        'Fixed the glitchy layout: resizing a hosted window used to move every descendant window — including the app’s own buttons and panels — which threw its interface apart. Only the window RunContainer actually hosts is moved now.',
        'Dialogs keep their own size and are centred instead of being stretched, maximised windows are restored before hosting, and windows are hidden while they are moved so they no longer jump across the screen.',
        'RunContainer follows the app’s process tree, so an installer that re-launches itself from a temporary folder is still recognised, and it also matches windows running from the app’s own folder.',
        'A second RunContainer window stays hidden until there is something in it and closes when the app ends; stopping an app no longer flashes its window on the desktop first.',
      ],
    },
    {
      version: '0.7.1',
      date: '2026-10-23',
      channel: 'stable',
      url: 'https://github.com/RunContainer-7/runcontainer/releases/tag/v0.7.1',
      notes: [
        'Installer wizards are hosted inside RunContainer. Pressing Run on a setup program used to show its wizard as an ordinary desktop window; RunContainer now waits longer for an installer to create its window and hosts it, so setup is completed inside the app.',
        'If the main window cannot host it, a second RunContainer window opens with Stop app, Release window and a way back to the main window. Windows can still refuse hosting; the window says so instead of pretending the app is inside.',
        'Hyper-V and QEMU displays open in a RunContainer window automatically, so a wizard running inside the guest is visible without a stray Virtual Machine Connection window.',
        'Show app window works for QEMU as well as Hyper-V and reports whether the window is really shown inside RunContainer or stayed on your desktop.',
        'The Info tab and the documentation support panel link the official RunContainer YouTube channel.',
      ],
    },
    {
      version: '0.7.0',
      date: '2026-10-23',
      channel: 'stable',
      url: 'https://github.com/RunContainer-7/runcontainer/releases/tag/v0.7.0',
      notes: [
        'Launching is quicker. The launcher’s helper assembly is compiled once and loaded from disk afterwards instead of on every Run; measured on the reference machine, Run to confirmed containment fell from 712 ms to 563 ms and to a reported PID from 637 ms to 493 ms. The benchmark and raw samples ship in reports/performance-0.7.0.md.',
        'Background cost is lower: the process poll moved from every 1.5 s to every 5 s, cutting the PowerShell query duty cycle from roughly 40% to roughly 13% while still noticing a closed app within seconds.',
        'Tweaks has a Runtime & JIT card. It reads the app’s own executable header, reports native code as already compiled with no JIT strategy, offers a .NET strategy only for managed apps, and describes RunContainer’s own V8 JIT as built in rather than a switch.',
        'Settings shows measured launch timings from your own machine — last launch, median of recent launches, backend and monitor interval — and stays silent until something has been measured.',
        'Fixed containment killing a bootstrapper’s child: the job object now stays alive until its last process exits, so installers that hand off to another process remain contained instead of being killed.',
        'Launch failures now name the app’s own exit code, so a crash can be told apart from an installer that refuses to run inside a Job Object.',
      ],
    },
    {
      version: '0.6.10',
      date: '2026-10-23',
      channel: 'stable',
      url: 'https://github.com/RunContainer-7/runcontainer/releases/tag/v0.6.10',
      notes: [
        'The AI tab is gone. RC-Brain’s status, held-out results, monitoring switch, repair permissions, verified outcomes and recent diagnoses now live in Settings, below the cards about how apps are kept apart. The monitor’s “last check” line keeps refreshing while Settings is open.',
        'Nothing changed about what RC-Brain may do: the same low-risk repairs still run automatically, clearing an app profile still needs your approval, and the previous model can still be rolled back.',
        'The bottom bar now has seven tabs: Sources, Apps, Tweaks, Settings, Profiles, Info and Updates. This guide points at Settings for everything RC-Brain.',
      ],
    },
    {
      version: '0.6.9',
      date: '2026-10-22',
      channel: 'stable',
      url: 'https://github.com/RunContainer-7/runcontainer/releases/tag/v0.6.9',
      notes: [
        'Fixed “Setup could not close RunContainer” during an upgrade. Setup now waits up to ten seconds for the old process tree to exit and only reports a problem if the app is still running; 0.6.8 checked once after 1.5 seconds and could abort while RunContainer was already closing.',
        'The same wait applies to silent installs and to a crashed copy showing an error window, so upgrades no longer stop halfway through.',
      ],
    },
    {
      version: '0.6.8',
      date: '2026-10-22',
      channel: 'stable',
      url: 'https://github.com/RunContainer-7/runcontainer/releases/tag/v0.6.8',
      notes: [
        'The Policies tab is gone from the launcher. Terms, privacy, source code and community rules now live only on this site, where they can be corrected without shipping a new build. The Info tab still opens the documentation.',
        'The version shown during the first moment of startup comes from the build instead of a hard-coded older number.',
      ],
    },
    {
      version: '0.6.7',
      date: '2026-10-22',
      channel: 'stable',
      url: 'https://github.com/RunContainer-7/runcontainer/releases/tag/v0.6.7',
      notes: [
        'Installing over a running copy no longer fails. Setup used to abort with “Setup was unable to automatically close all applications” when RunContainer was open, including a crashed copy showing an error window. It now closes RunContainer itself: silently during an unattended install, and after asking you during a normal one.',
        '0.6.5 users are unstuck. That build required a training-only package that packaging removed, so the installed app could stop with “Cannot find module” before opening, and its own updater never ran. 0.6.6 removed the dependency; this release also makes the installer replace a broken copy that is still in memory.',
        'The AI tab now shows the monitor is alive: how many checks it has completed, when the last check ran, and how many running apps it is watching. The heartbeat refreshes while the tab is open instead of showing a snapshot.',
        '“What it may do on its own” is read from the shipped action catalogue, so the automatic and approval-only repairs listed are exactly the ones this build enforces.',
        'The safety gate no longer applies even a low-risk repair to an app the model just diagnosed as normal: a restart is never a repair for a working app.',
        'Documentation: the download answer and system requirements describe the current release, and installation explains what to do if you are still on 0.6.5.',
      ],
    },
    {
      version: '0.6.6',
      date: '2026-10-22',
      channel: 'stable',
      url: 'https://github.com/RunContainer-7/runcontainer/releases/tag/v0.6.6',
      notes: [
        'RC-Brain 2: 8,334 parameters over 66 structured observation features, 19 diagnoses and 11 actions. It now uses temporal evidence (persistence, recurrence, recovery), exit-code classes, host pressure and contradictory-log signals instead of one error string.',
        'Repairs are verified independently over three consecutive observations. “Verified”, “unresolved” and “inconclusive” are reported honestly, and a restart alone is not treated as success.',
        'Verified outcomes are stored locally with paths and names redacted. They can be promoted, with consent, into a curated dataset; training a candidate and activating it are separate gated offline steps, and the previous model can be rolled back in the AI tab.',
        'Evaluation by split: 99.6% on familiar holdout variants, 96.8% on whole unseen failure families, 96.5% on an untouched final split, 0 unsafe destructive actions and 0 repairs proposed for normal behaviour. The ambiguous/restraint split is reported separately.',
        'Fixed the 0.6.5 startup failure (a pruned training dependency was required by the shipped app) and the per-launch Electron CSP warning. Startup failures are now logged and explained instead of leaving invisible processes.',
        'New Policies tab covering terms, privacy, source and self-hosting, responsible app use (no piracy) and community conduct. Installation docs explain the unsigned-installer warning and how to verify the download.',
      ],
    },
    {
      version: '0.6.5',
      date: '2026-10-22',
      channel: 'stable',
      url: 'https://github.com/RunContainer-7/runcontainer/releases/tag/v0.6.5',
      notes: [
        'RC-Brain: RunContainer now has its own small neural model, trained from scratch on its own architecture and failure scenarios. It runs locally, diagnoses what is wrong and chooses a repair instead of a rules table deciding.',
        'While RunContainer is open it watches running applications: visible windows, CPU and file activity, engine liveness and the live log tail. It abstains when the evidence is weak instead of guessing.',
        'A new AI tab shows the model (4,229 parameters, two heads for diagnosis and action), its held-out results, a monitoring switch, its repair permissions and recent diagnoses. A diagnosis banner shows the evidence, confidence and chosen action.',
        'Low-risk repairs (restart the app, restart its engine, repair its own folder permissions) run automatically. Clearing an app profile needs approval. It never installs system software, deletes app data, weakens isolation or follows instructions found in logs.',
        'Held-out evaluation: 98.9% diagnosis accuracy, 98.9% action accuracy, 0% false positives on normal behaviour and 0 unsafe actions across 348 unseen scenarios. A keyword baseline scores 49.7% and 58.6%.',
        'If the model is missing or corrupt, the app says so and monitoring will not diagnose or repair anything. There is no silent rule-based fallback.',
        'The installer is not code-signed, so Windows may warn before it runs.',
      ],
    },
    {
      version: '0.6.4',
      date: '2026-10-20',
      channel: 'stable',
      url: 'https://github.com/RunContainer-7/runcontainer/releases/tag/v0.6.4',
      notes: [
        'The app now describes what it does: each application gets its own space and its own files. Settings no longer shows a backend to choose, and virtual-machine setup, prepared images and guest paths are gone from the everyday screens.',
        'Profiles are honest: locked means no network access, and the Profiles tab says when this PC cannot enforce that for a standard environment.',
        'Tweaks no longer offers a networking switch that the default environment could not honour, and saving tweaks can no longer put a locked application back online.',
        'An application pinned to a particular backend can return to automatic from its Manage panel, and automatic now stays automatic instead of turning into a virtual-machine request.',
        'The installer is not code-signed, so Windows may warn before it runs.',
      ],
    },
    {
      version: '0.6.3',
      date: '2026-10-20',
      channel: 'stable',
      url: 'https://github.com/RunContainer-7/runcontainer/releases/tag/v0.6.3',
      notes: [
        'Tidier launcher: the app list shows Manage, Run and Close, and Reset, Duplicate, Export info, Logs and Delete move into a More menu.',
        'Settings no longer asks you to handle Windows ISOs, staging disks or base images. It shows the backend RunContainer picked for your PC in one line; overrides and Hyper-V checks sit under Advanced.',
        'Apps run inside a managed virtual machine when your PC has a VM image, and under containment (Job Object caps and a private profile) otherwise. Nothing runs unguarded.',
        'Info, Manage and Tweaks wording now matches what the app actually does, and scrolling text no longer runs underneath the scrollbar.',
        'The installer is not code-signed, so Windows may warn before it runs.',
      ],
    },
    {
      version: '0.6.2',
      date: '2026-10-20',
      channel: 'stable',
      url: 'https://github.com/RunContainer-7/runcontainer/releases/tag/v0.6.2',
      notes: [
        'The Info tab gains a Support & documentation section: an Open documentation button for this site, and the Discord server as a real link.',
        'The Discord link in the beta notice is now clickable instead of showing the address as plain text.',
        'Links open in your default browser. RunContainer only opens its own documentation, Discord server and GitHub pages, and refuses every other address.',
        'The installer is not code-signed, so Windows may warn before it runs.',
      ],
    },
    {
      version: '0.6.1',
      date: '2026-10-20',
      channel: 'stable',
      url: 'https://github.com/RunContainer-7/runcontainer/releases/tag/v0.6.1',
      notes: [
        'New RunContainer icon, containing every size Windows asks for.',
        'The icon now appears on the app window and taskbar, in the installed RunContainer.exe, in the installer wizard, and on the Start menu and desktop shortcuts.',
        'The installer is not code-signed, so Windows may warn before it runs.',
      ],
    },
    {
      version: '0.6.0',
      date: '2026-10-20',
      channel: 'stable',
      url: 'https://github.com/RunContainer-7/runcontainer/releases/tag/v0.6.0',
      notes: [
        'Every environment can run inside its own virtual machine, using a Windows image you provide. No operating system image is bundled or downloaded.',
        'First-run provisioning: install the virtual machine support, create a disk, install your own licensed Windows in it, then use that disk as the base image.',
        'The update wizard shows release notes, downloads the installer inside the app with progress, and installs it over your copy.',
        'RCVM containment stays available as a lighter, explicitly labelled option that is not a virtual machine.',
      ],
    },
    {
      version: '0.5.1',
      date: '2026-10-18',
      channel: 'stable',
      url: 'https://github.com/RunContainer-7/runcontainer/releases/tag/v0.5.1',
      notes: [
        'First Stable release for Windows.',
        'Update notice: RunContainer tells you when a newer Stable release exists. It never installs updates for you.',
        'Discord link in the app is clickable, and links open in your browser.',
        'Removed Windows edition and firmware wording from the app.',
        'The installer is not code-signed, so Windows may warn before it runs.',
      ],
    },
    {
      version: '0.5.0',
      date: '2026-10-18',
      channel: 'preview',
      url: 'https://github.com/RunContainer-7/runcontainer/releases/tag/v0.5.0',
      notes: [
        'First Windows setup wizard (preview). Choose the install folder and get a desktop shortcut.',
        'The installer is not code-signed, so Windows may warn before it runs.',
        'Windows only. Not every Windows application will work.',
      ],
    },
  ] as {
    version: string
    date: string
    channel: 'stable' | 'preview'
    url: string
    notes: string[]
  }[]
}

export type Project = typeof project
