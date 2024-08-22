<script lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useDark } from '@vueuse/core'
import { getAllPosts } from '@/services/posts/posts'

import Layout from '@/layout/Layout.vue'
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
      getAllPosts().then((contents): void => {
                            posts.value = contents
                          })
                          .catch((): void => {
                            isError.value = true
                          })
                          .finally((): void => {
                            setTimeout(() => { isLoading.value = false }, 500)
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
          class="state__container"
        >
          <span>// TODO: Erro</span>
        </section>
      </template>

      <template
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
        <section>          
          <PostPreview
            v-for="(post, index) in Object.keys(posts)"
            :key="`post[${index+1}-${post}-${currentLocale}]`"
            :locale="currentLocale"
            :slug="post"
            :post="posts[post]"
            :style="{ marginBottom: `${index === Object.keys(posts).length - 1 ? 0 : 2}rem` }"
          />
        </section>
      </template>
    </FadeTransition>
  </Layout>
</template>

<style lang="scss" scoped>
@import '@/styles/app.scss';

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
</style>