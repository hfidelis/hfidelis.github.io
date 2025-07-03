<script setup lang="ts">
import MarkdownIt from 'markdown-it'
import isMobile from '@/helpers/isMobile'

import { computed } from 'vue'
import { useDark } from '@vueuse/core'

import { mdiCursorDefaultClick } from '@mdi/js'

interface PostPreview {
  slug: string
  locale: string
  post: {
    [key: string]: string
  }
}

const props = defineProps<PostPreview>()

const md = new MarkdownIt()
const isDark = useDark()

const darkOrLightClass = computed(() => isDark.value ? 'dark' : 'light')
</script>

<template>
  <div class="duration-300 ease-in-out transition-all hover:scale-[1.02]">
    <RouterLink
      :to="`/blog/${props.slug}`"
      class="no-underline max-w-full w-fit post__preview"
      :class="isDark ? 'text-primary-light' : 'text-primary-dark'"
    >
      <div class="flex items-center gap-[0.6rem] font-bold mb-4 w-fit text-lg md:text-xl">
        <span>
          {{ props.slug }}
        </span>
        <SvgIcon
          :path="mdiCursorDefaultClick"
          :size="isMobile ? '22' : '28'"
          type="mdi"
        />
      </div>
      <section
        class="flex flex-col items-center justify-center h-28 max-w-full relative overflow-hidden rounded-[0.4rem] post__preview__wrapper shadow-light"
        :class="isDark ? 'border-2 border-secondary-dark' : 'border-2 border-secondary-light'"
      >
        <div
          class="absolute bottom-[-1rem] w-[120%] h-[65%] blur-[16px] z-[1]"
          :class="isDark ? 'bg-black' : 'bg-neutral-200'"
        ></div>
        <div
          v-html="md.render(props.post[props.locale])"
          class="post__content__preview"
          :class="darkOrLightClass"
        ></div>
      </section>
    </RouterLink>
  </div>
</template>

<style lang="scss" scoped>
.post__preview__wrapper {
  animation: bright 3.5s infinite linear;

  .post__content__preview {
    max-width: 100%;
    max-height: 100%;

    position: relative;
    padding: 0.8rem;
    overflow: hidden;

    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: -100%;

      width: 100%;
      height: 100%;

      background-image: linear-gradient(
        120deg,
        rgba(255, 0, 0, 0) 20%,
        rgba(255,255,255, .65),
        rgba(255,255,255, 0) 80%);

      animation: shine 3.5s infinite linear;
      z-index: 1;
    }

    &.light {
      background: #C9D6FF;
      background: -webkit-linear-gradient(to right, #E2E2E2, #C9D6FF);
      background: linear-gradient(to right, #E2E2E2, #C9D6FF);
    }

    &.dark {
      background: #232526;
      background: -webkit-linear-gradient(to right, #414345, #232526);
      background: linear-gradient(to right, #414345, #232526);
    }
  }
}


@keyframes shine {
    0% {
      left: -100%;
    }
    20% {
      left: 100%;
    }
    100% {
      left: 100%;
    }
}

@keyframes bright {
  0% {
    filter: brightness(1);
  }
  50% {
    filter: brightness(1.2);
  }
  100% {
    filter: brightness(1);
  }
}
</style>