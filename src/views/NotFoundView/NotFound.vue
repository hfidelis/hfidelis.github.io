<script lang="ts" setup>
import { RouterLink } from 'vue-router'

import notFound from '@/assets/images/404.svg'
</script>

<template>
  <Layout>
    <section
      class="not__found__wrapper"
    >
      <img
        :src="notFound"
        class="not__found__image"
        alt="404 Not Found"
        v-tooltip="'Image by @storyset / freepik.com'"
      >
      <div
        class="not__found__details"
      >
        <h1
          class="not__found__title"
        >
          {{ $t('views.notFound.title') }}
        </h1>
        <p
          class="not__found__description"
        >
          {{ $t('views.notFound.subtitle') }}
        </p>
        <RouterLink
          to="/"
          class="not__found__link"
        >
          {{ $t('views.notFound.back') }}
        </RouterLink>
      </div>
    </section>
  </Layout>
</template>

<style lang="scss" scoped>
@import '@/styles/app.scss';
  
.not__found__wrapper {
  @include flex(column, center, center);

  padding: 3rem 3rem;

  > .not__found__image {
    max-width: 350px;
    min-width: 200px;

    animation: shadowPulse 2s infinite;
  }

  > .not__found__details {
    @include flex(column, center, center, 0.75rem);
    margin-top: 1rem;

    > .not__found__link,
      .not__found__title,
      .not__found__description {
        text-align: center;
      }

    > .not__found__title {
      font-size: $text-lg;
      font-weight: 600;

      @media screen and (max-width: 600px) {
        font-size: $text-md;
      }
    }

    > .not__found__description {
      font-size: $text-sm;
      font-weight: 500;
    }

    > .not__found__link {
      font-weight: 600;
      color: $white;
      background-color: $dark-cyan;
      box-shadow: 0 0.1rem 1.45rem 0.1rem rgba(39, 222, 192, 0.5);
      text-decoration: none;

      border-radius: $radius-lg;
      padding: 0.8rem 1rem;

      transition: all 0.3s ease;

      margin-top: 1rem;

      @media screen and (max-width: 600px) {
        font-size: $text-sm;
      }

      &:hover {
        background-color: $darker-cyan;
        box-shadow: 0 0.1rem 1.0rem 0.1rem rgba(39, 222, 192, 0.2);
      }
    }
  }
}

@keyframes shadowPulse {
  0% {
    filter: drop-shadow(0 0.1rem 0.75rem rgba(39, 222, 192, 0.3));
    transform: scale(1);
  }
  50% {
    filter: drop-shadow(0 0.4rem 0.75rem rgb(39,222,191, 0.75));
    transform: scale(1.01);
  }
  100% {
    filter: drop-shadow(0 0.1rem 0.75rem rgb(39,222,192, 0.3));
    transform: scale(1);
  }
}
</style>