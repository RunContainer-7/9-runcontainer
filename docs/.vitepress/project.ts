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
  /** Private vulnerability reporting channel (e.g. GitHub security advisories). */
  securityUrl: '',
  /** Officially established community platforms only. */
  community: [] as CommunityLink[],

  /** The current Stable installer. Used by the Downloads and Installation pages. */
  latestDownload: {
    version: '0.6.4',
    filename: 'RunContainer-Setup-0.6.4.exe',
    url: 'https://github.com/RunContainer-7/runcontainer/releases/download/v0.6.4/RunContainer-Setup-0.6.4.exe',
    releaseUrl: 'https://github.com/RunContainer-7/runcontainer/releases/tag/v0.6.4',
    sha256: 'b39bb2b6b93eadcdeef7d8a02d4361fd9667b8080c1594967593fae1309cd4ec',
    sizeMb: 99,
  },

  /** Published releases, newest first. */
  releases: [
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
