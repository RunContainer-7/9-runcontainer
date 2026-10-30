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
    version: '0.9.4',
    filename: 'RunContainer-Stable-Setup-0.9.4.exe',
    url: 'https://github.com/RunContainer-7/runcontainer/releases/download/v0.9.4/RunContainer-Stable-Setup-0.9.4.exe',
    releaseUrl: 'https://github.com/RunContainer-7/runcontainer/releases/tag/v0.9.4',
    // The published asset's own SHA-256 digest, copied from the GitHub release.
    // Only set this once the installer is actually published: a stale or guessed
    // checksum tells readers their correct download has been tampered with.
    sha256: '01027077bfc5d3343ad3392f48ee70f73c6381d59472f38c3c8373815c097c64',
    // The published CI-built installer (Inno Setup) is ~104 MB; it is not the
    // same artefact as a local electron-builder NSIS run of npm run dist.
    sizeMb: 104.1,
  },

  /**
   * The current Nightly prerelease. Nightly is the experimental blue edition:
   * it installs separately from Stable, with its own apps and settings, and it
   * receives prerelease updates. Only list a build whose installer is attached.
   */
  latestNightly: {
    version: '0.9.1-nightly.2',
    filename: 'RunContainer-Nightly-Setup-0.9.1-nightly.2.exe',
    url: 'https://github.com/RunContainer-7/runcontainer/releases/download/v0.9.1-nightly.2/RunContainer-Nightly-Setup-0.9.1-nightly.2.exe',
    releaseUrl: 'https://github.com/RunContainer-7/runcontainer/releases/tag/v0.9.1-nightly.2',
    // Copied from the published asset's own digest on the GitHub release.
    sha256: '130ecd4baad11d0a6b7daf84c484edfcf48bc826dbf9ee6585bc6db88b8ca218',
    // Same CI-built Inno Setup payload as Stable, about 104 MB.
    sizeMb: 104.0,
  },

  /**
   * Published Stable releases, newest first. Add an entry only once the installer
   * is attached to that GitHub release: every entry renders a download link, so a
   * version listed here that was never published is simply a broken link.
   * Nightly prereleases are listed on the GitHub releases page instead, so the
   * changelog on this site stays a record of Stable editions.
   */
  releases: [
    {
      version: '0.9.4',
      date: '2026-10-30',
      channel: 'stable',
      url: 'https://github.com/RunContainer-7/runcontainer/releases/tag/v0.9.4',
      notes: [
        'Settings can turn on an iPhone companion: a home-screen web app that shows an app already running on the PC and sends taps, typing and scrolling to it.',
        'Pairing uses a six-digit code shown on the PC. It works once, expires after five minutes, and a paired phone can be forgotten at any time.',
        'The companion is off until it is turned on, shares one app window rather than the screen, and needs the phone to be able to reach the PC: the same Wi-Fi, or a private network such as Tailscale.',
      ],
    },
    {
      version: '0.9.3',
      date: '2026-10-30',
      channel: 'stable',
      url: 'https://github.com/RunContainer-7/runcontainer/releases/tag/v0.9.3',
      notes: [
        'The Stable installer is self-signed. Windows may still warn because the certificate is not publicly trusted; Nightly remains unsigned.',
        'Older release notes in the app are collapsed to make Updates easier to browse.',
      ],
    },
    {
      version: '0.9.1',
      date: '2026-10-29',
      channel: 'stable',
      url: 'https://github.com/RunContainer-7/runcontainer/releases/tag/v0.9.1',
      notes: [
        'Developer mode and Virtualise are now exclusive to Nightly; existing Stable VM files are preserved.',
        'A clearly labelled Stable installer is provided alongside a compatibility alias for older in-app updaters.',
      ],
    },
    {
      version: '0.9.0',
      date: '2026-10-28',
      channel: 'stable',
      url: 'https://github.com/RunContainer-7/runcontainer/releases/tag/v0.9.0',
      notes: [
        'Fixed “Setup finished, but no executable was found”. An unattended install is now given the installer’s own documented destination switch, so an NSIS or Inno Setup program installs inside the app’s environment instead of into your real Windows profile. Windows’ known-folder API ignores the environment’s folder variables, which is why a successful install could look like an empty one.',
        'Finding the installed app no longer depends on file timestamps. RunContainer records which executables exist before setup runs and treats anything new afterwards as the app, so an installer that copies files with their original (older) dates is still recognised.',
        'If an installer still writes outside its environment — for example a wizard completed by hand — RunContainer reads Windows’ own uninstall record for the app, brings the installed folder into the app’s environment, and starts that copy. If the folder is too large to copy, the app still starts and the log says where it lives.',
        'A successful setup now always ends with a named result: the app it installed, started in a RunContainer window, or a clear next step if the installer genuinely installed nothing.',
        'Settings has an Appearance choice: Dark (the default graphite and teal interface) or Light, a high-contrast pale surface for daylight and projectors. It changes colour only, and it is remembered.',
        'A few interface refinements in the same palette: a fainter geometric grid on the panel itself, softer card depth and a cleaner app icon plate.',
      ],
    },
    {
      version: '0.8.9',
      date: '2026-10-28',
      channel: 'stable',
      url: 'https://github.com/RunContainer-7/runcontainer/releases/tag/v0.8.9',
      notes: [
        'The window host is now a small native helper built once on this PC, instead of a fresh PowerShell process on every launch. It reports that it is watching in about 80 ms rather than about half a second, so the first window of an app is adopted almost immediately and Run no longer waits at the gate before the app starts.',
        'Run returns as soon as the app process has started, rather than waiting up to 12 seconds for its window to be found. The RunContainer window stays open and fills with the app as soon as its window appears, so a slow app no longer makes the Run button look stuck.',
        'A supported installer completed in the background no longer holds Run for up to 25 seconds. The window reports the progress of setup while it works, and the app opens there when setup finishes.',
        'Fixed a hidden installer wizard never being adopted. The check for a main window still rejected every window that has an owner, which is the normal shape of a wizard, even though the documentation said otherwise. An owner no longer disqualifies a window; a real child control still does.',
        'The log records how long the window host took to become ready, so a slow launch can be attributed to the host or to the application itself.',
        'The interface now uses the graphite and teal palette of this site, with a faint geometric grid behind the panel, squarer cards and controls, and a softer teal glow on the active tab. The README was rewritten in plain language with a single build snippet.',
      ],
    },
    {
      version: '0.8.8',
      date: '2026-10-28',
      channel: 'stable',
      url: 'https://github.com/RunContainer-7/runcontainer/releases/tag/v0.8.8',
      notes: [
        'Fixed a freshly installed app showing a letter instead of its own icon, and the app list claiming its folder was missing. The answer an install returned carried neither the icon nor the folder state, and the card read the missing folder flag as "folder missing". Every record handed to the interface now carries both, so the icon appears immediately and the folder note appears only when the folder is really gone.',
        'Run gets to the app sooner. When the window host\u2019s support code is already prepared, Run no longer waits the full cold-start budget before starting the app; that longer wait is now reserved for the first Run after an install or update, where it prevents the window from appearing outside RunContainer.',
        'App icons are limited to the sizes the interface actually shows, so each app list refresh transfers a fraction of the data it used to.',
        'Status messages fade out and clear after a few seconds instead of staying on the Apps tab as if they described the current state.',
      ],
    },
    {
      version: '0.8.7',
      date: '2026-10-28',
      channel: 'stable',
      url: 'https://github.com/RunContainer-7/runcontainer/releases/tag/v0.8.7',
      notes: [
        'Fixed the app appearing on the desktop first. Run started the app before the RunContainer window host had reported that it was watching, so the app\u2019s first window was created outside RunContainer and could only be adopted late, if at all. Run now waits for that report before the app\u2019s process exists, which is why the first Run after an update or install is the one that used to fail.',
        'Fixed installer wizards that never appeared at all. A hidden window that has an owner \u2014 the normal shape of an installer\u2019s wizard, whose owner is a tiny message window \u2014 was left out of hosting and out of the safety net that shows a hidden window, so a setup could be working perfectly with nothing on screen. Owned main windows are hosted and revealed now; tool palettes and helper windows are still ignored.',
        'Fixed a window that could be moved into a RunContainer window but never shown: the host no longer re-parents anything before it has a real client area, instead of making the app a child of a minimized or mid-resize window and failing to position it.',
        'An administrator-approved app no longer leaves an empty second RunContainer window behind. The elevated launcher\u2019s own window hosts it, and the medium-integrity window is closed instead of sitting blank.',
        'How a supported installer is handled is now one Settings choice \u2014 complete it automatically, or show its wizard \u2014 instead of a button on every app. The interface also has a visual pass that matches this site: deeper background, glassy app cards, a floating navigation bar and refreshed controls.',
      ],
    },
    {
      version: '0.8.6',
      date: '2026-10-28',
      channel: 'stable',
      url: 'https://github.com/RunContainer-7/runcontainer/releases/tag/v0.8.6',
      notes: [
        'Owned installer dialogs can be detected by the window host, including in the administrator-approved host. Some Windows windows may still refuse hosting, and RunContainer says so rather than pretending.',
        'A slow-starting window host stays open and keeps watching. When a splash closes, a remaining app window can fill the host, and a window that its framework moves back to the desktop is watched for re-hosting.',
        'When background setup is chosen for a supported installer, it receives the unattended switches, restores the app\u2019s launch arguments and starts the discovered app after setup finishes.',
        'The Info tab links to the GitHub project for anyone who would like to support it with a star.',
      ],
    },
    {
      version: '0.8.5',
      date: '2026-10-28',
      channel: 'stable',
      url: 'https://github.com/RunContainer-7/runcontainer/releases/tag/v0.8.5',
      notes: [
        'Fixed app sessions continuing to occupy space when switching to another tab, including Virtualise.',
        'Fixed VM console initialization when the desktop name arrives in separate network packets, and buffered updates are processed without waiting for another packet.',
      ],
    },
    {
      version: '0.8.4',
      date: '2026-10-27',
      channel: 'stable',
      url: 'https://github.com/RunContainer-7/runcontainer/releases/tag/v0.8.4',
      notes: [
        'A virtual machine now really draws inside its RunContainer window. QEMU was started with a USB tablet but no USB controller, so it exited before the guest ran at all; a USB controller is attached, QEMU\u2019s own output is kept in vm-qemu.log, and a machine that fails to open its console reports what QEMU actually said.',
        'Fixed the console being four bytes out of step with the server: choosing the \u201cNone\u201d security type does not skip the SecurityResult message, so everything after it was read at the wrong offset.',
        'Fixed the console refusing a guest\u2019s first screen (a palette mode), and a guest with no video mode yet. The client now asks the server for 32-bit true colour, as a real VNC client does.',
        'Fixed the virtual disk being attached over virtio, which stock installation media cannot see. Virtualise machines attach their disk the way every installer recognises.',
      ],
    },
    {
      version: '0.8.3',
      date: '2026-10-27',
      channel: 'stable',
      url: 'https://github.com/RunContainer-7/runcontainer/releases/tag/v0.8.3',
      notes: [
        'The promise this project is about — press Run and the app\u2019s window is drawn inside a RunContainer window — is now checked by launching the real app instead of being assumed. A new verification installs a real graphical program through the app\u2019s own IPC, presses Run, and asks Windows where that window actually is: it must be a child window of the RunContainer window, visible, and large enough to be a window, with no copy of it left on the desktop. It runs on every push to the repository.',
        'Fixed the window host being slow to start costing an entire launch. Its Win32 assembly is compiled the first time it runs, and on a new install or straight after an update that compile can take longer than the app waits before launching. RunContainer then decided hosting was unavailable, closed the window it had just opened, and refused to try again for twenty seconds — so the app opened on the desktop and stayed there while Run appeared to do nothing. A host that reports it is watching now clears that refusal, so the attempt that follows the launch adopts it and the app ends up inside RunContainer.',
        'Fixed closing a RunContainer window closing the app\u2019s own window. A hosted window is a child of the RunContainer window, and Windows destroys a child together with its parent — so destroying the host took the app\u2019s window with it, and an app whose last window disappears simply exits. A host window that is still holding a window releases it to the desktop first.',
        'Fixed virtual machines outliving the app that started them. A machine runs detached so the guest keeps working while the interface is busy, which also means it survives RunContainer being closed or killed — and nothing recorded its process. It was then shown as Stopped while its QEMU process still held its virtual disk and its console port, and pressing Start would have booted a second machine on the same disk, which corrupts a guest filesystem beyond repair. Each machine\u2019s process is now part of its record: machines from a previous session are stopped at startup, running machines are stopped when the app closes, Start refuses a machine whose disk is still in use and says why, Stop can stop one left over from a previous session, and a record clears itself the moment the machine really stops.',
        'A machine\u2019s state is measured rather than remembered, so Running and Stopped mean what they say after a crash as well as after a clean exit. Four new tests cover the pid file, that reconciliation and the refusal to start one disk twice.',
        'If the interface still looks like an older version after updating, run the installer again and let it close RunContainer first: a file that is in use cannot be replaced while the app is running, and a half-replaced installation keeps the old interface while reporting the new version.',
      ],
    },
    {
      version: '0.8.2',
      date: '2026-10-27',
      channel: 'stable',
      url: 'https://github.com/RunContainer-7/runcontainer/releases/tag/v0.8.2',
      notes: [
        'Settings has one new switch: Enable developer mode. Off is the normal interface. On reveals the technical detail behind RC-Brain, the launch timings, and a Virtualise tab — and nothing else about the app changes, because it is a development switch rather than a different product. The choice is recorded once for this installation and stays until it is turned off, across restarts and across updates.',
        'The RC-Brain panel in Settings is no longer an engineering audit. It says what RC-Brain is, whether it is watching, what it may do on its own and that inference stays on this PC. The held-out evaluation numbers, the model artefact and registry, the label counts, the verified-outcome and learning-loop counters, the specialist-agent catalogue and the model limits moved behind developer mode, where they belong, and the model\u2019s measured numbers now live on the RC-Brain page.',
        'Virtualise is a new tab that only developer mode reveals. It configures and runs a real virtual machine on RunContainer\u2019s own QEMU backend: name, memory, CPUs, virtual disk size, and installation media you choose. The machine boots from that media for a fresh install, or from its own disk once a system is installed, and the guest screen is drawn inside the RunContainer window instead of a window of QEMU\u2019s own.',
        'The console inside the window is a real RFB (VNC) client written for this purpose. QEMU serves the guest on loopback and RunContainer paints it: raw and copy rectangles, resolution changes when the guest changes mode, and keyboard and mouse sent back to the guest, including Ctrl+Alt+Del. The socket lives in the main process, so the window never opens a network connection of its own.',
        'It is labelled experimental where a machine is created, and that is honest: frames are uncompressed over loopback, there are no guest additions, and integration stops at the keyboard and mouse. RunContainer still ships no guest operating system and no licence, downloads none, and asks for media you already own. QEMU remains a program you install yourself.',
        'Fixed a bug the new tests found: pausing monitoring replaced the whole RC-Brain status with the toggle\u2019s answer, so the panel lost the model name, parameter count and model file until the next poll put them back. The answer is now merged into the status instead.',
        'Virtual machine configuration is validated in the main process, not only in the interface: memory, CPU, disk and name limits, a name that is safe to use as a file name, media that must be an ISO or disk image, and a console port per machine that is checked as free before QEMU starts. Deleting a machine removes the disk it owns, and says so if that removal fails.',
        'A new documentation page covers developer mode and running a virtual machine, and the Settings, RC-Brain, privacy, glossary and known-limitations pages now say which parts of the interface the switch reveals.',
      ],
    },
    {
      version: '0.8.1',
      date: '2026-10-27',
      channel: 'stable',
      url: 'https://github.com/RunContainer-7/runcontainer/releases/tag/v0.8.1',
      notes: [
        'Fixed RunContainer opening to a blank window. The once-a-second clock that shows how long a background setup has been running was declared inside the launch-animation hook but read by the component that draws the app list, so every tick referred to a name that did not exist in its scope. React removes the whole interface when a component throws, which is why the window went empty rather than showing an error. The clock now lives in the component that reads it, and an app sitting in an unattended setup at launch no longer has that effect.',
        'A setup whose recorded start time cannot be read now leaves the elapsed-time line out entirely, instead of printing a nonsense duration.',
        'Added a last line of defence for the window itself: if any panel ever throws again, RunContainer shows the real error with a Reload button instead of an empty screen, and the error is written to runcontainer-console.log so it can be reported. Installed apps and their files are untouched by a fault in the interface.',
        'A regression test covers it: a container that is setting up in the background must keep the interface rendered while the clock ticks.',
      ],
    },
    {
      version: '0.8.0',
      date: '2026-10-27',
      channel: 'stable',
      url: 'https://github.com/RunContainer-7/runcontainer/releases/tag/v0.8.0',
      notes: [
        'Applications and installers that ask Windows for administrator rights no longer open as ordinary windows on the desktop. A setup wizard that took a while to draw its first window, or a setup program that started the application it had just installed, could previously end up outside RunContainer; that window now opens inside RunContainer too.',
        'An installer that shows more than one window — an unpacking window, the setup wizard, then a progress or finish window — used to have only its first window inside RunContainer. All of them appear inside RunContainer now, and a smaller window keeps its own size instead of being stretched to fill the space.',
        'The application a setup program installs is shown inside RunContainer as soon as setup finishes, rather than starting as a separate window on the desktop.',
        'Fixed an empty window after Stop. Stopping an application could leave a blank RunContainer window behind; that no longer happens.',
        'Release installers are still not code-signed, so Windows may warn before the installer runs. The Downloads page explains why, and how to verify your download.',
      ],
    },
    {
      version: '0.7.9',
      date: '2026-10-27',
      channel: 'stable',
      url: 'https://github.com/RunContainer-7/runcontainer/releases/tag/v0.7.9',
      notes: [
        'RC-Brain 5 replaces RC-Brain 4: 13,632 parameters instead of 9,088, because the corpus now carries several wordings for each condition instead of one. “Requires administrator privileges”, “elevation is required” and “requested operation requires elevation” are the same fact to a person, and only the first used to be a fact to the feature extractor. The broader corpus was trained twice with the same seed, changing only network width: the narrow pair scored 82.8% on unseen failure families and 93.9% on the final split, the wide pair 92.2% and 94.8%.',
        'Measured results for RC-Brain 5: 99.7% on familiar holdout variants (99.1% action), 92.2% on whole failure families absent from training (up from 90.6%), 94.8% on an untouched final split (94.2% action, 310 cases), zero unsafe destructive actions on every split, and 0% repairs proposed for normal behaviour on the final split. The 16-case restraint set is still answered correctly only 25% of the time, and every miss is the same scenario — an app that has logged nothing at all yet — which is stated rather than rounded away.',
        'Fixed a trainer that could ship a model which had failed its own release gates. The active-model registry was written before the thresholds were evaluated, so a failing run still became the shipped model; one did, leaving the app pointed at a model file that had never passed. Gates are now checked first and only a passing run touches the registry. Rollback now records the artefact that was actually active instead of the one before it, so it cannot skip a version, and the candidate trainer no longer inspects a hard-coded file name from RC-Brain 2 — which had made every promoted-experience candidate report as failed.',
        'The app line now answers “did the AI use its tools?”. It names the tool used on the incident — Dispatch specialist agents, with what each one measured, or Consult the Runbook, with the signature that matched — and when no tool was used it says exactly that, instead of the silence that used to read as “it did something and did not tell you”.',
        'A setup program that has not drawn its window yet is explained instead of looking stuck: while an unattended setup runs, the app’s line says it is still working inside this environment and counts how long, and where the wizard has to be shown it is hosted in the app’s RunContainer window. When automatic repair has spent its budget for an app, the message says so, names the state it is still in, and says what to do next instead of repeating a repair the policy will refuse.',
        'Enable JIT is a control, not a claim: pick a runtime and a strategy in Tweaks, press Enable JIT, and that app starts straight away with the strategy applied on the way in. Compiling .NET IL is a real JIT; a native executable is already machine code, so the same button says that plainly rather than pretending a switch helped, and an executable it could not classify applies no strategy at all rather than a guessed one.',
        'First launch is a walkthrough of the whole app in ten steps, 0/9 to 9/9: the idea, how a run works, then Updates, Info, Profiles, Settings, Tweaks, Apps, Sources, and where to get help and support the project. It is shown once per installation and never again, including after an update, and an installation that predates it still sees it once.',
        'Documentation: the introduction starts with a video you can play on the page, the Support page names the YouTube channel and the Discord, and this page, the downloads page, the FAQ and the RC-Brain page now describe RC-Brain 5 with its measured numbers.',
      ],
    },
    {
      version: '0.7.8',
      date: '2026-10-26',
      channel: 'stable',
      url: 'https://github.com/RunContainer-7/runcontainer/releases/tag/v0.7.8',
      notes: [
        'The app list shows the icon the executable actually carries. RunContainer reads the icon frames out of the program file itself — the same source Windows Explorer uses — and rebuilds a genuine multi-size icon, so installers and tools that used to show as a bare letter now show their own icon and name. Where a program carries no icon at all, the shell is asked as a second choice instead of a letter being shown.',
        'Apps that are really their own setup program say so. When the program you added is an Inno Setup, NSIS, InstallShield, WiX or MSI installer, the app list labels it and either completes setup inside the environment (“Set up in the background”, where the installer has a documented unattended mode) or keeps the wizard in its own RunContainer window. While an unattended setup runs, that line counts how long it has been working inside this environment, so a setup that takes minutes no longer looks like an app that never appears.',
        'Setup completion is observed rather than assumed. RunContainer follows the setup process tree to its exit, searches the environment for the executable setup produced, and records it, so Run starts the app instead of its installer. If setup produced nothing, it says exactly that instead of claiming success.',
        'RC-Brain 4 replaces the previous model: 9,088 parameters over 75 observation features and 13 actions. The new action consults the Runbook, a hard-coded table of exact documented signatures (Windows errors, setup exit codes and documented RunContainer states) with their meaning, and the agents’ own measurements are added as features.',
        'RC-Brain now has two tools, and only two. The first dispatches specialist agents: six fixed read-only evidence probes (engine, window, process, filesystem, logs, setup), then three agents that reason over what they measured — a research agent that searches RunContainer’s bundled documentation and the incidents already verified on this machine, offline in both cases, an expert agent that works the whole documented rule set and names the measurement it is missing rather than guessing, and a harmony agent that resolves a disagreement between the model and the expert by explicit rules and refuses to choose when both conclusions rest on equal evidence and equal risk. The second tool consults the hard-coded Runbook. The model chooses which tool to use and nothing else about either: it cannot author an agent, give one arguments, run a command through one or add a table entry, a dispatch happens at most once per incident, and everything the agents return still goes through the same safety policy the model’s own proposal goes through.',
        'Held-out results for RC-Brain 4: 99.7% on familiar holdout variants, 90.6% on whole failure families absent from training, 95.1% on an untouched final split, zero unsafe destructive actions on every split. The Runbook action has no held-out figure, because the held-out splits contain no instance of it; that is stated rather than left out.',
        'Fixed evidence that looked complete but was not. Temporal evidence — how long a problem had lasted, whether it had recurred, whether it had only just cleared — was never measured at all, so the model was being asked to work without it; the monitor now tracks incidents properly. A window owned by the elevated launcher was reported as “no window”, which is how a working app could be restarted; those windows are now reported separately and measured.',
        'Fixed re-rendering the old icon. A record whose icon came from an older extractor is now upgraded, because the decision is based on which extractor wrote the file rather than on its name, and when setup finishes and Run starts a different executable the icon is extracted again from that file, so the tile shows the app rather than its installer.',
        'Apps that are still starting are no longer restarted. A launch is reported as running as soon as its process is verified, so an app that simply has not drawn its window yet is waited for inside the 10 second window budget while a genuinely hung one is still restarted after it.',
        'Fixed a rollback path that could have left RunContainer with no model at all. The previous model predates the agents’ features and its 66 features are exactly the first 66 of this build’s 75, so it now loads and reads that prefix instead of being rejected as incompatible; the shipped model itself must still match the whole schema.',
      ],
    },
    {
      version: '0.7.7',
      date: '2026-10-25',
      channel: 'stable',
      url: 'https://github.com/RunContainer-7/runcontainer/releases/tag/v0.7.7',
      notes: [
        'Fixed “The path cannot be traversed because it contains an untrusted mount point” when deleting or updating an app. Windows puts a junction inside the app’s profile the first time anything is cached (Content.IE5 inside INetCache is a junction pointing at IE), and a folder containing one cannot be deleted recursively at all, so every retry failed the same way and left a half-deleted app whose icon and executable were already gone. RunContainer now removes such a link first — the link only, never what it points at — and then deletes the folder normally.',
        'Delete is now all or nothing for an app: the folder is removed whole, so the app list never keeps an entry pointing at an executable that no longer exists.',
        'Fixed apps installing outside containment through the Microsoft Store. Some downloads are not applications but a few hundred kilobytes of “ms-windows-store:” bridge that asks Windows to install a Store package, which puts the real app in WindowsApps and opens a Store window no RunContainer window can host. RunContainer now recognises such a bridge, refuses it before anything starts and says what to use instead; a virtual machine environment is still allowed, because there the install happens inside the guest. See Installing applications.',
        'An app whose icon file went missing gets its real icon back instead of a bare initial, because the icon is extracted again from the executable when the list is read.',
      ],
    },
    {
      version: '0.7.6',
      date: '2026-10-25',
      channel: 'stable',
      url: 'https://github.com/RunContainer-7/runcontainer/releases/tag/v0.7.6',
      notes: [
        'Apps and installer wizards that need administrator rights now open inside a RunContainer window. Windows will not let a normal process host a window owned by an elevated one, so the elevated launcher creates its own RunContainer window and hosts the app or the setup wizard there.',
        'Closing that window ends the app: it is tied to the contained job, so Stop and Reset work as they do everywhere else.',
        'The behavioural monitor follows the administrator window, so a working installer is no longer read as “no window” and restarted.',
        'The docs now label the animated walkthrough as an illustration, not a screen recording.',
      ],
    },
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
