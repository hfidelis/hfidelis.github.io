<script setup lang="ts">
import { useDark } from '@vueuse/core'

const isDark = useDark()
const circleCount = 3
</script>

<template>
  <div class="spinner">
    <div class="spinner__container">
      <div
        v-for="index in circleCount"
        :key="index"
        class="spinner__circle"
        :class="isDark ? 'dark__spinner' : 'light__spinner'"
      >
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/styles/app.scss';

.spinner {  
  @include flex(row, center, center);
  height: 100%;
}

.spinner__container {
  @include flex(row, center, center, 0.65rem);  
}

.spinner__circle {
  width: 1rem;
  height: 1rem;
  margin: 0 0.25rem;
  border-radius: 50%;  
  animation: spinner 0.75s infinite ease-in-out;
}

.dark__spinner {
  border: $dark-border;
  background-color: $cyan;
  box-shadow: $dark-mode-shadow;
}

.light__spinner {
  border: $light-border;
  background-color: $dark-cyan;
  box-shadow: $light-mode-shadow;
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