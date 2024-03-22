<script lang="ts" setup>
import { useDark } from '@vueuse/core'
import FooterLink from '@/types/components/FooterLink/FooterLink'

const props = defineProps<FooterLink>()
const isDark = useDark()

const resolveLink = (link: string) => {
  window.open(link, '_blank')
}
</script>

<template>
  <button
    role="link"
    class="footer__link__icon"
    :class="isDark ? 'dark__footer__link' : 'light__footer__link'"
    :aria-label="`${$t('components.footerLinkIcon.ariaLabel')} ${props.label}`"
    @click="resolveLink(`${props.link}`)"
  >
    <component
      :is="props.icon"
      :size="20"
      :color="isDark ? 'white' : 'black'"
    />
    <span
      class="footer__link__label"
    >
      {{ props.label }}
    </span>
  </button>
</template>

<style lang="scss" scoped>
@import '@/styles/app.scss';

.footer__link__icon {
  @include flex(row, center, flex-start, 0.6em);
  border: none;
  border-radius: $radius-md;
  cursor: pointer;
  padding: 0.4rem 0.6rem;
  transition: all 0.45s ease;
  height: 2.3rem;
  width: 100%;

  @media screen {
    @media (max-width: 768px) {
      @include flex(row, center, center, 0.6em);
    }
  }

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 0 0.35rem $darker-cyan,
                0 0 0.6rem $cyan,
                0 0 1.5rem 0.2rem rgba(135, 135, 187, 0.35) inset;
  }

  > .footer__link__label {
    font-size: $text-xsm;
    font-weight: 500;
    
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}

.dark__footer__link {
  background-color: $primary-dark;
  color: $primary-light !important;
  box-shadow: $dark-mode-shadow;
  border: 2px solid $dark-border;
}

.light__footer__link {
  background-color: $primary-light;
  color: $primary-dark !important;
  box-shadow: $light-mode-shadow;
  border: 2px solid $light-border;
}
</style>