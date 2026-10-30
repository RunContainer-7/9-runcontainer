# iPhone companion (experimental)

The iPhone companion shows an app that is running in RunContainer on your Windows PC on your iPhone. The phone is a screen and keyboard for the PC: the app still runs on the PC, in its own environment. Nothing is installed or run on the phone.

It is a home-screen web app. There is no App Store download and no account. Open one address in Safari, add it to the Home Screen, and it opens full screen like any other app.

::: tip Where the setting lives — inside RunContainer, not Windows Settings
This is a page inside **RunContainer's own window**. Windows Settings has nothing like it.

1. Open **RunContainer**.
2. Click **Settings** in RunContainer's left-hand tab list.
3. The **iPhone companion** card is the first card on that page, above **Appearance**. Press **Turn on**.

If that card is not there, your copy is older than 0.9.4. If it is there but shows an address instead of a QR code, your copy is older than 0.9.6. Check the version on the **Info** tab, or [download the current build](/downloads).
:::

::: warning Experimental
The companion is new. Its behaviour, layout and connection details may change between releases. Remote control depends on your network, and it is not a replacement for being at the PC.
:::

## Quick start

1. In RunContainer, open **Settings → iPhone companion** and press **Turn on**.
2. Point the **iPhone camera** at the QR code on the card, then tap the link the camera offers.
3. In Safari, tap **Share**, then **Add to Home Screen**, and keep the suggested name.
4. Open the companion from the Home Screen, type the six-digit pairing code shown on the PC, name the phone, and tap **Pair with my PC**.

There is no port to type and no separate download. The QR code opens the companion page, and the Home Screen icon opens the real interface from then on. If a camera is not handy, **Copy link instead** copies the same address to send to the phone.

The companion is served by the PC itself, so it only works while the PC is on and the phone can reach it.

## What you need

- RunContainer 0.9.6 or later on Windows 10 or 11, with the app you want to use already running there. The companion itself arrived in 0.9.4; the QR code arrived in 0.9.6.
- The PC switched on and awake. It does not need to be at the same desk, but it must be running.
- An iPhone with Safari. Adding a site to the Home Screen works on iOS 16.4 and later; a recent iPad behaves the same way.
- A way for the phone to reach the PC's address: the same Wi-Fi, or a private network between the two when you are away.

## If the phone cannot reach the PC

The companion is served by the PC itself, so the phone has to be able to reach its address. Pick the row that matches where you are:

| Situation | What to use | Notes |
| --- | --- | --- |
| Phone and PC on the same Wi-Fi | The `192.168.…` or `10.…` address | Nothing else to install. Allow RunContainer on **Private** networks when Windows asks. |
| Away from home, on mobile data | An address beginning `100.` | Install [Tailscale](https://tailscale.com/) on the PC and the iPhone, sign both in to the same account, then use the `100.` address. |
| A VPN that gives the phone a route to the PC | The address on the card that the phone can open | LocalDevVPN and similar apps may work, but they are not tested or supported. |

**Do not forward the companion's port on your router.** Tailscale or another private network is the supported way to reach the PC from outside; exposing the port to the internet defeats the pairing code.

## Use an app

The companion lists the apps RunContainer knows about. An app that is **Running** can be opened; one that is not says so, and needs to be started on the PC first.

Inside an app:

- **Tap** is a click, **drag** moves the pointer, and a **two-finger scroll** is the mouse wheel.
- **⌨** shows keys the phone keyboard does not have: Esc, Tab, Backspace, Enter and the arrow keys.
- The field at the bottom sends what you type straight to the app, including characters your PC keyboard layout would not produce. Pressing it with an empty field sends Enter.
- **Auto / Sharp / Data saver** changes the picture quality. Data saver is smaller and slower; Sharp is larger and smoother. Use Data saver on mobile data.

While a phone is watching, the app's window on the PC says so. Turning the companion off, leaving the app, or closing RunContainer ends the session.

## Turning it off, and replacing a phone

- **Turn off** stops the companion and closes any connection.
- **New code** generates a fresh pairing code; the old one stops working.
- **Forget paired phones** un-pairs every phone. That phone has to enter a new code to connect again.

The companion stays on across restarts once it has been turned on, so the Home Screen shortcut keeps working.

## What it cannot do

- **It does not run apps on the phone.** It cannot open `.exe` files on an iPhone, and it cannot install or run `.ipa` files. The app runs on the PC.
- **It does not start apps.** Start the app on the PC first; then it can be opened from the phone.
- **It shows one app window, not the desktop.** Windows, dialogs and prompts outside that window are not visible to the phone.
- **It does not work while the PC is off or asleep**, or when the phone cannot reach the PC's network.
- **It cannot answer Windows security prompts.** A permission prompt or an elevated window appears on the PC and needs someone there.
- **It is not a remote desktop.** There is no file browsing, clipboard sharing or audio.

## Security and privacy

- **Off by default.** The companion only starts when you turn it on.
- **One window at a time.** It shares the app window you open, not your screen.
- **A code only the PC shows.** Pairing needs that code, it is single use, and it expires. A phone that is not paired can do nothing.
- **Only your network.** The page is served by the PC itself. On your own Wi-Fi, that traffic stays on your network. Away from home, use Tailscale rather than exposing the port on your router.
- **Anyone using a paired phone can use the app** while it is connected, exactly as if they were at the keyboard. Remove a phone you no longer trust with **Forget paired phones**.
- **Traffic is not end-to-end encrypted by RunContainer.** It is only as private as the network it crosses.

## Troubleshooting

**I cannot find the iPhone companion setting.** It is in RunContainer, under **Settings** — not in Windows Settings. It arrived in 0.9.4; the QR code arrived in 0.9.6. On an older build, update first.

**The address will not open on the phone.** Check that both devices are on the same network, or that the private network is connected on both. On Windows, allow RunContainer through the firewall for **Private** networks; a prompt usually appears the first time the companion starts. If the PC's address changed, the Settings card shows the current one. A `localhost` address only works on the PC itself, so use one of the other addresses listed.

**The pairing code was refused or has expired.** Generate a new code on the PC and type it again.

**An app says it is not available to open.** The app must be running in its own RunContainer window. Start it on the PC; if Windows refused to host its window, the phone cannot show it.

**The picture is slow or stops.** Lower the quality, and check the phone's connection. A busy app full-screen at Sharp quality uses noticeably more data.

**Nothing happens when I tap.** The click goes to the point you tapped, so a control that needs a double click needs two quick taps. Windows security prompts cannot be answered remotely.
