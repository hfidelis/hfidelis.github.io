<script lang="ts" setup>
import { useDark } from '@vueuse/core'
import Container from '@/layout/container/Container.vue'

const isDark = useDark()
</script>

<template>
  <main
    class="flex flex-col items-center justify-center w-[100dvw] max-h-[70dvh] scroll-auto overflow-y-auto"
    :class="isDark ? 'dark-scrollbar' : 'light-scrollbar'"
  >
    <Container>
      <slot />
    </Container>
  </main>
</template>