<script setup lang="ts">
import {
  ref,
  watch,
  computed,
  onMounted,
  onBeforeUnmount,
} from 'vue'

import {
  mdiMenuOpen,
  mdiWindowClose,
} from '@mdi/js'

import { useDark } from '@vueuse/core'

import SvgIcon from '@jamescoyle/vue-icon'
import LocaleSelect from '@/components/LocaleSelect/LocaleSelect.vue'
import ThemeToggle from '@/components/ThemeToggle/ThemeToggle.vue'

const isDark = useDark()
const isOpen = ref(false)

const toggleOpen = () => {
  isOpen.value = !isOpen.value
}

const windowWidth = ref(window.innerWidth)

watch(
  () => windowWidth.value,
  () => {
    if (isMobile.value) {
      isOpen.value = false
    }
  }
)

const isMobile = computed(() => {
  return windowWidth.value <= 1024
})

const updateWindowWidth = () => {
  windowWidth.value = window.innerWidth
}

onMounted(() => {
  window.addEventListener('resize', updateWindowWidth)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateWindowWidth)
})
</script>

<template>
  <header
    class="app__header"
    :class="isDark ? 'dark__header' : 'light__header'"
  >
    <div
      class="app__header__logo"
    >
      <span
        class="logo__prefix"
      >
        ~/
      </span>
      <a
        href="https://github.com/hfidelis"
        target="_blank"
      >
        hfidelis
      </a>
      <span
        class="logo__sufix"
      >
        $
      </span>
      <span
        class="logo__thick"
      >
        <span
          class="logo__thick__inner"
        ></span>
      </span>
    </div>
    <section
      class="app__header__actions"
    >
      <button
        class="menu__button"
        v-if="isMobile"
        :style="{ 'opacity': isOpen ? 0 : 1 }"
      >
        <SvgIcon
          :path="mdiMenuOpen"
          type="mdi"
          size="26"
          @click="toggleOpen()"
        />
      </button>
      <div
        :class="isMobile ? 'actions__mobile' : 'actions__default'"
        :style="{ 
          'display': isOpen ? 'flex' :
                     isMobile ? 'none' : 'flex'
        }"
      >
        <button
          class="menu__button"
          v-show="isOpen && isMobile"
        >
          <SvgIcon
            :path="mdiWindowClose"
            type="mdi"
            size="26"
            @click="toggleOpen()"
          />
        </button>
        <LocaleSelect />
        <ThemeToggle />
      </div>
    </section>
  </header>
</template>

<style scoped lang="scss">
@import '@/styles/app.scss';

.app__header {
  @include flex(row, center, space-between);
  width: 100dvw;
  padding: 1.2rem 25dvw;

  @media screen {
    @media (max-width: 1400px) {
      padding: 1.2rem 15dvw;
    }

    @media (max-width: 1024px) {
      padding: 1.2rem 10dvw;
    }

    @media (max-width: 768px) {
      padding: 1.2rem 1.8rem;
    }
  }
}

.dark__header {
  border-bottom: 1px solid $dark-border;
  box-shadow: $dark-mode-shadow;

  .app__header__logo > a {
    background-image: linear-gradient(90deg,#fcfcfc, #5a5858);
    background-clip: text;
    -webkit-text-fill-color: transparent;
    -webkit-background-clip: text;    
  }

  .menu__button {
    color: $white;
    background-color: $primary-dark;
    border: $border-sm solid $dark-border;
    box-shadow: $dark-mode-shadow;
  }
}

.light__header {
  border-bottom: 1px solid $light-border;
  box-shadow: $light-mode-shadow;

  .app__header__logo > a {
    background-image: linear-gradient(90deg,#2f2f2f,#787979);
    background-clip: text;
    -webkit-text-fill-color: transparent;
    -webkit-background-clip: text;
  }

  .menu__button {
    color: $black;
    background-color: $primary-light;
    border: $border-sm solid $light-border;
    box-shadow: $light-mode-shadow;
  }
}

.logo__prefix,
.logo__sufix {
  background-image: linear-gradient(90deg,$green,$dark-green);
  background-clip: text;
  -webkit-text-fill-color: transparent;
  -webkit-background-clip: text;
}

.app__header__logo {
  @include flex(row, center, center);
  font-size: $text-xl;
  font-weight: 700;

  > a {
    color: $white;
    text-decoration: none;
  }

  @media screen {
    @media (max-width: 768px) {
      font-size: $text-lg;
    }
  }
}

.logo__thick {
  position: relative;
  width: 0.8rem;
  height: $text-xl;
  margin-left: 0.4rem;

  @media screen {
    @media (max-width: 768px) {
      height: $text-lg;
    }
  }

  > .logo__thick__inner {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: $dark-green;
    animation: fadeInOut 1.2s infinite ease;
  }
}

.app__header__actions, .actions__default {
  @include flex(row, center, center, 0.8rem);
}

.menu__button {
  @include flex(row, center, center);
  cursor: pointer;
  border-radius: $radius-md;
  padding: 0.4rem 0.6rem;
}

.actions__mobile {
  display: none;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-end;
  gap: 0.8rem;
  padding: 1.2rem 2rem;

  min-height: 100dvh;
  width: 100dvw;

  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;

  background-color: rgb(0 0 0 / 85%);
  animation: enter 0.5s ease;
}

@keyframes fadeInOut {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes enter {
  0% {
    opacity: 0;
    transform: translateX(100%);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>