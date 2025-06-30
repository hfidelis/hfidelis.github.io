<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'

import isMobile from '@/helpers/isMobile'

import {
  mdiWeatherSunny,
  mdiWeatherNight,
} from '@mdi/js'

const isDark = useDark({
  selector: "body",
  attribute: "theme",
  valueDark: "dark-mode",
  valueLight: "light-mode",
})

const toggleDark = useToggle(isDark)
</script>

<template>
  <button
    :key="isDark ? 'dark' : 'light'"
    class="h-[2.75rem] border-[0.15rem] rounded-md py-[0.2rem] px-[0.6rem] cursor-pointer overflow-hidden transition-all hover:scale-105"
    :class="[
      isMobile ? 'w-[8.3rem]' : '',
      isDark ? 'border-secondary-dark hover:shadow-dark' : 'border-secondary-light hover:shadow-light ',
    ]"
    :aria-label="$t('components.themeToggle.ariaLabel')"
    @click="toggleDark()"
  >
    <span
      v-if="isMobile"
    >
      {{ $t('components.themeToggle.label') }}
    </span>
    <SvgIcon
      :path="isDark ? mdiWeatherSunny : mdiWeatherNight"
      type="mdi"
      size="30"
    />
  </button>
</template>