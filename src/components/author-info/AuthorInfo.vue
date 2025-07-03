<script lang="ts" setup>
import { useDark } from '@vueuse/core'
import AvatarBox from '@/components/avatar-box/AvatarBox.vue'

const props = defineProps({
  name: {
    type: String,
    required: false,
    default: () => {
      return 'views.home.author.name'
    }
  },
  role: {
    type: String,
    required: false,
    default: () => {
      return 'views.home.author.role'
    }
  }
})

const isDark = useDark()
</script>

<template>
  <div class="flex flex-row items-center justify-center gap-8 w-full max-md:flex-col-reverse max-md:gap-4">
    <div class="text-justify">
      <h1
        class="text-4xl max-md:text-3xl text-center font-bold"
        :class="isDark ? 'text-primary-light' : 'text-primary-dark'"
      >
        {{ $t(`${props.name}`) }}
      </h1>
      <p class="text-lg font-bold text-center text-gradient bg-gradient-to-r from-accent-dark to-accent-light">
        {{ $t(`${props.role}`) }}
      </p>
    </div>
    <AvatarBox />
  </div>
</template>
