# Developer mode, and running a virtual machine

RunContainer's normal interface is deliberately plain: what an app is doing, where its files live, and what the supervisor can and cannot do. **Developer mode** is one switch in **Settings** that adds the technical detail and one extra tab.

It is a development switch, not a different product. The app behaves identically either way, isolation is unchanged, and nothing is hidden that existed before — the same panels are there, with fewer internals on show, when it is off.

## Turning it on

1. Open **Settings**.
2. Find the **Developer mode** card at the top.
3. Press **Enable developer mode**.

The choice belongs to this installation and is remembered across restarts and across updates. Press **Turn off developer mode** to go back: the Virtualise tab closes and the audit detail hides again, and nothing you created is deleted.

## What it reveals

| Revealed | Where |
| --- | --- |
| RC-Brain's audit detail: model artefact and registry, parameter and feature counts, held-out evaluation results, label counts, verified-outcome and learning-loop counters, the agent catalogue, and the model's stated limits | Settings, in the RC-Brain panel |
| Launch timings: the backend in use, the last launch, and the median of recent launches | Settings, **Performance on this PC** |
| **Virtualise**: configure and run a whole operating system | A new tab in the bottom bar |

With developer mode off, **Settings** keeps the parts that answer a normal question: whether the model is loaded, whether it is watching, what it may do on its own, that inference stays on this PC, and the list of recent diagnoses.

→ [RC-Brain: RunContainer's own AI model](/guide/ai-brain)

## Virtualise: an operating system inside RunContainer

**Virtualise** runs a real virtual machine on the same custom QEMU backend that the VM isolation engine uses. QEMU does not open a window of its own: it serves the guest's screen on loopback, and RunContainer draws that screen inside its own window. The socket that carries it lives in the main process, so the window never opens a network connection itself.

This is a genuine virtual machine in the ordinary sense — its own virtual disk, its own memory and CPUs, its own operating system, separate from your PC.

### What you need

- **QEMU installed on your PC.** RunContainer detects it and reports the version and the acceleration in use. If it is missing, the tab says so and offers **Detect QEMU**. Nothing is bundled.
- **Installation media you own** — an `.iso` or disk image. RunContainer ships no guest operating system and no licence, downloads none, and cannot provide one.
- Enough memory and disk space for the guest.

### Creating a machine

Press **Browse…** to attach media, and set the rest from the lists the form offers:

| Option | What you can pick |
| --- | --- |
| Name | 2–60 characters, with no path separator or reserved character, because it names the disk file |
| Memory | 1, 2, 4, 8, 16 or 32 GB |
| CPUs | 1, 2, 4, 6, 8, 12 or 16 |
| Disk | 8, 20, 40, 60, 80, 120, 256 or 512 GB |
| Installation media | An `.iso` or `.img` you supply; it can be left unattached |
| Boot the attached media first | Ticked for a fresh install; untick it once a system is installed |

Press **Create virtual machine**. The virtual disk is a `qcow2` file created at that size, which grows as the guest writes to it rather than taking the whole size immediately.

### Booting it

Press **Start**. QEMU is launched with its console on a loopback port that RunContainer checks is free first. Nothing is drawn by QEMU itself: press **Show console** and the guest's screen is painted in a panel below the machine's card, and **Hide console** puts it away without stopping the machine.

- With **Boot the attached media first** ticked, the guest boots from the media: that is how you install the system, exactly as you would in VirtualBox or VMware.
- With it unticked, the guest boots from its own disk.
- **Stop** ends the machine and **Delete** removes it together with its virtual disk.

### What happens to a machine when RunContainer closes

A machine is not left behind. Closing RunContainer stops any machine that is running, because each one owns a virtual disk and a console port and there is no window left to show it in. A machine that outlived the app — after a crash, or after RunContainer was killed — is stopped the next time RunContainer starts, and it says so in its log.

That is not only tidiness. A QEMU process that survived the app still holds the machine's disk open, and starting the machine again would boot a second one on that same disk, which can corrupt the guest's filesystem. So **Start** refuses while the disk is still in use and names the machine holding it, and **Stop** can still stop a machine left over from a previous session. Each machine's QEMU process is recorded, so what this tab shows as Running or Stopped is measured rather than remembered, and a machine that has genuinely stopped clears its record by itself.

### Using the console

- **Click the screen** to give the guest your keyboard. Everything you type goes to the guest, not to RunContainer.
- **Send Ctrl+Alt+Del** is a button, because your PC's own key combination never reaches a guest.
- The console follows the guest when it changes resolution, and mouse positioning is absolute — the guest's cursor lands where you click.
- Nothing else is integrated: there is no clipboard sharing, no drag and drop and no shared folders.

### What is experimental about it

The tab is labelled **Experimental** and that is accurate rather than modest. Expect bugs, and expect these limits in particular:

- **Frames are uncompressed over loopback.** A busy desktop, video playback or a large window drag can look delayed. This is a working console, not a display protocol tuned for gaming.
- **A Windows guest needs the virtio storage driver to see its own disk.** A machine created here attaches its disk the efficient way, so a Windows setup will not find a drive unless the driver is supplied during setup (a second ISO with virtio drivers, or unattended media that already includes them). Linux guests have this support built in. A USB tablet is attached for the pointer, which is what makes the mouse land where you click instead of drifting.
- **Without hardware acceleration the guest is slow.** If WHPX is unavailable, QEMU falls back to software emulation, and a graphical operating system will feel it. The tab reports which one is in use.
- **Stop is an immediate power-off** — the equivalent of pulling the plug, not a shutdown request. Shut the guest down from inside for a clean exit.
- **No graceful-shutdown integration, no snapshots and no saved states.** A machine is started or stopped; there is nothing in between.

### Where the machines live on disk

Each machine gets one `.qcow2` disk image under RunContainer's data directory, in `vms\`, and the list of machines is kept in `runcontainer-vms.json` beside it. Your installation media is never copied, moved or modified. Deleting a machine removes the disk it owns; if Windows will not delete that file, RunContainer says so rather than pretending the machine is gone.

## Turning it off again

Press **Turn off developer mode** in **Settings**. The Virtualise tab closes, the audit detail hides, and any machine you created stays in the list on disk — start it again by turning developer mode back on. Turning the switch off never deletes a virtual machine.

## Related

- [Settings & profiles](/user-guide/settings)
- [RC-Brain: RunContainer's own AI model](/guide/ai-brain)
- [Isolation](/safety/isolation)
- [Known limitations](/reference/limitations)
