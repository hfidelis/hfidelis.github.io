<script setup lang="ts">
import LocaleValue from '@/components/locale-select/locale-value/LocaleValue.type'

const props = defineProps({
  option: {
    type: Object as () => LocaleValue,
    required: true,
  },
})
</script>

<template>
  <div class="flex items-center justify-items-start gap-1.5 flex-nowrap font-bold">
    <img
      :src="props.option.flag"
      :alt="`${props.option.value} flag image`"
      class="h-4 w-[1.475rem]"
    />
    <span>
      {{ props.option.value }}
    </span>
  </div>
</template>