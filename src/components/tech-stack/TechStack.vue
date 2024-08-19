<script lang="ts" setup>
import { useDark } from '@vueuse/core'
import { mdiTools } from '@mdi/js'

import technologies from '@/components/tech-stack/technologies'
import Technology from '@/types/components/tech-stack/Technology.type'

const props = defineProps({
  stack: {
    type: Array<Technology>,
    required: false,
    default: technologies
  },
  gradientDark: {
    type: Array<Number>,
    required: false,
    default: () => [18, 18, 18]
  },
  gradientLight: {
    type: Array<Number>,
    required: false,
    default: () => [227, 224, 226]
  },
  gradientLength: {
    type: String,
    required: false,
    default: '30%'
  },
  pauseOnHover: {
    type: Boolean,
    required: false,
    default: true
  },
  title: {
    type: String,
    default: () => {
      return 'components.techStack.title'
    }
  }
})

const isDark = useDark()
</script>

<template>
  <div class="author__stack">
    <div class="stack__title">
      <SvgIcon
        size="40"
        type="mdi"
        :path="mdiTools"
      />
      <h2>
        {{ $t(`${props.title}`) }}
      </h2>
    </div>
    <Marquee
      :gradient="true"
      :gradient-color="isDark ? props.gradientDark : props.gradientLight"
      :gradient-length="props.gradientLength"
      :pause-on-hover="props.pauseOnHover"
    >
      <div
        v-for="(technology, index) in props.stack"
        v-tooltip="technology.name"
        class="marquee__item"
        :key="`MarqueeItem[${index}:${technology.name}]`"
      >
        <img
          :src="technology.image"
          :alt="technology.name"
          class="marquee__img"
          :class="isDark ? 'dark' : 'light'"
        />
      </div>
    </Marquee>
  </div>
</template>

<style lang="scss" scoped>
@import '@/styles/app.scss';

.author__stack {
  @include flex(column, flex-start, center, 1rem);
  padding: 0rem 2dvw;
  width: 100%;

  &:has(.marquee__img:hover) .marquee__img:not(:hover) {
    filter: grayscale(100%);
  }

  > .stack__title {
    @include flex(row, center, center, 0.8rem);
    width: 100%;

    > h2 {
      font-size: $text-md;
      font-weight: 500;
      text-wrap: pretty;
      width: fit-content;
    }

    @media screen {
      @media (max-width: 768px) {
        @include flex(column, center, center, 0.8rem);
        text-align: center;

        > h2 {
          font-size: $text-sm;
        }
      }
    }
  }

  .marquee__item {
    padding: 0.8rem;
    margin-left: 1rem;

   > .marquee__img {
      max-width: 5rem;
      max-height: 5rem;
      transition: all 450ms cubic-bezier(0.23, 1, 0.320, 1);

      &:hover {
        transform: scale(1.1);
      }

      &.light {
        filter: drop-shadow(0 0.2rem 0.4rem rgb(0 0 0 / 0.3))
      }

      &.dark {
        filter: drop-shadow(0 0.2rem 0.4rem rgb(255 255 255 / 0.3))
      }
    }
  }

  @media screen {
    @media (max-width: 1024px) {      
      padding: 0rem 1dvw;
    }

    @media (max-width: 768px) {
      padding: 0rem 0rem;
    }
  }
}
</style>