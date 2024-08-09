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
    :aria-label="$t('components.themeToggle.ariaLabel')"
    class="theme__toggle__btn"
    :class="[
      isDark ? 'dark__toggle' : 'light__toggle',
      isMobile ? 'header__mobile__item' : '',
    ]"
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

.theme__toggle__btn {
  @include flex(row, center, center, 0.6rem);
  border: none;
  border-radius: $radius-md;
  padding: 0.2rem 0.6rem;
  cursor: pointer;
  overflow: hidden;
  height: $header-item-height;
  transition: all 0.45s ease;

  > span {
    font-size: $text-sm;
    font-weight: 600;
  }

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 0 0.35rem $darker-cyan,
                0 0 0.6rem $cyan;
  }
}

.dark__toggle {
  background-color: $primary-dark;
  border: $border-sm solid $dark-border;
  box-shadow: $dark-mode-shadow;

  > svg, span {
    color: $primary-light;
  }
}

.light__toggle {
  background-color: $primary-light;
  border: $border-sm solid $light-border;
  box-shadow: $light-mode-shadow;

  > svg, span {
    color: $primary-dark;
  }
}
</style>