<script setup lang="ts">
const steps = [
  {
    title: 'Create an environment',
    text: 'Set up a managed space for an application or a group of related applications.'
  },
  {
    title: 'Install the application',
    text: 'Run the application’s installer inside that environment instead of directly on your PC.'
  },
  {
    title: 'Run it from RunContainer',
    text: 'Launch and stop the application from RunContainer, which keeps track of where it belongs.'
  },
  {
    title: 'Keep or clean up',
    text: 'Keep the environment for everyday use, or reset or remove it when you no longer need it.'
  }
]
</script>

<template>
  <ol class="rc-steps" aria-label="RunContainer workflow">
    <li v-for="(step, i) in steps" :key="step.title" class="rc-step">
      <span class="rc-step-num" aria-hidden="true">{{ String(i + 1).padStart(2, '0') }}</span>
      <h3>{{ step.title }}</h3>
      <p>{{ step.text }}</p>
    </li>
  </ol>
</template>

<style scoped>
.rc-steps {
  list-style: none;
  padding: 0;
  margin: 1.5rem 0 0;
  display: grid;
  gap: 12px;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  counter-reset: none;
}
.rc-step {
  position: relative;
  margin: 0;
  padding: 20px 18px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
  transition: border-color 0.2s ease, transform 0.2s ease;
}
.rc-step:hover {
  border-color: color-mix(in srgb, var(--vp-c-brand-1) 50%, var(--vp-c-divider));
  transform: translateY(-2px);
}
.rc-step:not(:last-child)::after {
  content: '';
  position: absolute;
  top: 34px;
  right: -12px;
  width: 12px;
  height: 1px;
  background: var(--vp-c-divider);
}
.rc-step-num {
  font-family: var(--vp-font-family-mono);
  font-size: 12px;
  color: var(--vp-c-brand-1);
  letter-spacing: 0.05em;
}
.rc-step h3 {
  margin: 10px 0 6px !important;
  padding: 0 !important;
  border: 0 !important;
  font-size: 16px !important;
  line-height: 1.35 !important;
}
.rc-step p {
  margin: 0 !important;
  font-size: 14px;
  line-height: 1.6;
  color: var(--vp-c-text-2);
}
@media (max-width: 960px) {
  .rc-steps { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .rc-step::after { display: none; }
}
@media (max-width: 560px) {
  .rc-steps { grid-template-columns: 1fr; }
}
@media (prefers-reduced-motion: reduce) {
  .rc-step { transition: none; }
  .rc-step:hover { transform: none; }
}
</style>
