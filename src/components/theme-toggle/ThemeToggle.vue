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
    class="group flex items-center justify-center gap-[0.6rem] h-[2.75rem] border-[0.15rem] rounded-md py-[0.2rem] px-[0.6rem] cursor-pointer overflow-hidden transition-all hover:scale-105 font-bold"
    :class="[
      isDark ? 'border-secondary-dark hover:shadow-dark text-primary-light' : 'border-secondary-light hover:shadow-light text-primary-dark',
      isMobile ? 'w-[8.3rem]' : null,
      (isMobile && isDark) ? 'bg-primary-dark' : null,
      (isMobile && !isDark) ? 'bg-primary-light' : null,
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
      class="transition-all group-hover:rotate-12"
    />
  </button>
</template>