<script lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useDark } from '@vueuse/core'
import { mdiNoteRemove } from '@mdi/js'

import Layout from '@/layout/Layout.vue'
import postService from '@/services/post/post'
import PostPreview from '@/components/post-preview/PostPreview.vue'

export default {
  components: {
    Layout,
    PostPreview,
  },
  data() {    
    const isDark = useDark()

    const posts = ref<Object | null>(null)
    const isLoading = ref<boolean>(true)
    const isError = ref<boolean>(false)    
    const currentLocale = ref<string>(this.$i18n.locale.toLowerCase())

    const fetchPosts = (): void => {
      postService
        .getAllPosts()
        .then((contents): void => {
                posts.value = contents
              })
              .catch((): void => {
                isError.value = true
              })
              .finally((): void => {
                setTimeout(() => {
                  isLoading.value = false
                }, 500)
              })
    }

    watch(
      () => this.$i18n.locale,
      () => {
        currentLocale.value = this.$i18n.locale.toLowerCase()
      },
    )

    onMounted(() => {
      fetchPosts()
    })

    return {      
      posts,
      isDark,
      isError,
      isLoading,
      mdiNoteRemove,
      currentLocale,
    }
  }
}
</script>

<template>
  <Layout>
    <FadeTransition>
      <template
        v-if="isLoading"
      >
        <section
          class="state__container"
        >
          <Spinner />
        </section>
      </template>

      <template
        v-else-if="isError"
      >
        <section
          class="state__container not__found"
        >
          <SvgIcon
            size="48"
            type="mdi"
            :path="mdiNoteRemove"
          />
          <h1>
            {{ $t('views.blog.notFound.title') }}
          </h1>
          <span>
            {{ $t('views.blog.notFound.subtitle') }}
          </span>
          <RouterLink
            :to="'/'"            
            class="not__found__link"
            :class="isDark ? 'dark' : 'light'"
          >
            {{ $t('views.blog.notFound.back') }}
          </RouterLink>
        </section>
      </template>

      <div
        v-else-if="posts"
      >
        <section
          class="page__title"
          :class="isDark ? 'dark' : 'light'"
        >
          <h1>
            {{ $t('views.blog.title') }}
          </h1>
          <hr>
        </section>

        <section
          class="blog__container"
        >
          <div
            class="blog__post"
            v-for="(post, index) in Object.keys(posts)"
          >
            <PostPreview              
              :key="`post[${index+1}-${post}-${currentLocale}]`"
              :locale="currentLocale"
              :slug="post"
              :post="posts[post]"
              :style="{ marginBottom: `${index === Object.keys(posts).length - 1 ? 0 : 2}rem` }"
            />
          </div>
        </section>
      </div>
    </FadeTransition>
  </Layout>
</template>

<style lang="scss" scoped>
@import '@/styles/app.scss';

.not__found {
  @include flex(column, center, center, 0.6rem);
  text-align: center;

  .not__found__link {
    background-color: $dark-cyan;
    color: inherit;
    padding: 0.6rem;
    border-radius: $radius-md;
    text-decoration: none;
    transition: all 0.3s ease-in-out;

    &.dark {
      box-shadow: $dark-mode-shadow;
    }

    &.light {
      box-shadow: $light-mode-shadow;
    }

    &:hover {
      background-color: $darker-cyan;
    }
  }
}

.page__title {  
  > h1 {
    font-size: $text-4xl;
    font-weight: 600;
    margin-bottom: 0.3rem;
  }  

  > hr {
    border: 0;
  }

  &.dark {
    > hr {
      border-top: 2px solid $dark-border;
    }
  }

  &.light {
    > hr {
      border-top: 2px solid $light-border;
    }
  }

  margin-bottom: 2rem;
}

.blog__container {  
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 5%;

  @media (max-width: 1080px) {
    flex-direction: column;
    gap: 0;
  }
  
  > .blog__post {
    width: 45%;
    flex-grow: 1;

    @media (max-width: 1080px) {
      width: 100%;
    }
  }
}
</style>