<script setup lang="ts">
import AuthorInfo from '@/components/author-info/AuthorInfo.vue'
import TechTags from '@/components/tech-tags/TechTags.vue'

import { NDivider } from 'naive-ui';
</script>

<template>
  <Layout>
    <div class="flex flex-col items-center justify-center">
      <AuthorInfo />
      <NDivider />
      <TechTags />
    </div>
  </Layout>
</template>