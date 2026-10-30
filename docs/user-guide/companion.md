# iPhone companion (experimental)

The iPhone companion shows an app that is running in RunContainer on your Windows PC on your iPhone. The phone is a screen and keyboard for the PC: the app still runs on the PC, in its own environment. Nothing is installed or run on the phone.

It is a home-screen web app. There is no App Store download and no account. Open one address in Safari, add it to the Home Screen, and it opens full screen like any other app.

There are two ways to reach it. The **web address** is an ordinary `https://…ts.net` URL opened through Tailscale Funnel: it has no port and works away from home. The **local address** works on the same Wi-Fi without Tailscale. Both are installed the same way, and the web address is the one to use if you want it to behave like a real web app.

::: tip Where the setting lives — inside RunContainer, not Windows Settings
This is a page inside **RunContainer's own window**. Windows Settings has nothing like it.

1. Open **RunContainer**.
2. Click **Settings** in RunContainer's left-hand tab list.
3. The **iPhone companion** card is the first card on that page, above **Appearance**. Press **Turn on**.

If that card is not there, your copy is older than 0.9.4. If it is there but shows an address instead of a QR code, your copy is older than 0.9.6. The web address arrived in 0.9.7. Check the version on the **Info** tab, or [download the current build](/downloads).
:::

::: warning Experimental
The companion is new. Its behaviour, layout and connection details may change between releases. Remote control depends on your network, and it is not a replacement for being at the PC.
:::

## Quick start

1. In RunContainer, open **Settings → iPhone companion** and press **Turn on**.
2. For a real web address, press **Open web address**. Tailscale must be installed and signed in on the PC; the card says so if it is not. The QR code becomes `https://…ts.net/`.
3. Point the **iPhone camera** at the QR code, then tap the link the camera offers.
4. In Safari, tap **Share**, then **Add to Home Screen**, and keep the suggested name.
5. Open the companion from the Home Screen, type the six-digit pairing code shown on the PC, name the phone, and tap **Pair with my PC**.

There is no port to type and no separate download. The Home Screen icon opens the real interface from then on. If a camera is not handy, **Copy link instead** copies the same address to send to the phone.

## A real web address (recommended)

The web address is an ordinary HTTPS URL, so the phone treats it like any other website. It works on mobile data, has no port in it, and survives the PC's local address changing.

1. Install [Tailscale for Windows](https://tailscale.com/download/windows) and sign in. The same free account can be used on the phone later, but the phone does not need Tailscale for this address.
2. In RunContainer, open **Settings → iPhone companion** and press **Turn on**.
3. Press **Open web address**. The first time, Tailscale may ask you to enable Funnel for the tailnet; open the link it shows, enable it once, then press the button again.
4. The card now shows `https://<your-pc>.<your-tailnet>.ts.net/`, and the QR code points at it.

::: warning The address is public while it is on
Tailscale Funnel makes the companion reachable from the internet, so anyone with the URL can load the pairing page. The six-digit code is still required to see or control an app, but the page itself is public. Leave it off when you are not using it.
:::

The address closes when you press **Turn off web address**, when you turn the companion off, or when RunContainer quits. It does not survive as a background service.

## Without Tailscale

Without Tailscale, the companion uses an address on the PC's own network. It works on the same Wi-Fi and needs no account:

| Situation | What to use | Notes |
| --- | --- | --- |
| Phone and PC on the same Wi-Fi | The `192.168.…` or `10.…` address | Allow RunContainer on **Private** networks when Windows asks. |
| Away from home, no web address | A private network such as Tailscale | Install Tailscale on both devices, then use the `100.` address listed under **Addresses this PC answers on**. |
| A VPN that gives the phone a route to the PC | The address on the card that the phone can open | LocalDevVPN and similar apps may work, but they are not tested or supported. |

**Do not forward the companion's port on your router.** Use the web address or a private network instead; exposing the port directly defeats the pairing code.

## What you need

- RunContainer 0.9.7 or later on Windows 10 or 11, with the app you want to use already running there. The companion itself arrived in 0.9.4, the QR code in 0.9.6, and the web address in 0.9.7.
- The PC switched on and awake. It does not need to be at the same desk, but it must be running.
- An iPhone with Safari. Adding a site to the Home Screen works on iOS 16.4 and later; a recent iPad behaves the same way.
- For the web address: [Tailscale](https://tailscale.com/download/windows) installed and signed in on the PC.
- For the local address: the phone and PC on the same Wi-Fi.

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
- **A web address is public.** When the web address is on, the page is reachable from the internet through Tailscale Funnel. Only the pairing page loads without the code, but that page is visible to anyone with the URL. Turn it off when you are finished.
- **Only your network for a local address.** The local page is served by the PC itself. On your own Wi-Fi, that traffic stays on your network. Do not forward the port on your router.
- **Anyone using a paired phone can use the app** while it is connected, exactly as if they were at the keyboard. Remove a phone you no longer trust with **Forget paired phones**.
- **Traffic is not end-to-end encrypted by RunContainer.** It is only as private as the network it crosses.

## Troubleshooting

**I cannot find the iPhone companion setting.** It is in RunContainer, under **Settings** — not in Windows Settings. It arrived in 0.9.4; the QR code arrived in 0.9.6. On an older build, update first.

**There is no Open web address button.** Tailscale is not installed, is not signed in, or the card cannot find it. Install Tailscale on the PC, sign in, then reopen Settings. The card says which of those it is.

**Tailscale asks to enable Funnel.** Open the link the card shows once, enable Funnel for the tailnet in the Tailscale admin console, then press **Open web address** again.

**The web address says the site cannot be reached.** Check that the companion is on and RunContainer is still running; the address closes with the app. If Tailscale was restarted, press **Turn off web address** and open it again.

**The address will not open on the phone.** Check that both devices are on the same network, or that the private network is connected on both. On Windows, allow RunContainer through the firewall for **Private** networks; a prompt usually appears the first time the companion starts. If the PC's address changed, the Settings card shows the current one. A `localhost` address only works on the PC itself, so use one of the other addresses listed.

**The pairing code was refused or has expired.** Generate a new code on the PC and type it again.

**An app says it is not available to open.** The app must be running in its own RunContainer window. Start it on the PC; if Windows refused to host its window, the phone cannot show it.

**The picture is slow or stops.** Lower the quality, and check the phone's connection. A busy app full-screen at Sharp quality uses noticeably more data.

**Nothing happens when I tap.** The click goes to the point you tapped, so a control that needs a double click needs two quick taps. Windows security prompts cannot be answered remotely.
