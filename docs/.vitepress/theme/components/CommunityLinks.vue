<script setup lang="ts">
import { project } from '../../project'

const rows = [
  { label: 'Source repository', url: project.repoUrl, purpose: 'Browse the code and documentation sources.' },
  { label: 'Issue tracker', url: project.issuesUrl, purpose: 'Report bugs and request features.' },
  { label: 'Releases', url: project.releasesUrl, purpose: 'Official builds and release notes.' },
  { label: 'Security reports', url: project.securityUrl, purpose: 'Private channel for vulnerability reports.' },
  ...project.community.map((c) => ({ label: c.name, url: c.url, purpose: c.description }))
]
</script>

<template>
  <ul class="rc-link-list">
    <li v-for="row in rows" :key="row.label" class="rc-link-row">
      <div>
        <strong>{{ row.label }}</strong>
        <p>{{ row.purpose }}</p>
      </div>
      <a v-if="row.url" class="rc-link-go" :href="row.url" target="_blank" rel="noopener noreferrer">
        Open <span class="visually-hidden">{{ row.label }}</span>
      </a>
      <span v-else class="rc-unpublished-tag">not yet published</span>
    </li>
  </ul>
</template>
