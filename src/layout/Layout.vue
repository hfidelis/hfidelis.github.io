<script lang="ts" setup>
import Container from '@/layout/container/Container.vue'
</script>

<template>
  <main class="flex flex-col items-center justify-center w-[100dvw] min-h-[70dvh]">
    <Container>
      <slot />
    </Container>
  </main>
</template>