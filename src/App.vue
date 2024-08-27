<script lang="ts" setup>
import { RouterView } from 'vue-router'

import AppHeader from '@/components/header/AppHeader.vue'
import AppFooter from '@/components/footer/AppFooter.vue'
</script>

<template>  
  <AppHeader />
  <RouterView v-slot="{ Component, route }">
    <FadeTransition>
      <component
        :is="Component"
        :key="route.path"
      />
    </FadeTransition>
  </RouterView>
  <AppFooter />
</template>