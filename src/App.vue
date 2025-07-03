<script lang="ts" setup>
import 'vfonts/Lato.css'
import { useDark } from '@vueuse/core'
import { RouterView } from 'vue-router'
import { NConfigProvider, darkTheme } from 'naive-ui'

import AppHeader from '@/components/header/AppHeader.vue'
import AppFooter from '@/components/footer/AppFooter.vue'

const isDark = useDark()
</script>

<template>
  <NConfigProvider
    preflight-style-disabled
    :theme="isDark ? darkTheme : undefined"
  >
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
  </NConfigProvider>
</template>