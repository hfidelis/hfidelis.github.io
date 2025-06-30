<script lang="ts" setup>
import avatar from '@/assets/images/me.jpeg'
import { NAvatar } from 'naive-ui'

const props = defineProps({
  source: {
    type: String,
    required: false,
    default: avatar,
  },
})
</script>

<template>
  <NAvatar
    :src="props.source"
    :size="180"
    round
  >
  </NAvatar>
</template>