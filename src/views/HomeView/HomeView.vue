<script setup lang="ts">
import AuthorInfo from '@/components/AuthorInfo/AuthorInfo.vue'
import TechStack from '@/components/TechStack/TechStack.vue'
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