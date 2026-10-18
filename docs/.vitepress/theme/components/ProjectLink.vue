<script setup lang="ts">
import { computed } from 'vue'
import { project } from '../../project'

type Key = 'repoUrl' | 'issuesUrl' | 'releasesUrl' | 'securityUrl'

const props = defineProps<{ to: Key; label: string }>()
const url = computed(() => project[props.to])
</script>

<template>
  <a v-if="url" :href="url" target="_blank" rel="noopener noreferrer">{{ label }}</a>
  <span v-else class="rc-unpublished" :title="`${label}: not yet published`">
    {{ label }} <span class="rc-unpublished-tag">not yet published</span>
  </span>
</template>
