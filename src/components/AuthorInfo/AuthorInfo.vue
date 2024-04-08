<script lang="ts" setup>
import AvatarBox from '@/components/AvatarBox/AvatarBox.vue'

const props = defineProps({
  name: {
    type: String,
    required: false,
    default: () => {
      return 'views.home.author.name'
    }
  },
  role: {
    type: String,
    required: false,
    default: () => {
      return 'views.home.author.role'
    }
  }
})
</script>

<template>
  <div class="author__info">
    <div class="author__info__text">
      <h1>
        {{ $t(`${props.name}`) }}
      </h1>
      <p>
        {{ $t(`${props.role}`) }}
      </p>
    </div>
    <AvatarBox />
  </div>
</template>

<style lang="scss" scoped>
@import '@/styles/app.scss';

.author__info {
  @include flex(row, center, center, 2rem);
  width: 100%;

  @media (max-width: 768px) {
    @include flex(column-reverse, center, center, 1rem);
  }

  .author__info__text {
    text-align: justify;

    > h1 {
      font-size: $text-3xl;
    }

    > p {
      font-size: $text-sm;
      font-weight: 500;
    }

    @media (max-width: 768px) {
      > h1 {
        font-size: $text-2xl;
      }
    }
  }
}
</style>