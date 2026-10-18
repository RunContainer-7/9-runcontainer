<script setup lang="ts">
import { project } from '../../project'
</script>

<template>
  <section class="rc-panel rc-support-panel">
    <h3>Get help on Discord</h3>
    <p>
      The RunContainer Discord server is the place to ask questions, get help from the community,
      and talk through a bug or feature idea before you file it. Check the
      <a href="/troubleshooting/">Troubleshooting</a> pages first, and remove personal
      information from anything you share.
      Formal bug reports and feature requests go on the
      <a href="https://github.com/RunContainer-7/runcontainer/issues" target="_blank" rel="noopener noreferrer">issue tracker</a>.
    </p>
    <p>
      <a
        v-if="project.discordUrl"
        class="rc-btn"
        :href="project.discordUrl"
        target="_blank"
        rel="noopener noreferrer"
      >Join the Discord server</a>
      <span v-else class="rc-unpublished-tag">Discord link not yet published</span>
    </p>
  </section>
</template>
