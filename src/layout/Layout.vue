<script lang="ts" setup>
import Container from '@/layout/container/Container.vue'
</script>

<template>
  <main class="layout__container">
    <Container>
      <slot />
    </Container>
  </main>
</template>