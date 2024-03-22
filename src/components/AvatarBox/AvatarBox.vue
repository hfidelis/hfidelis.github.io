<script lang="ts" setup>
import { useDark } from '@vueuse/core'
import avatar from '@/assets/images/me.png'

const isDark = useDark()

const props = defineProps({
  source: {
    type: String,
    required: false,
    default: avatar,
  },
  tooltip: {
    type: String,
    required: false,
    default: 'Art by @drawkit, created with Avatartion',
  },
  alt: {
    type: String,
    required: false,
    default: 'Avatar image',
  },
})
</script>

<template>
  <div
    class="avatar__wrapper"
    :class="isDark ? 'dark__avatar' : 'light__avatar'"
  >
    <img
      :src="props.source"
      :alt="props.alt"
      class="avatar__content"
      v-tooltip="props.tooltip"
    >
  </div>
</template>

<style lang="scss" scoped>
@import '@/styles/app.scss';

.avatar__wrapper {
  @include flex(row, center, center);
  height: 100%;
  width: fit-content;

  overflow: hidden;

  border-radius: 50%;
  border: 0.25rem solid;

  &:hover {
    .avatar__content {
      animation: headBalance 0.675s ease;
    }
  }
}

.avatar__content {
  max-width: 250px;
}

.dark__avatar {
  border-color: $white;
  box-shadow: 0 0.375px 2.25rem 0.125rem rgba(135, 135, 187, 0.35),
                  0 0.188rem 3.5rem -0.188rem rgba(158, 158, 158, 0.35),
                  0 0.188rem 4.5rem -0.188rem rgba(158, 158, 158, 0.15);

  background: radial-gradient(circle, $darker-cyan, $cyan 45%, $white 95%);
}

.light__avatar {
  border-color: $black;
  box-shadow: 0 0.375px 2.25rem 0.125rem rgba(46, 46, 47, 0.65),
                  0 0.188rem 3.5rem -0.188rem rgba(40, 38, 38, 0.45),
                  0 0.188rem 4.5rem -0.188rem rgba(128, 127, 127, 0.35);

  background: radial-gradient(circle, $cyan, $darker-cyan 65%, $black 95%);
}

@keyframes headBalance {
  0% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(5deg) scale(1.075) rotateZ(-5deg);
  }
  100% {
    transform: rotate(0deg);
  }
}
</style>