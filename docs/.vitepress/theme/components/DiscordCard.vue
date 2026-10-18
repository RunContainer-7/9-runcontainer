<script setup lang="ts">
import { project } from '../../project'
</script>

<template>
  <a
    v-if="project.discordUrl"
    class="rc-discord-card"
    :href="project.discordUrl"
    target="_blank"
    rel="noopener noreferrer"
  >
    <span class="rc-discord-icon" aria-hidden="true">
      <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M20.3 4.4A19.8 19.8 0 0 0 15.4 3l-.2.4a18.3 18.3 0 0 0-6.4 0L8.6 3a19.7 19.7 0 0 0-4.9 1.5C.6 9.1-.3 13.6.2 18a19.9 19.9 0 0 0 6 3l1.3-2.1a12.8 12.8 0 0 1-2-1l.5-.4a14.2 14.2 0 0 0 12 0l.5.4a12.7 12.7 0 0 1-2 1L16.8 21a19.8 19.8 0 0 0 6-3c.5-5.1-.9-9.5-2.5-13.6zM8.5 15.4c-1.2 0-2.1-1.1-2.1-2.4s.9-2.4 2.1-2.4 2.2 1.1 2.1 2.4-.9 2.4-2.1 2.4zm7 0c-1.2 0-2.1-1.1-2.1-2.4s.9-2.4 2.1-2.4 2.2 1.1 2.1 2.4-.9 2.4-2.1 2.4z"/></svg>
    </span>
    <span class="rc-discord-text">
      <strong>RunContainer Discord</strong>
      <span>Ask questions, or talk through a bug or idea before you file it.</span>
    </span>
    <span class="rc-discord-go">Join the server →</span>
  </a>
</template>

<style scoped>
.rc-discord-card {
  display: flex;
  align-items: center;
  gap: 14px;
  margin: 1.25rem 0 1.5rem;
  padding: 16px 18px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  text-decoration: none;
  transition: border-color 0.2s ease, transform 0.2s ease;
}
.rc-discord-card:hover {
  border-color: color-mix(in srgb, var(--vp-c-brand-1) 50%, var(--vp-c-divider));
  transform: translateY(-1px);
}
.rc-discord-icon {
  flex: none;
  display: grid;
  place-items: center;
  width: 42px;
  height: 42px;
  border-radius: 10px;
  color: var(--vp-c-brand-1);
  background: color-mix(in srgb, var(--vp-c-brand-1) 12%, transparent);
}
.rc-discord-text {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
  flex: 1;
}
.rc-discord-text strong {
  font-size: 15px;
}
.rc-discord-text span {
  font-size: 13px;
  color: var(--vp-c-text-2);
}
.rc-discord-go {
  flex: none;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-brand-1);
  white-space: nowrap;
}
@media (max-width: 560px) {
  .rc-discord-card { flex-wrap: wrap; }
  .rc-discord-go { width: 100%; }
}
@media (prefers-reduced-motion: reduce) {
  .rc-discord-card { transition: none; }
  .rc-discord-card:hover { transform: none; }
}
</style>
