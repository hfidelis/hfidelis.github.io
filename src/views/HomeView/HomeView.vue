<script setup lang="ts">
import Layout from '@/layout/Layout.vue';
import AvatarBox from '@/components/AvatarBox/AvatarBox.vue';
</script>

<template>
  <Layout>
    <AvatarBox />
    <h1>
      {{ $t('views.home.title') }}
    </h1>
    <p>
      {{ $t('views.home.subtitle') }}
    </p>
  </Layout>
</template>

<style lang="scss" scoped>
@import '@/styles/app.scss';

main {
  @include flex(column, center, center, 0.8rem);
  min-height: 40dvh;
  padding: 5rem 2rem;
  text-align: center;
  
  > h1 {
    font-size: $text-xxl;
    font-weight: 700;
  }

  > p {
    font-size: $text-md;
    font-weight: 500;
    text-wrap: pretty;
    max-width: 30rem;
  }
}
</style>