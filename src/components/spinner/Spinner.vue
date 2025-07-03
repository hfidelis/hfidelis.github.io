<script setup lang="ts">
import { useDark } from '@vueuse/core'

const isDark = useDark()
const circleCount = 3
</script>

<template>
  <div class="h-full flex items-center justify-center">
    <div class="flex items-center justify-center gap-[0.65rem]">
      <div
        v-for="index in circleCount"
        :key="index"
        class="spinner__circle w-4 h-4 rounded-full"
        :class="isDark ? 'bg-accent-light shadow-dark border border-secondary-dark' : 'bg-accent-dark shadow-light border border-secondary-light'"
      >
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.spinner__circle {
  animation: spinner 0.75s infinite ease-in-out;
}

@keyframes spinner {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.5);
  }
}
</style>