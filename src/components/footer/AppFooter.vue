<script lang="ts" setup>
import { useDark } from '@vueuse/core'
import isMobile from '@/helpers/isMobile'

import IconVue from '@/components/icons/IconVue.vue'
import IconGmail from '@/components/icons/IconGmail.vue'
import IconGithub from '@/components/icons/IconGithub.vue'
import IconLinkedin from '@/components/icons/IconLinkedin.vue'
import FooterLinkIcon from '@/components/footer-link-icon/FooterLinkIcon.vue'
import FooterLink from '@/types/components/footer-link/FooterLink.type'

const isDark = useDark()

const footerLinks: Array<FooterLink> = [
  {
    icon: IconGithub,
    link: 'https://github.com/hfidelis',
    label: 'hfidelis',
  },
  {
    icon: IconLinkedin,
    link: 'https://www.linkedin.com/in/hfidelis/',
    label: 'in/hfidelis',
  },
  {
    icon: IconGmail,
    link: 'mailto:heitorc88@gmail.com',
    label: 'heitorc88@gmail.com',
  },
]
</script>

<template>
  <section
    class="
      flex flex-col items-center justify-center
      min-h-[20dvh]
      w-[100dvw]
      footer__container"
  >
    <footer
      class="flex flex-col items-center justify-center gap-[0.4rem] md:justify-between md:gap-[1.2rem] rounded-[0.6rem] w-full p-[1rem]"
      :class="isDark ? 'border-2 border-secondary-dark' : 'border-2 border-secondary-light'"
    >
      <section
        class="text-center w-full"
      >
        <h1
          class="text-[0.8rem] md:text-[1rem] font-bold"
          :class="isDark ? 'text-primary-light' : 'text-primary-dark'"
        >
          {{ $t('components.footer.title') }}
        </h1>
      </section>
      <section
        class="w-full flex items-center justify-center gap-[0.8rem]"
      >
        <ul
          class="flex flex-col md:flex-row items-center justify-center gap-[0.4rem] md:gap-[0.8rem] w-full p-0 m-0 list-none"
        >
          <li
            v-for="(link, index) in footerLinks"
            :key="`footer-link-${link.label}-${index}`"
            class="flex items-center justify-center"
            :class="isMobile ? 'w-[80%]' : 'w-[22.5%]'"
          >
            <FooterLinkIcon
              v-bind="link"
            />
          </li>
        </ul>
      </section>
      <section
        class="flex items-center justify-center gap-[0.4rem] text-[0.8rem] font-bold"
        :class="isDark ? 'text-primary-light' : 'text-primary-dark'"
      >
        <span>
          {{ $t('components.footer.madeWith') }}
        </span>
        <IconVue
          size="20"
        />
        <span>
          {{ $t('components.footer.by') }}
        </span>
      </section>
    </footer>
  </section>
</template>

<style lang="scss" scoped>
.footer__container {
  padding: 1dvh 25dvw;

  @media screen {
    @media (max-width: 1400px) {
      padding: 1dvh 15dvw;
    }

    @media (max-width: 1024px) {
      padding: 1.2rem 10dvw;
    }

    @media (max-width: 768px) {
      padding: 1.2rem 1.8rem;
    }
  }
}
</style>