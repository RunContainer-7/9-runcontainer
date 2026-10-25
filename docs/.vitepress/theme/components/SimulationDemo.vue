<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

// A looping, animated walkthrough — not a screenshot and not a screen recording.
// It is drawn from the real product flow: pick an app, press Run, the window opens
// inside RunContainer. Reduced-motion users get the final frame and working controls.
const steps = [
  {
    label: 'Pick an app',
    caption: 'Any .exe is installed into its own environment — its files, its profile, its settings.',
  },
  {
    label: 'Press Run',
    caption: 'RunContainer starts it contained: Job Object caps and its own data folder, verified before it is shown.',
  },
  {
    label: 'It opens inside RunContainer',
    caption: 'The app’s window appears inside a RunContainer window. You never leave the app you were in.',
  },
  {
    label: 'Close it',
    caption: 'When it closes, everything it wrote stays in its environment. Nothing was scattered across your PC.',
  },
]

const step = ref(0)
const playing = ref(true)
let timer: ReturnType<typeof setInterval> | undefined

const apps = [
  { name: 'PixelPaint Studio', meta: 'Demo editor · 46 MB', initial: 'P', tone: 'blue' },
  { name: 'NoteWell', meta: 'Notes · 12 MB', initial: 'N', tone: 'amber' },
  { name: 'Retro Golf', meta: 'Game · 210 MB', initial: 'R', tone: 'pink' },
]

const running = computed(() => step.value >= 1)
const opened = computed(() => step.value >= 2)
const caption = computed(() => steps[step.value].caption)

function advance() {
  step.value = (step.value + 1) % steps.length
}

function start() {
  stop()
  playing.value = true
  timer = setInterval(advance, 3600)
}

function stop() {
  if (timer) clearInterval(timer)
  timer = undefined
}

function toggle() {
  if (playing.value) {
    stop()
    playing.value = false
  } else {
    start()
  }
}

function replay() {
  step.value = 0
  start()
}

onMounted(() => {
  const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  if (reduce) {
    playing.value = false
    step.value = 2
    return
  }
  start()
})

onBeforeUnmount(stop)
</script>

<template>
  <section
    class="rc-sim"
    :class="[`is-step-${step}`, { 'is-paused': !playing, 'is-running': running, 'is-open': opened }]"
    aria-labelledby="rc-sim-heading"
  >
    <div class="rc-sim-copy">
      <p class="rc-sim-eyebrow">Simulation</p>
      <h2 id="rc-sim-heading">An app that opens apps inside itself</h2>
      <p>
        That is the whole idea. RunContainer is one window on your PC; the applications you add
        open <em>inside</em> it, each in its own environment, instead of becoming another
        stand-alone icon on your desktop.
      </p>
    </div>

    <div
      class="rc-sim-stage"
      role="img"
      :aria-label="`Illustration, not a screen recording. Animated simulation: ${caption}`"
    >
      <p class="rc-sim-badge">Illustration · not a screen recording</p>
      <div class="rc-shell" aria-hidden="true">
        <div class="rc-shell-bar">
          <span class="rc-dot rc-dot--red"></span>
          <span class="rc-dot rc-dot--amber"></span>
          <span class="rc-dot rc-dot--green"></span>
          <span class="rc-shell-title">RunContainer</span>
        </div>
        <div class="rc-shell-body">
          <nav class="rc-rail">
            <span class="rc-rail-item is-active">Apps</span>
            <span class="rc-rail-item">Environments</span>
            <span class="rc-rail-item">Settings</span>
          </nav>
          <div class="rc-list">
            <div class="rc-list-head">
              <span>My Apps</span>
              <span class="rc-list-count">3 installed</span>
            </div>
            <div
              v-for="(app, index) in apps"
              :key="app.name"
              class="rc-row"
              :class="{ 'is-selected': index === 0 }"
            >
              <span class="rc-tile" :class="`tone-${app.tone}`">{{ app.initial }}</span>
              <span class="rc-row-text">
                <strong>{{ app.name }}</strong>
                <small>{{ app.meta }} · <span class="rc-state">{{ index === 0 && running ? (opened ? 'Running' : 'Starting…') : 'Installed' }}</span></small>
              </span>
              <span class="rc-run" :class="{ 'is-busy': index === 0 && running }">
                {{ index === 0 && running ? (opened ? 'Running' : 'Starting') : 'Run' }}
              </span>
            </div>
            <p class="rc-hint">Each app keeps its own files and settings in its own environment.</p>
          </div>

          <span class="rc-cursor" aria-hidden="true"></span>
          <span class="rc-ripple" aria-hidden="true"></span>

          <div class="rc-app" aria-hidden="true">
            <div class="rc-app-bar">
              <span>PixelPaint Studio</span>
              <span class="rc-app-chip">in RunContainer</span>
            </div>
            <div class="rc-app-body">
              <div class="rc-app-tools">
                <span class="rc-tool"></span>
                <span class="rc-tool rc-tool--round"></span>
                <span class="rc-tool rc-tool--small"></span>
                <span class="rc-tool rc-tool--small"></span>
              </div>
              <div class="rc-canvas">
                <span class="rc-shape rc-shape--circle"></span>
                <span class="rc-shape rc-shape--bar"></span>
                <span class="rc-shape rc-shape--dot"></span>
              </div>
              <div class="rc-app-foot">Contained · Job Object caps · own profile folder</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="rc-sim-footer">
      <ol class="rc-steps">
        <li v-for="(item, index) in steps" :key="item.label" :class="{ 'is-active': index === step }">
          <button type="button" :aria-current="index === step ? 'step' : undefined" @click="step = index; stop(); playing = false">
            <span class="rc-step-num">{{ index + 1 }}</span>
            <span>{{ item.label }}</span>
          </button>
        </li>
      </ol>
      <p class="rc-caption" aria-live="polite">{{ caption }}</p>
      <div class="rc-controls">
        <button type="button" class="rc-control" @click="toggle">{{ playing ? 'Pause' : 'Play' }}</button>
        <button type="button" class="rc-control rc-control--ghost" @click="replay">Replay</button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.rc-sim {
  margin: 32px 0;
  padding: 22px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 16px;
  background: var(--vp-c-bg-soft);
}

.rc-sim-eyebrow {
  margin: 0;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--vp-c-brand-1);
}

.rc-sim-copy h2 {
  margin: 6px 0 10px;
  font-size: 1.4rem;
  line-height: 1.25;
}

.rc-sim-copy p {
  margin: 0 0 18px;
  max-width: 62ch;
  color: var(--vp-c-text-2);
  line-height: 1.6;
}

.rc-sim-stage {
  position: relative;
  padding: 18px;
  border-radius: 14px;
  background:
    radial-gradient(1200px 320px at 20% -10%, rgba(59, 130, 246, 0.22), transparent 70%),
    #070b16;
  overflow: hidden;
}

.rc-sim-badge {
  position: absolute;
  top: 10px;
  right: 12px;
  z-index: 3;
  margin: 0;
  padding: 3px 9px;
  border: 1px solid rgba(148, 163, 184, 0.35);
  border-radius: 999px;
  background: rgba(15, 23, 42, 0.82);
  color: #cbd5e1;
  font-size: 0.66rem;
  font-weight: 600;
  letter-spacing: 0.02em;
}

.rc-shell {
  position: relative;
  border: 1px solid rgba(148, 163, 184, 0.22);
  border-radius: 12px;
  background: #0f172a;
  box-shadow: 0 24px 60px rgba(2, 6, 23, 0.55);
  overflow: hidden;
}

.rc-shell-bar {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 9px 12px;
  background: #151f36;
  border-bottom: 1px solid rgba(148, 163, 184, 0.16);
}

.rc-dot {
  width: 9px;
  height: 9px;
  border-radius: 50%;
}
.rc-dot--red { background: #f87171; }
.rc-dot--amber { background: #fbbf24; }
.rc-dot--green { background: #34d399; }

.rc-shell-title {
  margin-left: 6px;
  font-size: 0.75rem;
  color: #94a3b8;
}

.rc-shell-body {
  position: relative;
  display: grid;
  grid-template-columns: 120px minmax(0, 1fr);
  min-height: 268px;
}

.rc-rail {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 14px 10px;
  background: #0b1222;
  border-right: 1px solid rgba(148, 163, 184, 0.14);
}

.rc-rail-item {
  padding: 6px 8px;
  border-radius: 7px;
  font-size: 0.72rem;
  color: #94a3b8;
}
.rc-rail-item.is-active {
  background: rgba(37, 99, 235, 0.25);
  color: #dbeafe;
}

.rc-list {
  padding: 14px 16px 18px;
}

.rc-list-head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin-bottom: 10px;
  font-size: 0.82rem;
  font-weight: 700;
  color: #e2e8f0;
}

.rc-list-count {
  font-size: 0.68rem;
  font-weight: 500;
  color: #64748b;
}

.rc-row {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 9px 10px;
  border: 1px solid rgba(96, 165, 250, 0.14);
  border-radius: 10px;
  background: rgba(15, 23, 42, 0.92);
  margin-bottom: 8px;
  transition: border-color 400ms ease, background 400ms ease, transform 400ms ease;
}

.rc-sim.is-step-0 .rc-row.is-selected {
  border-color: rgba(96, 165, 250, 0.7);
  background: rgba(30, 58, 138, 0.35);
}

.rc-tile {
  width: 30px;
  height: 30px;
  flex: 0 0 30px;
  border-radius: 8px;
  display: grid;
  place-items: center;
  font-size: 0.78rem;
  font-weight: 800;
  color: #f8fafc;
}
.tone-blue { background: linear-gradient(135deg, #1d4ed8, #38bdf8); }
.tone-amber { background: linear-gradient(135deg, #b45309, #fbbf24); }
.tone-pink { background: linear-gradient(135deg, #9d174d, #f472b6); }

.rc-row-text {
  display: flex;
  flex-direction: column;
  min-width: 0;
  flex: 1;
}
.rc-row-text strong {
  font-size: 0.78rem;
  color: #e2e8f0;
}
.rc-row-text small {
  font-size: 0.66rem;
  color: #64748b;
}
.rc-state {
  color: #93c5fd;
}

.rc-run {
  padding: 5px 11px;
  border-radius: 7px;
  background: #1d4ed8;
  color: #eff6ff;
  font-size: 0.68rem;
  font-weight: 700;
  transition: background 300ms ease, transform 300ms ease;
}
.rc-run.is-busy {
  background: #0e7490;
}

.rc-hint {
  margin: 10px 2px 0;
  font-size: 0.66rem;
  color: #64748b;
}

/* Cursor: moves to the Run button, presses, then follows the app window. */
.rc-cursor {
  position: absolute;
  left: 62%;
  top: 42%;
  width: 12px;
  height: 12px;
  border-radius: 2px 8px 2px 8px;
  background: #f8fafc;
  box-shadow: 0 0 0 1px rgba(2, 6, 23, 0.7), 0 4px 10px rgba(2, 6, 23, 0.6);
  transform: rotate(-18deg);
  transition: left 900ms cubic-bezier(0.22, 1, 0.36, 1), top 900ms cubic-bezier(0.22, 1, 0.36, 1), opacity 400ms ease;
  opacity: 0;
  pointer-events: none;
}

.rc-sim.is-step-0 .rc-cursor,
.rc-sim.is-step-1 .rc-cursor {
  opacity: 1;
}
.rc-sim.is-step-0 .rc-cursor { left: 54%; top: 48%; }
.rc-sim.is-step-1 .rc-cursor { left: 91%; top: 24%; }
.rc-sim.is-step-2 .rc-cursor { left: 46%; top: 63%; opacity: 0.9; }
.rc-sim.is-step-3 .rc-cursor { left: 40%; top: 30%; opacity: 0; }

.rc-ripple {
  position: absolute;
  left: 91%;
  top: 24%;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 2px solid #93c5fd;
  opacity: 0;
  pointer-events: none;
}
.rc-sim.is-step-1 .rc-ripple {
  animation: rc-ripple 1100ms ease-out 700ms 2;
}

@keyframes rc-ripple {
  0% { opacity: 0.9; transform: scale(0.4); }
  100% { opacity: 0; transform: scale(3.2); }
}

/* The app's own window, opening inside RunContainer. */
.rc-app {
  position: absolute;
  left: 132px;
  right: 20px;
  top: 58px;
  bottom: 16px;
  border: 1px solid rgba(148, 163, 184, 0.3);
  border-radius: 10px;
  background: #0b1222;
  box-shadow: 0 30px 70px rgba(2, 6, 23, 0.7);
  opacity: 0;
  transform: translateY(14px) scale(0.94);
  transform-origin: 40% 20%;
  transition: opacity 600ms ease, transform 700ms cubic-bezier(0.22, 1, 0.36, 1);
  pointer-events: none;
  overflow: hidden;
}

.rc-sim.is-step-2 .rc-app,
.rc-sim.is-step-3 .rc-app {
  opacity: 1;
  transform: translateY(0) scale(1);
}

.rc-app-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 7px 10px;
  background: #111c33;
  border-bottom: 1px solid rgba(148, 163, 184, 0.18);
  font-size: 0.7rem;
  font-weight: 700;
  color: #dbeafe;
}

.rc-app-chip {
  font-size: 0.6rem;
  font-weight: 600;
  padding: 2px 7px;
  border-radius: 999px;
  background: rgba(37, 99, 235, 0.35);
  color: #bfdbfe;
}

.rc-app-body {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 10px;
}

.rc-app-tools {
  display: flex;
  gap: 6px;
}
.rc-tool {
  width: 34px;
  height: 12px;
  border-radius: 4px;
  background: rgba(148, 163, 184, 0.25);
}
.rc-tool--round { width: 12px; border-radius: 50%; }
.rc-tool--small { width: 12px; }

.rc-canvas {
  position: relative;
  flex: 1;
  min-height: 108px;
  border-radius: 8px;
  background:
    linear-gradient(180deg, rgba(56, 189, 248, 0.08), rgba(15, 23, 42, 0.1)),
    repeating-linear-gradient(0deg, transparent 0 23px, rgba(148, 163, 184, 0.07) 23px 24px),
    repeating-linear-gradient(90deg, transparent 0 23px, rgba(148, 163, 184, 0.07) 23px 24px),
    #0e1a2e;
  overflow: hidden;
}

.rc-shape {
  position: absolute;
  display: block;
}
.rc-shape--circle {
  left: 18%;
  top: 22%;
  width: 54px;
  height: 54px;
  border-radius: 50%;
  background: linear-gradient(135deg, #38bdf8, #2563eb);
}
.rc-shape--bar {
  left: 44%;
  top: 46%;
  width: 110px;
  height: 18px;
  border-radius: 9px;
  background: linear-gradient(90deg, #f472b6, #fb923c);
  animation: rc-sweep 2400ms ease-in-out infinite alternate;
}
.rc-shape--dot {
  right: 14%;
  top: 24%;
  width: 22px;
  height: 22px;
  border-radius: 6px;
  background: #fbbf24;
}

@keyframes rc-sweep {
  from { transform: translateX(-8px); }
  to { transform: translateX(14px); }
}

.rc-app-foot {
  font-size: 0.62rem;
  color: #64748b;
}

.rc-sim-footer {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 12px 18px;
  align-items: center;
  margin-top: 14px;
}

.rc-steps {
  grid-column: 1 / -1;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.rc-steps button {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 6px 11px 6px 7px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 999px;
  background: transparent;
  color: var(--vp-c-text-2);
  font-size: 0.74rem;
  cursor: pointer;
  transition: border-color 200ms ease, color 200ms ease, background 200ms ease;
}

.rc-steps li.is-active button {
  border-color: var(--vp-c-brand-1);
  background: rgba(37, 99, 235, 0.14);
  color: var(--vp-c-text-1);
}

.rc-step-num {
  display: grid;
  place-items: center;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: rgba(148, 163, 184, 0.2);
  font-size: 0.65rem;
  font-weight: 700;
}

.rc-steps li.is-active .rc-step-num {
  background: var(--vp-c-brand-1);
  color: #eff6ff;
}

.rc-caption {
  margin: 0;
  min-height: 44px;
  font-size: 0.85rem;
  line-height: 1.55;
  color: var(--vp-c-text-2);
}

.rc-controls {
  display: flex;
  gap: 8px;
}

.rc-control {
  padding: 7px 13px;
  border: 1px solid var(--vp-c-brand-1);
  border-radius: 8px;
  background: var(--vp-c-brand-1);
  color: #f8fafc;
  font-size: 0.78rem;
  font-weight: 600;
  cursor: pointer;
}

.rc-control--ghost {
  background: transparent;
  color: var(--vp-c-brand-1);
}

.rc-control:focus-visible,
.rc-steps button:focus-visible {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: 2px;
}

@media (max-width: 720px) {
  .rc-shell-body {
    grid-template-columns: 1fr;
  }
  .rc-rail {
    flex-direction: row;
    border-right: 0;
    border-bottom: 1px solid rgba(148, 163, 184, 0.14);
    padding: 10px;
  }
  .rc-app {
    left: 10px;
    right: 10px;
    top: 76px;
    bottom: 12px;
  }
  .rc-sim-footer {
    grid-template-columns: 1fr;
  }
  .rc-hint {
    display: none;
  }
}

/* Reduced motion: no cursor, no ripples, no sweeping shapes. */
@media (prefers-reduced-motion: reduce) {
  .rc-cursor,
  .rc-ripple {
    display: none;
  }
  .rc-shape--bar {
    animation: none;
  }
  .rc-app,
  .rc-row,
  .rc-run {
    transition: none;
  }
}
</style>
