<script lang="ts" setup>
import avatar from '@/assets/images/me.jpeg'

import { NAvatar } from 'naive-ui'
import { useDark } from '@vueuse/core'

const props = defineProps({
  source: {
    type: String,
    required: false,
    default: avatar,
  },
})

const isDark = useDark()
</script>

<template>
  <div
    class="rounded-full flex items-center justify-center p-1 bg-gradient-to-br"
    :class="isDark ? 'from-primary-dark to-secondary-dark via-gray-800' : 'from-primary-light to-secondary-light via-gray-400'"
  >
    <NAvatar
      :src="props.source"
      :size="180"
      round
    />
  </div>
</template>