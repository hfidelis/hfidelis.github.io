<script lang="ts" setup>
import { RouterView } from 'vue-router'
import AppHeader from '@/components/Header/AppHeader.vue'
import AppFooter from '@/components/Footer/AppFooter.vue'
</script>

<template>
  <div>
    <AppHeader />
    <RouterView
      v-slot="{
        Component,
        route
      }"
    >
      <Transition
        name="fade"
        mode="out-in"
      >
        <component
          :is="Component"
          :key="route.path"
        />
      </Transition>
    </RouterView>
    <AppFooter />
  </div>
</template>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.45s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>