<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import Breadcrumbs from './components/Breadcrumbs.vue'
import HeroVisual from './components/HeroVisual.vue'

const { Layout } = DefaultTheme
</script>

<template>
  <Layout>
    <template #home-hero-image>
      <HeroVisual />
    </template>
    <template #doc-before>
      <Breadcrumbs />
    </template>
  </Layout>
</template>
