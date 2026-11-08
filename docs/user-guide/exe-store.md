# EXE Store

The **EXE Store** is a short list of Windows programs you can add without finding an installer yourself. Its button sits next to **+** on the **Apps** tab.

![The EXE Store, with Install and Get installer buttons](/screenshots/exe-store.png)

## What pressing Install does

It downloads the publisher's installer into RunContainer and adds the program to **My Apps**, in its own folder, with its own data and its own limits. This is the same path as **Import from URL** on the [Sources tab](/user-guide/applications#installing-from-a-url): nothing is installed into the rest of Windows, and the program is not added to your desktop or Start menu by RunContainer.

## Why some entries say Get installer

A publisher's download address changes with every release for many programs: the file name carries the version number, or the download is handed to a mirror. RunContainer only offers a one-press **Install** when the address was fetched and answered with a Windows installer before the release was built.

Where that cannot be promised, the entry says **Get installer** and opens the publisher's own download page. Save the file, then use **Install local EXE** on the **+** menu. The result is the same: the app is added to its own folder.

## What the store does not do

- **It does not host or mirror installers.** Every download comes from the publisher. RunContainer never redistributes someone else's software.
- **It does not check whether an app is safe or suitable.** The same cautions apply as for any installer you add yourself. See [Testing unfamiliar software](/safety/responsible-testing) and [Unsupported applications](/troubleshooting/unsupported-apps).
- **It is not a shop.** There is no account, no payment and no ranking: the list is part of the app.
- **It does not install into Windows.** An app from the store is contained exactly like one you add yourself.

## Submitting an app

Submissions go through the repository's issue form, not through RunContainer itself.

1. Press **Submit an app** at the bottom of the store, or open the [submission form](https://github.com/RunContainer-7/RunContainer/issues/new?template=submit-app.yml) directly.
2. Fill in the app name, the publisher, the official download page and, if the publisher has one, a direct installer link over https.
3. Submit. **Do not attach the installer.** An issue cannot carry a 100 MB setup file, and the store never hosts or mirrors one — the entry links to the publisher's own file.

The form asks whether the link is the publisher's own, and it will not submit without that confirmation. A direct link is optional: a page-only submission is a normal one, and most entries in the store are page-only.

If you want to ask before submitting — whether an app fits at all, or why an entry says
**Get installer** — ask on the [Discord server](https://discord.gg/rvMjMZJykE). Submissions
still go through the form: a message or a DM is easy to lose, and the issue is the record of
what was checked and what was decided.

### What an app must meet

The store is a short list, so every submission is measured against the same bar. The
criteria are published here so you can check your app against them before you send it —
and so a decision can be argued with rather than guessed at.

**It must**

- link to the publisher’s own download over https: their installer, or their download page
  when there is no stable installer link;
- install and run inside its own environment, with no reboot, no driver, no kernel service,
  and nothing installed into the rest of Windows;
- be free to download without an account, a survey, a coupon or a wait;
- be a real program a person can describe in one sentence, not a downloader for something else;
- still be obtainable from the publisher, and still maintained — or at least still
  downloadable from their own page.

**It must not**

- be a mirror, repack, crack, patch, key generator or any other tool whose point is getting
  around a licence;
- carry bundled offers, adware, toolbars, or a third-party installer that downloads more
  software after it starts;
- need a reboot, an anti-cheat or VPN driver, a virtual drive, or machine-wide administrator
  changes in order to work;
- sit behind a link shortener, an ad gateway, or a file host re-hosting someone else’s file;
- be a paid download, or one that only starts after signing up.

**It is discouraged** — these are decided case by case, and usually end up page-only:

- an installer whose address changes with every version, so the store cannot offer **Install**;
- an app that updates itself by installing into Windows, outside its environment;
- an installer hundreds of megabytes large that downloads most of itself again when it runs;
- a second entry that does the same job as one already listed.

A decline is not a statement that an app is unsafe: it means the entry could not be kept
working, or did not fit a short list. The reasons are given in the issue, and the submitter
can answer them there.

### What happens after you submit

Every submission is reviewed by hand. The reviewer:

- fetches the link the way the app would (`npm run store:verify`), and reads the status after redirects, the content type, the size and the SHA-256 that come back;
- checks that the address belongs to the publisher rather than a mirror, a repack, a crack or a patch;
- checks the licence, and whether the installer is something a contained app can actually run — an installer that requires a driver or a reboot is a poor fit even when the link works.

An approved app appears when a published release includes it, with **Install** if the link answered with an installer and **Get installer** if it does not. Declining an app is not a claim that it is unsafe: the store is a short list, not a directory, and entries are only added where the link can be kept working.

Review is manual and no turnaround is promised. A submission is a suggestion, not a listing.
