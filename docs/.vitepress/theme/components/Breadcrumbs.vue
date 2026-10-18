<script setup lang="ts">
import { computed } from 'vue'
import { useData, withBase } from 'vitepress'
import type { DefaultTheme } from 'vitepress'

const { page, theme } = useData()

function normalise(link: string) {
  return link.replace(/(index)?(\.html|\.md)?$/, '').replace(/\/$/, '') || '/'
}

const trail = computed(() => {
  const current = normalise('/' + page.value.relativePath)
  const sidebar = theme.value.sidebar as Record<string, DefaultTheme.SidebarItem[]> | undefined
  if (!sidebar) return []
  const groups = Object.values(sidebar)[0] ?? []
  for (const group of groups) {
    const match = group.items?.find((item) => item.link && normalise(item.link) === current)
    if (match) {
      const first = group.items?.[0]
      return [
        { text: 'Docs', link: '/guide/introduction' },
        { text: group.text ?? '', link: first?.link },
        { text: match.text ?? '', link: undefined }
      ]
    }
  }
  return []
})
</script>

<template>
  <nav v-if="trail.length" class="rc-breadcrumbs" aria-label="Breadcrumb">
    <ol>
      <li v-for="(crumb, i) in trail" :key="i">
        <a v-if="crumb.link && i < trail.length - 1" :href="withBase(crumb.link)">{{ crumb.text }}</a>
        <span v-else aria-current="page">{{ crumb.text }}</span>
      </li>
    </ol>
  </nav>
</template>

<style scoped>
.rc-breadcrumbs ol {
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
  list-style: none;
  margin: 0 0 1.25rem;
  padding: 0;
  font-size: 0.8125rem;
  color: var(--vp-c-text-2);
}
.rc-breadcrumbs li {
  margin: 0;
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
}
.rc-breadcrumbs li + li::before {
  content: '/';
  color: var(--vp-c-text-3);
  padding-right: 0.25rem;
}
.rc-breadcrumbs a {
  color: var(--vp-c-text-2);
  text-decoration: none;
  border-radius: 4px;
}
.rc-breadcrumbs a:hover {
  color: var(--vp-c-brand-1);
}
.rc-breadcrumbs [aria-current] {
  color: var(--vp-c-text-1);
  font-weight: 500;
}
</style>
