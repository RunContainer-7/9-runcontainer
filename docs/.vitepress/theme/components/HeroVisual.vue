<template>
  <figure class="rc-hero-visual" aria-label="Illustration: two applications, each running inside its own managed environment on one Windows PC">
    <div class="rc-host">
      <div class="rc-host-bar">
        <span class="rc-dot" /><span class="rc-dot" /><span class="rc-dot" />
        <span class="rc-host-title">Your PC</span>
      </div>

      <div class="rc-envs">
        <div class="rc-env">
          <div class="rc-env-head">
            <span>Environment · Everyday</span>
            <span class="rc-pill rc-pill--on"><i />Running</span>
          </div>
          <div class="rc-app">
            <div class="rc-app-bar" />
            <div class="rc-app-line" style="width: 72%" />
            <div class="rc-app-line" style="width: 54%" />
            <div class="rc-app-line" style="width: 63%" />
          </div>
        </div>

        <div class="rc-env rc-env--muted">
          <div class="rc-env-head">
            <span>Environment · Testing</span>
            <span class="rc-pill"><i />Stopped</span>
          </div>
          <div class="rc-app">
            <div class="rc-app-bar" />
            <div class="rc-app-line" style="width: 48%" />
            <div class="rc-app-line" style="width: 66%" />
          </div>
        </div>
      </div>

      <div class="rc-host-foot">Apps stay inside the environment you choose</div>
    </div>
  </figure>
</template>

<style scoped>
.rc-hero-visual {
  margin: 0;
  width: min(420px, 88vw);
}
.rc-host {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  border-radius: 14px;
  padding: 14px;
  box-shadow: 0 24px 60px -30px rgba(0, 0, 0, 0.55);
}
.rc-host-bar {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 2px 4px 12px;
}
.rc-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--vp-c-divider);
}
.rc-host-title {
  margin-left: 8px;
  font-size: 12px;
  color: var(--vp-c-text-2);
  font-family: var(--vp-font-family-mono);
}
.rc-envs {
  display: grid;
  gap: 12px;
}
.rc-env {
  border: 1.5px dashed color-mix(in srgb, var(--vp-c-brand-1) 55%, transparent);
  border-radius: 10px;
  padding: 10px;
  background: color-mix(in srgb, var(--vp-c-brand-1) 5%, transparent);
  animation: rc-rise 0.6s ease-out both;
}
.rc-env--muted {
  border-color: var(--vp-c-divider);
  background: transparent;
  animation-delay: 0.12s;
}
.rc-env-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  color: var(--vp-c-text-2);
  margin-bottom: 8px;
}
.rc-pill {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
  padding: 2px 8px;
  border-radius: 999px;
  border: 1px solid var(--vp-c-divider);
}
.rc-pill i {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--vp-c-text-3);
}
.rc-pill--on {
  color: var(--vp-c-brand-1);
  border-color: color-mix(in srgb, var(--vp-c-brand-1) 40%, transparent);
}
.rc-pill--on i {
  background: var(--vp-c-brand-1);
  animation: rc-pulse 2.4s ease-in-out infinite;
}
.rc-app {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 7px;
  padding: 0 0 8px;
  overflow: hidden;
}
.rc-app-bar {
  height: 14px;
  background: var(--vp-c-bg-alt);
  border-bottom: 1px solid var(--vp-c-divider);
  margin-bottom: 8px;
}
.rc-app-line {
  height: 6px;
  margin: 6px 10px 0;
  border-radius: 3px;
  background: var(--vp-c-default-soft);
}
.rc-host-foot {
  margin-top: 12px;
  text-align: center;
  font-size: 12px;
  color: var(--vp-c-text-3);
}
@keyframes rc-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.35; }
}
@keyframes rc-rise {
  from { opacity: 0; transform: translateY(6px); }
  to { opacity: 1; transform: none; }
}
@media (prefers-reduced-motion: reduce) {
  .rc-env, .rc-pill--on i { animation: none; }
}
</style>
