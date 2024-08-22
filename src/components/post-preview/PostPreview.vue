<script setup lang="ts">
import MarkdownIt from 'markdown-it'

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
  <div>
    <RouterLink
      :to="`/blog/post/${props.slug}`"
      class="post__title"
      :class="darkOrLightClass"
    >
      {{ props.slug }}
      <SvgIcon
        :path="mdiCursorDefaultClick"
        size="36"
        type="mdi"
      />
    </RouterLink>
    <section
      class="post__preview__wrapper"
      :class="darkOrLightClass"
    >
      <div
        class="post__preview__blur"
        :class="darkOrLightClass"
      ></div>
      <div
        v-html="md.render(props.post[props.locale])"
        class="post__content__preview"
        :class="darkOrLightClass"
      ></div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
@import '@/styles/app.scss';

.post__title {
  display: flex !important;
  align-items: center !important;
  gap: 0.8rem;
  font-size: $text-lg;  
  font-weight: 600;
  text-decoration: none;
  margin-bottom: 1rem;
  display: block;
  width: fit-content;

  &.dark {
    color: $primary-light;
  }

  &.light {
    color: $primary-dark;
  }
}

.post__preview__wrapper {
  @include flex(column, center, center);
  height: 7rem;
  max-width: 100%;
  position: relative;
  overflow: hidden;  
  border-radius: $radius-md;
  animation: bright 3.5s infinite linear;

  &.dark {
    border: 0.2rem solid $light-border;
    box-shadow: $dark-mode-shadow;
  }

  &.light {
    border: 0.2rem solid $dark-border;
    box-shadow: $light-mode-shadow;
  }

  .post__preview__blur {
    position: absolute;
    bottom: -1rem;

    width: 120%;
    height: 65%;

    filter: blur(1rem);
    z-index: 1;

    &.dark {
      background: black;
    }

    &.light {
      background: #CCCCCC;
    }
  }

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
        rgba(255,255,255, 0) 20%,
        rgba(255,255,255, .65),
        rgba(255,255,255, 0) 80%);

      animation: shine 3.5s infinite linear;
      z-index: 1;
    }

    &.light {
      background: #C9D6FF;  /* fallback for old browsers */
      background: -webkit-linear-gradient(to right, #E2E2E2, #C9D6FF);  /* Chrome 10-25, Safari 5.1-6 */
      background: linear-gradient(to right, #E2E2E2, #C9D6FF); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    }

    &.dark {
      background: #232526;  /* fallback for old browsers */
      background: -webkit-linear-gradient(to right, #414345, #232526);  /* Chrome 10-25, Safari 5.1-6 */
      background: linear-gradient(to right, #414345, #232526); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
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