# Performance and JIT

RunContainer 0.7.0 added a Performance Engine: launch timings, a cached launcher assembly, a slower (cheaper) process poll, and a runtime card in Tweaks that tells the truth about just-in-time compilation.

This page explains what was actually measured, what the JIT panel can and cannot do, and how to reproduce the numbers.

## The short version

- **RunContainer's own startup work:** the launcher's C# helper is compiled once and reused. Launch latency dropped measurably on the reference machine; see the table below.
- **Applications:** native Windows programs are already machine code. Managed .NET programs are JIT-compiled by the .NET runtime, which is already doing it. Tweaks lets you choose how the .NET runtime balances startup against steady-state speed. It cannot make a native executable "use JIT", because there is no intermediate language to compile.
- **RunContainer itself** runs on Electron's V8, which JIT-compiles JavaScript by default. That is built in; there is no per-application switch.

## Measured results

| Measurement | 0.6.x | 0.7.0 | Change |
| --- | ---: | ---: | ---: |
| Run → PID reported | 637 ms | 493 ms | −23% |
| Run → containment verified | 712 ms | 563 ms | −21% |
| Run → process exit reported | 1084 ms | 911 ms | −16% |

Measured on Windows 10 (build 19045), Intel Core i5-6440HQ, 4 logical processors, 8 GB RAM, Windows PowerShell 5.1, RCVM containment. Five runs per configuration, medians reported; the benchmark and every raw sample are in `reports/performance-0.7.0.md` in the source repository.

These figures cover the launch path only. They stop when containment is confirmed, not when the application has finished drawing its first window, and they say nothing about how fast an application runs afterwards.

## What changed

### The launcher assembly is compiled once

Every RCVM launch runs a small PowerShell launcher that creates a Job Object, starts the app suspended, assigns it to the job and verifies it. That launcher embeds C#, which `Add-Type` used to compile on every launch — roughly a third of the launch time.

The compiled assembly is now written to RunContainer's data folder and loaded afterwards. The file name contains a hash of the launcher source, so a new build can never load an old cached assembly, and a failed cache write falls back to compiling in memory.

### The process poll is five seconds, not 1.5

Checking whether an app is still running costs one Windows process-table query (about 0.64 s on the reference machine). At a 1.5 s interval RunContainer was running that query for roughly 40% of the time an app was open. The interval is now 5 s — about 13% — and a closed app is still noticed within a few seconds.

### The Tweaks panel reports instead of pretending

See [Runtime and JIT in Tweaks](#runtime-and-jit-in-tweaks).

## Runtime and JIT in Tweaks

Select an app in **Tweaks** and the **Runtime & JIT** card shows:

- **what the app is**, read from its own executable header: *Native code* or *Managed .NET*, plus architecture (x64, x86, arm64) and whether it is a GUI or console program;
- **what that means for JIT** — a sentence, not a percentage;
- **a .NET strategy**, enabled only for managed apps.

### Why there is no universal "Enable JIT" switch

JIT (just-in-time compilation) turns intermediate language into machine code while a program runs. It applies to runtimes that execute IL: .NET, Java, JavaScript engines such as V8, and similar.

- A **native** `.exe` built with C, C++, Rust or Qt is already machine code. There is no IL, so there is nothing to JIT. RunContainer will not offer a strategy for it.
- A **.NET** app ships IL and the .NET runtime JIT-compiles it automatically. You can influence *how* it compiles, which is what the strategy selects.
- **Java** applications use their own JVM and its tiered JIT. RunContainer does not modify JVM flags; the JVM's defaults are already the optimised path.
- **Electron and Node** applications run on V8, which JITs automatically.
- **RunContainer itself** is an Electron application; its JavaScript is JIT-compiled by V8 from the first launch. Turning that off would only make it slower.

Writing a custom JIT, or injecting compiled code into an executable, would not help and would weaken the security model. RunContainer does neither.

### The .NET strategies

| Strategy | What it sets | When it helps |
| --- | --- | --- |
| Automatic (runtime default) | Nothing | The right choice unless you have a reason to change it |
| Fast start | `DOTNET_TieredCompilation=0`, `DOTNET_TC_QuickJitForLoops=0` | Short-lived tools and installers, where background recompilation is wasted work |
| Maximum speed | `DOTNET_TieredCompilation=1`, `DOTNET_TC_QuickJitForLoops=1`, `DOTNET_TieredPGO=1` | Long-running applications; this is the modern default, stated explicitly |

These are documented .NET runtime settings, applied only to managed apps, and only as environment variables for that one launch. No file is patched, no code is injected, and the strategy is recorded in the app's own log when it is applied.

They have not been benchmarked here: no managed sample application was available on the reference machine. They are offered as runtime configuration, not as a promised speedup.

## The Performance card in Settings

With [developer mode](/guide/developer-mode) on, **Settings** shows measured facts from your own machine:

- the backend in use;
- the last launch time and the median of recent launches, recorded from Run until containment is confirmed;
- how often running apps are checked.

The card is part of the detail developer mode reveals; with it off, Settings keeps the summaries a normal run needs. If no launch has been measured yet, the card says so instead of showing a placeholder number. Timings are stored locally in RunContainer's data folder, capped at the last 50 launches, and never uploaded.

## Reproducing the benchmark

From the source repository, on Windows:

```powershell
node scripts/benchmark-launch.js --runs 7
node scripts/benchmark-launch.js --runs 7 --no-cache
```

`--no-cache` reproduces the old behaviour (compile on every launch) so the comparison is reproducible. The script prints progress on stderr and a JSON report with the machine description and every raw sample on stdout.

## Limitations

- Only RCVM containment can be benchmarked this way. Hyper-V and QEMU virtual machines were not provisioned on the reference machine, so their cold and warm startup remain **unmeasured**.
- Launch timings measure containment confirmation, not application readiness.
- The process poll reduces CPU use; it is not a launch-speed improvement.
- Some installers (for example the MSYS2 Qt Installer Framework setup) refuse to run inside a Job Object and exit with code 1. RunContainer reports that exit code and refuses to launch them uncontained; use a virtual machine environment for those.
