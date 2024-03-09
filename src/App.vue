<script lang="ts" setup>
import { RouterView } from 'vue-router'
import HeaderComponent from './components/Header/HeaderComponent.vue'
</script>

<template>
  <div>
    <HeaderComponent />
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
