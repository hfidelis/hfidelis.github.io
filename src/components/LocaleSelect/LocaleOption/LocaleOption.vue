<script setup lang="ts">
import LocaleValue from '@/types/components/LocaleSelect/LocaleValue.type'

const props = defineProps({
  option: {
    type: Object as () => LocaleValue,
    required: true,
  },
})
</script>

<template>
  <div class="locale__option">
    <img
      :src="props.option.flag"
      :alt="`${props.option.value} flag image`"
      class="locale__flag"
    />
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

  > .locale__flag {
    width: 1.475rem;
    height: 1rem;
  }
}
</style>