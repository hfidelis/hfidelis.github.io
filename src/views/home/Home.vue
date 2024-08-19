<script setup lang="ts">
import AuthorInfo from '@/components/author-info/AuthorInfo.vue'
import TechStack from '@/components/tech-stack/TechStack.vue'
</script>

<template>
  <Layout>
    <div class="home">
      <AuthorInfo />
      <TechStack />      
    </div>
  </Layout>
</template>

<style lang="scss" scoped>
@import '@/styles/app.scss';

.home {
  @include flex(column, center, center, 4rem);
}
</style>