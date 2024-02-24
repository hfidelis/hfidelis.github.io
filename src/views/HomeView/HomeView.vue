<script setup lang="ts">
import SvgIcon from '@jamescoyle/vue-icon'

import {
  mdiWrenchClock,
} from '@mdi/js'
</script>

<template>
  <main>
    <SvgIcon
      :path="mdiWrenchClock"
      type="mdi"
      size="70"
    />
    <h1>
      {{ $t('views.home.title') }}
    </h1>
    <p>
      {{ $t('views.home.subtitle') }}
    </p>
  </main>
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
    // background-image: linear-gradient(90deg,rgb(213, 174, 19),rgb(169, 116, 19));
    // background-clip: text;
    // -webkit-text-fill-color: transparent;
    // -webkit-background-clip: text;
  }

  > p {
    font-size: $text-md;
    font-weight: 500;
    text-wrap: pretty;
  }
}
</style>