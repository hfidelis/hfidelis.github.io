<script lang="ts" setup>
import { useDark } from '@vueuse/core'

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
    class="footer__container"
  >
    <footer
      class="app__footer"
      :class="isDark ? 'dark__footer' : 'light__footer'"
    >
      <section
        class="footer__title"
      >
        <h1>
          {{ $t('components.footer.title') }}
        </h1>
      </section>
      <section
        class="footer__links"
      >
        <ul>
          <li
            v-for="(link, index) in footerLinks"
            :key="`footer-link-${link.label}-${index}`"
          >
            <FooterLinkIcon
              v-bind="link"
            />
          </li>
        </ul>
      </section>
      <section
        class="footer__owner"
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
@import '@/styles/app.scss';

.footer__container {
  @include flex(column, center, center);
  min-height: $footer-height;
  width: 100dvw;
  padding: 2dvh 25dvw;

  @media screen {
    @media (max-width: 1400px) {
      padding: 2dvh 15dvw;
    }

    @media (max-width: 1024px) {
      padding: 1.2rem 10dvw;
    }

    @media (max-width: 768px) {
      padding: 1.2rem 1.8rem;
    }
  }

  > .app__footer {
    @include flex(column, center, space-between, 0.4rem);
    flex: 1;

    width: 100%;
    padding: 1.2rem;

    border-radius: $radius-lg;

    @media screen {
      @media (max-width: 768px) {
        @include flex(column, center, center, 1.2rem);
      }
    }

    > .footer__title,
      .footer__links,
      .footer__owner {
        width: 100%;
      }

    > .footer__title {
      font-size: $text-sm;
      text-align: center;

      @media screen {
        @media (max-width: 768px) {
          font-size: $text-xsm;
        }
      }
    }

    > .footer__links {
      @include flex(row, center, center, 0.8rem);
      width: 100%;

      > ul {
        @include flex(row, center, center, 0.8rem);
        list-style: none;
        padding: 0;
        margin: 0;
        width: 100%;

        > li {
          @include flex(row, center, center);
          width: 22.5%;
        }
      }

      @media screen {
        @media (max-width: 768px) {
          > ul {
            @include flex(column, center, center, 0.4rem);

            > li {
              width: 80%;
            }
          }
        }
      }
    }

    > .footer__owner {
      @include flex(row, center, center, 0.4rem);
      text-align: center;
      font-weight: 500;
      font-size: $text-xsm;
    }
  }
}

.dark__footer {
  border: 2px solid $dark-border;
  box-shadow: $dark-mode-shadow,
              0 0 1.5rem 0.2rem rgba(135, 135, 187, 0.16) inset;
}

.light__footer {
  border: 2px solid $light-border;
  box-shadow: $light-mode-shadow,
              0 0 1.5rem 0.2rem rgba(50, 50, 93, 0.35) inset;
}
</style>