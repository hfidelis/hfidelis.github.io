<script lang="ts">
import { useRoute } from 'vue-router'
import { useDark } from '@vueuse/core'
import { mdiNoteRemove } from '@mdi/js'
import { MdPreview } from 'md-editor-v3'
import { NResult, NDivider } from 'naive-ui'
import { ref, watch, onMounted, computed } from 'vue'

import 'md-editor-v3/lib/preview.css'

import isMobile from '@/helpers/isMobile'
import postService from '@/services/post/post'
import SocialShare from '@/components/social-share/SocialShare.vue'
import SocialOption from '@/types/components/social-share/SocialOption.type'

interface ShareButtonBase {
  type: SocialOption
  url: string
}

export default {
  components: {
    NDivider,
    NResult,
    MdPreview,
    SocialShare,
  },
  data() {
    const route = useRoute()
    const isDark = useDark()
    const fullUrl = ref<string>('')
    const isError = ref<boolean>(false)
    const isLoading = ref<boolean>(true)
    const postContents = ref<Object | null>(null)
    const currentContent = ref<string | null>(null)
    const currentLocale = ref<string>(this.$i18n.locale.toLowerCase())

    const SHARE_BUTTONS = computed<Array<ShareButtonBase>>(() => {
      return [
        {
          type: 'facebook',
          url: `https://www.facebook.com/sharer/sharer.php?u=${fullUrl.value}`
        },
        {
          type: 'twitter',
          url: `https://twitter.com/intent/tweet?&url=${fullUrl.value}`
        },
        {
          type: 'linkedin',
          url: `https://www.linkedin.com/shareArticle?mini=true&url=${fullUrl.value}`
        },
        {
          type: 'whatsapp',
          url: `https://api.whatsapp.com/send?text=${fullUrl.value}`
        }
      ]
    })

    const fetchPostData = (): void => {
      const { slug } = route.params

      postService
        .getPostData(slug as string)
        .then((contents: { [key: string]: string }): void => {
                postContents.value = contents
                currentContent.value = contents[currentLocale.value]
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

    watch(
      () => currentLocale.value,
      () => {
        if (postContents.value) {
          currentContent.value = postContents.value![currentLocale.value]
        }
      }
    )

    onMounted(() => {
      fetchPostData()
      fullUrl.value = encodeURIComponent(window.location.href)
    })

    return {
      route,
      fullUrl,
      isDark,
      isError,
      isLoading,
      isMobile,
      SHARE_BUTTONS,
      mdiNoteRemove,
      currentLocale,
      currentContent,
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
            status="404"
            :title="$t('views.post.notFound.title')"
            :description="$t('views.post.notFound.subtitle')"
            :size="isMobile ? 'small' : 'medium'"
          >
            <template #footer>
              <RouterLink
                :to="'/'"
                class="text-inherit p-[0.6rem] rounded-[0.4rem] no-underline duration-[300ms] ease-in-out transition-all bg-accent-light hover:bg-accent-dark shadow-light"
              >
                {{ $t('views.post.notFound.back') }}
              </RouterLink>
            </template>
          </NResult>
        </section>
      </template>

      <article
        v-else-if="currentContent"
      >
        <div
          class="flex items-center justify-start gap-[0.6rem] font-bold text-md md:text-lg mb-[0.8rem]"
          :class="isDark ? 'text-primary-light' : 'text-primary-dark'"
        >
          <RouterLink
            :to="'/blog'"
            class="no-underline text-inherit"
          >
            {{ $t('views.blog.title') }}
          </RouterLink>
          <span>></span>
          <span>{{ route.params.slug }}</span>
        </div>

        <section
          class="mt-8 flex flex-col items-start justify-center gap-4 lg:flex-row lg:items-center lg:justify-between lg:gap-0"
        >
          <div class="flex items-center justify-center gap-[0.8rem]">
            <div
              class="rounded-full flex items-center justify-center w-14 h-14 lg:w-20 lg:h-20 bg-gradient-to-br p-1"
              :class="isDark ? 'from-primary-dark to-secondary-dark via-gray-800' : 'from-primary-light to-secondary-light via-gray-400'"
            >
              <img
                class="object-cover h-full w-full rounded-full"
                src="@/assets/images/me.jpeg"
                alt="Heitor Fidelis"
              />
            </div>
            <span
              class="font-bold text-md lg:text-lg"
              :class="isDark ? 'text-primary-light' : 'text-primary-dark'"
            >
              {{ $t('views.post.defaultAuthor') }}
            </span>
          </div>

          <div class="flex items-center justify-center gap-[0.6rem]">
            <span
              class="font-bold"
              :class="isDark ? 'text-primary-light' : 'text-primary-dark'"
            >
              {{ $t('views.post.share') }}:
            </span>
            <div
              class="flex items-center justify-start gap-[0.3rem]"
            >
              <SocialShare
                v-for="(button, index) in SHARE_BUTTONS"
                :key="`${fullUrl}-${index}`"
                :type="button.type"
                :url="button.url"
              />
            </div>
          </div>
        </section>

        <NDivider />

        <MdPreview
          :language="currentLocale"
          :theme="isDark ? 'dark' : 'light'"
          class="rounded-xl"
          :code-foldable="false"
          :code-theme="'github'"
          :editor-id="'post-editor'"
          :preview-theme="'github'"
          :model-value="currentContent"
        />
      </article>
    </FadeTransition>
  </Layout>
</template>