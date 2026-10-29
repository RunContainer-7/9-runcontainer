<script setup lang="ts">
import { project } from '../../project'

// The official walkthrough: linked as well as embedded, so it still works when
// the embed is blocked by a browser extension or privacy setting.
const videoId = 'mgVoS6I98Gs'
const watchUrl = `https://m.youtube.com/watch?v=${videoId}`

withDefaults(defineProps<{ eyebrow?: string; heading?: string; compact?: boolean }>(), {
  eyebrow: 'Watch first',
  heading: 'See RunContainer in action',
  compact: false,
})
</script>

<template>
  <section class="rc-video" :class="{ 'rc-video--compact': compact }" aria-labelledby="rc-video-heading">
    <div class="rc-video-copy">
      <p class="rc-eyebrow">{{ eyebrow }}</p>
      <h2 id="rc-video-heading">{{ heading }}</h2>
      <template v-if="!compact">
        <p>
          New to RunContainer? The official video walks through the interface, installing an
          application, the per-app profiles and the containment backends — in a few minutes.
        </p>
        <p>
          To support the project, subscribe to the
          <a :href="project.youtubeUrl" target="_blank" rel="noreferrer">RunContainer YouTube channel</a>
          and join the <a :href="project.discordUrl" target="_blank" rel="noreferrer">Discord server</a>.
          Subscribing costs nothing and is the easiest way to help; the Discord is where questions,
          bug reports and compatibility notes get answered.
        </p>
      </template>
      <div class="rc-actions">
        <a class="rc-btn" :href="watchUrl" target="_blank" rel="noreferrer">Watch on YouTube</a>
        <a class="rc-btn rc-btn--ghost" :href="project.youtubeUrl" target="_blank" rel="noreferrer">Subscribe</a>
        <a class="rc-btn rc-btn--ghost" :href="project.discordUrl" target="_blank" rel="noreferrer">Join the Discord</a>
      </div>
    </div>
    <div class="rc-video-media">
      <div class="rc-video-frame">
        <iframe
          :src="`https://www.youtube-nocookie.com/embed/${videoId}`"
          title="RunContainer video guide"
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen
        />
      </div>
      <p class="rc-video-note">
        This video was recorded during early development, so some of the interface and
        features shown may be out of date.
      </p>
    </div>
  </section>
</template>

<style scoped>
.rc-video {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1.15fr);
  gap: 28px;
  align-items: center;
  margin: 32px 0;
  padding: 24px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 14px;
  background: var(--vp-c-bg-soft);
}

.rc-video--compact {
  margin: 20px 0;
  padding: 18px;
}

.rc-video-media {
  min-width: 0;
}

.rc-video-note {
  margin: 8px 0 0;
  font-size: 0.8rem;
  line-height: 1.5;
  color: var(--vp-c-text-3);
}

.rc-video-frame {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  border-radius: 10px;
  overflow: hidden;
  background: #020617;
}

.rc-video-frame iframe {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  border: 0;
}

.rc-video h2 {
  margin: 4px 0 12px;
  font-size: 1.35rem;
  line-height: 1.3;
}

.rc-video-copy p {
  margin: 0 0 12px;
  color: var(--vp-c-text-2);
  line-height: 1.6;
}

@media (max-width: 820px) {
  .rc-video {
    grid-template-columns: 1fr;
  }
}
</style>
