<script setup lang="ts">
import { ref, watch } from 'vue'
import { useDark } from '@vueuse/core'
import { RouterLink } from 'vue-router'
import { mdiMenuOpen, mdiWindowClose } from '@mdi/js'

import isMobile from '@/helpers/isMobile'
import LocaleSelect from '@/components/locale-select/LocaleSelect.vue'
import ThemeToggle from '@/components/theme-toggle/ThemeToggle.vue'
import BlogButton from '@/components/blog-button/BlogButton.vue'

const isDark = useDark()
const isOpen = ref<boolean>(false)

const toggleOpen = (): void => {
  isOpen.value = !isOpen.value
}

watch(
  () => isMobile.value,
  (val: boolean): void => {
    if (val) {
      isOpen.value = false
    }
  }
)
</script>

<template>
  <header
    class="flex flex-row items-center justify-between w-full h-[10dvh] px-7 lg:px-[15dvw] xl:px-[25dvw]"
    :class="isDark ? 'border-b-2 border-secondary-dark shadow-md' : 'border-b-2 border-secondary-light shadow-md'"
  >
    <div
      class="flex flex-row items-center justify-center md:text-[1.75rem] text-2xl font-bold"
    >
      <span
        class="bg-gradient-to-r text-gradient"
        :class="isDark ? 'from-accent-light to-accent-dark' : 'from-accent-dark to-accent-dark'"
      >
        ~/
      </span>
      <RouterLink
        to="/"
        class="bg-gradient-to-r text-gradient"
        :class="isDark ? 'from-primary-light to-secondary-light' : 'from-primary-dark to-secondary-dark'"
      >
        hfidelis
      </RouterLink>
      <span
        :style="{ marginLeft: '0.4rem' }"
        class="relative w-[0.8rem] h-[1.5rem] md:h-[1.75rem]"
      >
        <span
          class="absolute h-full w-full animate-fade-in-out"
          :class="isDark ? 'bg-accent-dark' : 'bg-accent-light'"
        ></span>
      </span>
    </div>
    <section
      class="flex flex-row items-center justify-center"
    >
      <button
        v-if="isMobile"
        class="flex flex-row items-center justify-center cursor-pointer rounded-md p-2"
        :class="isDark ? 'text-white bg-primary-dark border border-secondary-dark shadow-md' : 'text-black bg-primary-light border border-secondary-light shadow-md'"
        :aria-label="
            isOpen ?
            $t('components.header.menuButton.actions.close') :
            $t('components.header.menuButton.actions.open')
        "
      >
        <SvgIcon
          :path="isOpen ? mdiWindowClose : mdiMenuOpen"
          type="mdi"
          size="26"
          @click="toggleOpen()"
        />
      </button>
      <div
        v-if="!isMobile"
        class='flex flex-row items-center justify-center gap-3'
      >
        <BlogButton />
        <LocaleSelect />
        <ThemeToggle />
      </div>
      <Transition
        enter-active-class="transition-transform duration-500 ease-in-out"
        enter-from-class="transform translate-x-full"
        enter-to-class="transform translate-x-0"
        leave-active-class="transition-transform duration-500 ease-in-out"
        leave-from-class="transform translate-x-0"
        leave-to-class="transform translate-x-full"
      >
        <div
          v-if="isMobile && isOpen"
          class='absolute top-[10dvh] left-0 z-50 flex flex-col items-end justify-start w-full min-h-screen gap-3 p-4 bg-gradient-to-br opacity-95'
          :class="isDark ? 'from-primary-dark to-primary-dark via-gray-900' : 'from-primary-light to-primary-light via-neutral-400'"
        >
          <BlogButton />
          <LocaleSelect />
          <ThemeToggle />
        </div>
      </Transition>
    </section>
  </header>
</template>
