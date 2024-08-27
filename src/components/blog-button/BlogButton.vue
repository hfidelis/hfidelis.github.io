<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useDark } from '@vueuse/core'

import isMobile from '@/helpers/isMobile'

import {
  mdiCreation,  
} from '@mdi/js'

const isDark = useDark()
const router = useRouter()

const redirectToBlog = () => {
  router.push({ name: 'blog' })
}
</script>

<template>
  <button    
    id="blog__button"
    class="header__button"
    :class="[
      isDark ? 'dark' : 'light',
      isMobile ? 'header__mobile__item' : '',
    ]"
    :aria-label="$t('components.blogButton.ariaLabel')"
    @click="redirectToBlog"
  >
    <span>
      {{ $t('components.blogButton.label') }}
    </span>
    <SvgIcon
      :path="mdiCreation"
      type="mdi"
      size="30"
    />
  </button>
</template>

<style lang="scss" scoped >
@import '@/styles/app.scss';

#blog__button {
  &.dark {
    > svg {
      color: #f5b11d;
      filter: drop-shadow(0 0 0.75rem #f5b11d);
      animation: dark-star-pulse 2s infinite, scale 1.5s infinite;
    }
  }

  &.light{
    > svg {
      color: #c2880c;
      filter: drop-shadow(0 0 0.75rem #c2880c);
      animation: light-star-pulse 2s infinite, scale 1.5s infinite;
    }
  }
}

@keyframes scale {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.15);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes light-star-pulse {
  0% {
    filter: drop-shadow(0 0 0.75rem $star-dark);
  }
  50% {
    filter: drop-shadow(0 0 0.75rem $star-light);
  }
  100% {
    filter: drop-shadow(0 0 0.75rem $star-dark);
  }
}

@keyframes dark-star-pulse {
  0% {
    filter: drop-shadow(0 0 0.75rem $star-light);
  }
  50% {
    filter: drop-shadow(0 0 0.75rem $star-dark);
  }
  100% {
    filter: drop-shadow(0 0 0.75rem $star-light);
  }
}
</style>