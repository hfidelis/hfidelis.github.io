<script lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useDark } from '@vueuse/core'
import { mdiNoteRemove } from '@mdi/js'
import { NDivider, NResult } from 'naive-ui'

import Layout from '@/layout/Layout.vue'
import isMobile from '@/helpers/isMobile'
import postService from '@/services/post/post'
import PostPreview from '@/components/post-preview/PostPreview.vue'

export default {
  components: {
    Layout,
    PostPreview,
    NResult,
    NDivider,
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
      isMobile,
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
          class="flex flex-col justify-center items-center min-h-full"
        >
          <Spinner />
        </section>
      </template>

      <template
        v-else-if="isError"
      >
        <section>
          <NResult
            status="500"
            :title="$t('views.blog.notFound.title')"
            :description="$t('views.blog.notFound.subtitle')"
            :size="isMobile ? 'small' : 'medium'"
          >
            <template #footer>
              <RouterLink
                :to="'/'"
                class="text-inherit p-[0.6rem] rounded-[0.4rem] no-underline duration-[300ms] ease-in-out transition-all bg-accent-light hover:bg-accent-dark shadow-light"
              >
                {{ $t('views.blog.notFound.back') }}
              </RouterLink>
            </template>
          </NResult>
        </section>
      </template>

      <div
        v-else-if="posts"
      >
        <section>
          <h1
            class="text-3xl lg:text-5xl font-bold text-gradient bg-gradient-to-r"
            :class="isDark ? 'from-primary-light to-secondary-light' : 'from-primary-dark to-secondary-dark'"
          >
            {{ $t('views.blog.title') }}
          </h1>
          <NDivider />
        </section>

        <section
          class="flex flex-col lg:flex-row lg:gap-[5%] justify-center items-start flex-wrap gap-0"
        >
          <div
            class="grow w-full lg:w-[45%]"
            v-for="(post, index) in Object.keys(posts)"
            :key="`post-${index}-${post}-${currentLocale}`"
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