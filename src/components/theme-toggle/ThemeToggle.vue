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
    id="theme__toggle__btn"
    class="header__button"
    :class="[
      isDark ? 'dark' : 'light',
      isMobile ? 'header__mobile__item' : '',
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

<style lang="scss" scoped >
@import '@/styles/app.scss';

#theme__toggle__btn {
  &.dark {
    > svg {
      color: $primary-light;
    }
  }

  &.light{
    > svg {
      color: $primary-dark;
    }
  }
}
</style>