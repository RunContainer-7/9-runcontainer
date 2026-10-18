<script setup lang="ts">
import { project } from '../../project'

defineProps<{ limit?: number }>()
const releases = project.releases
</script>

<template>
  <div class="rc-releases">
    <template v-if="releases.length">
      <article v-for="r in releases.slice(0, limit ?? releases.length)" :key="r.version" class="rc-release">
        <header>
          <h3>{{ r.version }}</h3>
          <span class="rc-badge" :class="`rc-badge--${r.channel}`">{{ r.channel }}</span>
          <time :datetime="r.date">{{ r.date }}</time>
        </header>
        <ul>
          <li v-for="note in r.notes" :key="note">{{ note }}</li>
        </ul>
        <a :href="r.url" target="_blank" rel="noopener noreferrer">Release details</a>
      </article>
    </template>
    <div v-else class="rc-empty">
      <span class="rc-badge rc-badge--none">No releases yet</span>
      <p>
        Public release notes are not yet available. RunContainer has not published an official
        release; this page will list release highlights once one is made.
      </p>
    </div>
  </div>
</template>
