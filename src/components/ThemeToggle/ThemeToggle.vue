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
    <Transition name="toggle__transition">
      <template
        v-if="isDark"
      >
        <SvgIcon
          :aria-hidden="true"
          :path="mdiWeatherSunny"
          type="mdi"
          size="30"
        />
      </template>
      <template
        v-else
      >
        <SvgIcon
          :aria-hidden="true"
          :path="mdiWeatherNight"
          type="mdi"
          size="30"
        />
      </template>
    </Transition>
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

  > span {
    font-size: $text-sm;
    font-weight: 600;
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

.toggle__transition-enter-active {
  transition: all 0.5s ease-out;
}

.toggle__transition-enter-from,
.toggle__transition-leave-to {
  transform: translateX(1.2rem);
  opacity: 0;
}
</style>