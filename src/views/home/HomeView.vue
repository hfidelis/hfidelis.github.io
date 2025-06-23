<script setup lang="ts">
import AuthorInfo from '@/components/author-info/AuthorInfo.vue'
import TechStack from '@/components/tech-stack/TechStack.vue'
</script>

<template>
  <Layout>
    <div class="flex flex-col items-center justify-center gap-[4rem]">
      <AuthorInfo />
      <TechStack />
    </div>
  </Layout>
</template>