<script setup lang="ts">
import AuthorInfo from '@/components/author-info/AuthorInfo.vue'
import TechTags from '@/components/tech-tags/TechTags.vue'
</script>

<template>
  <Layout>
    <div class="flex flex-col items-center justify-center gap-[4rem]">
      <AuthorInfo />
      <TechTags />
    </div>
  </Layout>
</template>