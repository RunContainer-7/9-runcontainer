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

Submissions are not open yet. When they are, a submitted installer will be reviewed before it appears in the list.
