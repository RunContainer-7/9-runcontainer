# iPhone companion (experimental)

The iPhone companion lets you see and use an app that is running in RunContainer on your Windows PC, from an iPhone. The phone is a screen and a keyboard for the PC: the app still runs on the PC, in its own environment. Nothing is installed or run on the phone itself.

It is a home-screen web app. There is no App Store download and no account. Open one address in Safari, add it to the Home Screen, and it opens full screen like any other app.

The companion arrived in RunContainer 0.9.4. An older build does not have the setting, because the feature did not exist yet.

::: warning Experimental
The companion is new. Its behaviour, layout and connection details may change between releases. Remote control depends on your network, and it is not a replacement for being at the PC.
:::

## What you need

- RunContainer on Windows 10 or 11, with the app you want to use already running there.
- The PC switched on and awake. It does not need to be at the same desk, but it must be running.
- An iPhone with Safari. Adding a site to the Home Screen works on iOS 16.4 and later; a recent iPad behaves the same way.
- A way for the phone to reach the PC's address: the same Wi-Fi network, or a private network between the two when you are away.

## Turn it on

1. On the PC, open **Settings → iPhone companion**.
2. Choose **Turn on**.
3. The card shows one or more addresses, such as `http://192.168.1.20:7878/`, and a six-digit **pairing code**.

If the card shows more than one address, use the one that matches the network the phone is on. An address beginning `100.` is a private-network address, which is the one to use when the phone is not on the same Wi-Fi.

The companion stays on across restarts once it has been turned on, so the Home Screen shortcut keeps working. **Turn off** stops it and closes any connection.

## Add it to the Home Screen

1. On the iPhone, open the address in **Safari**. (Other browsers can open the page, but only Safari can add it to the Home Screen with its own icon.)
2. Tap **Share**, then **Add to Home Screen**.
3. Keep the suggested name, and tap **Add**.

The icon sits on the Home Screen like any other app. Opening it shows the companion without Safari's toolbar.

## Pair the phone

1. Open the companion from the Home Screen.
2. Type the six-digit code shown on the PC.
3. Give the phone a name, so you can recognise it later, and tap **Pair with my PC**.

The code is used once and expires after five minutes. A wrong code is refused, and repeated wrong codes stop being accepted until a new code is generated on the PC. **New code** on the PC makes a fresh one.

The phone stays paired until you choose **Forget paired phones** on the PC. That closes its connection and requires the code again.

## Use an app

The companion lists the apps RunContainer knows about. An app that is **Running** can be opened; one that is not says so, and needs to be started on the PC first.

Inside an app:

- **Tap** is a click, **drag** moves the pointer, and a **two-finger scroll** is the mouse wheel.
- **⌨** shows keys the phone keyboard does not have: Esc, Tab, Backspace, Enter and the arrow keys.
- The field at the bottom sends what you type straight to the app, including characters your PC keyboard layout would not produce. Pressing it with an empty field sends Enter.
- **Auto / Sharp / Data saver** changes the picture quality. Data saver is smaller and slower; Sharp is larger and smoother. Use Data saver on mobile data.

While a phone is watching, the app's window on the PC says so. Turning the companion off, leaving the app, or closing RunContainer ends the session.

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
- **Only your network.** The page is served by the PC itself. On your own Wi-Fi, that traffic stays on your network. Away from home, use a private network such as Tailscale rather than exposing the port on your router: **do not forward this port to the internet.**
- **Anyone using a paired phone can use the app** while it is connected, exactly as if they were at the keyboard. Remove a phone you no longer trust with **Forget paired phones**.
- **Traffic is not end-to-end encrypted by RunContainer.** It is only as private as the network it crosses.

## Troubleshooting

**The address will not open on the phone.** Check that both devices are on the same network, or that the private network is connected on both. On Windows, allow RunContainer through the firewall for **Private** networks; a prompt usually appears the first time the companion starts. If the PC's address changed, the Settings card shows the current one.

**The pairing code was refused or has expired.** Generate a new code on the PC and type it again.

**An app says it is not available to open.** The app must be running in its own RunContainer window. Start it on the PC; if Windows refused to host its window, the phone cannot show it.

**The picture is slow or stops.** Lower the quality, and check the phone's connection. A busy app full-screen at Sharp quality uses noticeably more data.

**Nothing happens when I tap.** The click goes to the point you tapped, so a control that needs a double click needs two quick taps. Windows security prompts cannot be answered remotely.
