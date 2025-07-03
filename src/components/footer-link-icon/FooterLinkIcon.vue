<script lang="ts" setup>
import { useDark } from '@vueuse/core'
import isMobile from '@/helpers/isMobile'
import FooterLink from '@/types/components/footer-link/FooterLink.type'

const props = defineProps<FooterLink>()
const isDark = useDark()

const resolveLink = (link: string): void => {
  window.open(link, '_blank')
}
</script>

<template>
  <button
    type="button"
    role="link"
    :aria-label="`${$t('components.footerLinkIcon.ariaLabel')} ${props.label}`"
    @click="resolveLink(`${props.link}`)"
    class="w-full h-[2.3rem] flex flex-row items-center justify-start gap-[0.6em] py-[0.4rem] px-[0.6rem] cursor-pointer border-2 rounded-[0.4rem] transition-all duration-300 ease-in-out hover:scale-[1.05]"
    :class="[
      isDark
        ? 'text-primary-light border-secondary-dark hover:shadow-dark'
        : 'text-primary-dark border-secondary-light hover:shadow-light',
      isMobile ? 'justify-center' : 'justify-start'
    ]"
  >
    <component
      :is="props.icon"
      :size="20"
      :color="isDark ? 'white' : 'black'"
    />
    <span class="text-[0.8rem] font-bold overflow-hidden text-ellipsis whitespace-nowrap">
      {{ props.label }}
    </span>
  </button>
</template>
