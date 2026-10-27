<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { project } from '../../project'

/**
 * Live star and fork counts for the source repository.
 *
 * They are read in the visitor's own browser from the public GitHub API, so the
 * site needs no server and holds no token. Two limits are handled here rather
 * than hidden:
 *
 * - the public API allows 60 unauthenticated requests an hour per address, so a
 *   shared office address can be refused. The last good answer is kept per
 *   browser for a short while and reused, which keeps ordinary reading well
 *   inside that limit.
 * - no answer is not the same as zero. A real count of zero is shown as 0,
 *   while having never read a count renders nothing, so no figure can appear
 *   that was never actually read.
 */
const CACHE_KEY = 'rc-repo-stats'
const CACHE_MS = 10 * 60 * 1000

interface RepoStats {
  stars: number
  forks: number
  at: number
}

const stats = ref<RepoStats | null>(null)

function readCache(): RepoStats | null {
  try {
    const raw = window.localStorage.getItem(CACHE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as Partial<RepoStats>
    if (typeof parsed?.stars !== 'number' || typeof parsed?.forks !== 'number') return null
    return { stars: parsed.stars, forks: parsed.forks, at: Number(parsed.at) || 0 }
  } catch {
    return null
  }
}

function writeCache(next: RepoStats) {
  try {
    window.localStorage.setItem(CACHE_KEY, JSON.stringify(next))
  } catch {
    // Storage can be unavailable, in private browsing or when it is blocked.
    // Reusing the count next visit matters less than the page working.
  }
}

/**
 * Built from the one repository URL this site publishes, so a repository that
 * moves cannot leave a second, stale destination behind.
 */
function apiUrl(): string {
  const prefix = 'https://github.com/'
  if (!project.repoUrl.startsWith(prefix)) return ''
  let rest = project.repoUrl.slice(prefix.length).split('?')[0].split('#')[0]
  while (rest.endsWith('/')) rest = rest.slice(0, -1)
  const segments = rest.split('/')
  if (segments.length !== 2 || !segments[0] || !segments[1]) return ''
  return `https://api.github.com/repos/${segments[0]}/${segments[1]}`
}

onMounted(async () => {
  const cached = readCache()
  if (cached) stats.value = cached

  const url = apiUrl()
  if (!url) return
  // Inside the cache window the stored answer stands and no request is made.
  if (cached && Date.now() - cached.at < CACHE_MS) return

  try {
    const response = await fetch(url, { headers: { Accept: 'application/vnd.github+json' } })
    if (!response.ok) return
    const data = await response.json()
    const next: RepoStats = {
      stars: Number(data?.stargazers_count) || 0,
      forks: Number(data?.forks_count) || 0,
      at: Date.now()
    }
    stats.value = next
    writeCache(next)
  } catch {
    // Offline, blocked or rate-limited: whatever was cached stays on screen.
  }
})
</script>

<template>
  <a v-if="stats" class="rc-repo-stats" :href="project.repoUrl" rel="noopener noreferrer">
    <span class="rc-repo-stats__item">
      <strong>{{ stats.stars }}</strong> {{ stats.stars === 1 ? 'star' : 'stars' }}
    </span>
    <span class="rc-repo-stats__sep" aria-hidden="true">·</span>
    <span class="rc-repo-stats__item">
      <strong>{{ stats.forks }}</strong> {{ stats.forks === 1 ? 'fork' : 'forks' }}
    </span>
    <span class="rc-repo-stats__note">on GitHub</span>
  </a>
</template>
