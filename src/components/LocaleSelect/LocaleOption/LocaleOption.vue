<script setup lang="ts">
import { defineProps } from 'vue'

import LocaleValueType from '@/types/components/LocaleSelect/LocaleValueType'

const props = defineProps({
  option: {
    type: Object as () => LocaleValueType,
    required: true,
  },
})
</script>

<template>
  <div class="locale__option">
    <span class="locale__flag">
      {{ props.option.flag }}
    </span>
    <span class="locale__value">
      {{ props.option.value }}
    </span>
  </div>
</template>

<style lang="scss" scoped>
@import '@/styles/app.scss';
.locale__option {
  @include flex(row, center, start, 0.4rem, nowrap);
  font-weight: 600;
}
</style>