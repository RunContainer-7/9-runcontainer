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

  /** Published releases. Leave empty until a release is officially published. */
  releases: [
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
