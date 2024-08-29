<script lang="ts">
import { useRoute } from 'vue-router'
import { useDark } from '@vueuse/core'
import { mdiNoteRemove } from '@mdi/js'
import { MdPreview } from 'md-editor-v3'
import { ref, watch, onMounted, computed } from 'vue'

import 'md-editor-v3/lib/preview.css'

import postService from '@/services/post/post'
import SocialShare from '@/components/social-share/SocialShare.vue'
import SocialOption from '@/types/components/social-share/SocialOption.type'

interface ShareButtonBase {
  type: SocialOption
  url: string
}

export default {
  components: {    
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
            {{ $t('views.post.notFound.title') }}
          </h1>
          <span>
            {{ $t('views.post.notFound.subtitle') }}
          </span>
          <RouterLink
            :to="'/'"            
            class="not__found__link"
            :class="isDark ? 'dark' : 'light'"
          >            
            {{ $t('views.post.notFound.back') }}
          </RouterLink>
        </section>
      </template>

      <article
        v-else-if="currentContent"
      >
        <div
          class="blog__breadcrumb"
        >
          <RouterLink
            :to="'/blog'"
            class="blog__breadcrumb__link"
          >
            {{ $t('views.blog.title') }}
          </RouterLink>
          <span>></span>
          <span>{{ route.params.slug }}</span>
        </div>

        <section
          class="blog__social"
        >
          <div class="social__author">
            <div
              class="author__wrapper"
              :class="isDark ? 'dark' : 'light'"
            >
              <img
                class="author__avatar"
                src="@/assets/images/me-irl.jpeg"
                alt="Heitor Fidelis"
              />
            </div>
            <span>
              {{ $t('views.post.defaultAuthor') }}
            </span>
          </div>

          <div class="social__share">
            <span>
              {{ $t('views.post.share') }}:
            </span>
            <div
              class="share__buttons"
            >
              <SocialShare                                  
                v-for="(button, index) in SHARE_BUTTONS"
                :key="`${fullUrl}-${index}`"
                :type="button.type"                
                :url="button.url"
                :isDark="isDark"
              />              
            </div>
          </div>
        </section>

        <hr
          class="divider"
          :class="isDark ? 'dark' : 'light'"
        >

        <MdPreview
          :language="currentLocale"
          :theme="isDark ? 'dark' : 'light'"
          :class="isDark ? 'dark__preview' : 'light__preview'"
          :code-foldable="false"
          :code-theme="'gradient'"
          :editor-id="'post-editor'"
          :preview-theme="'github'"
          :model-value="currentContent"
        />
      </article>
    </FadeTransition>
  </Layout>
</template>

<style lang="scss" scoped>
@import '@/styles/app.scss';

.blog__social {
  margin-top: 2rem;
  @include flex(row, center, space-between);

  @media (max-width: 1024px) {
    @include flex(column, flex-start, center, 1rem);
  }

  > .social__author {
    @include flex(row, center, center, 0.8rem);

    > span {
      font-weight: 600;
      font-size: $text-md;

      @media (max-width: 1024px) {
        font-size: $text-sm;
      }
    }

    > .author__wrapper {
      @include flex(row, center, center);
      border-radius: 50%;

      &.dark {
        box-shadow: $dark-mode-shadow;
        border: 2px solid $dark-border;
      }

      &.light {
        box-shadow: $light-mode-shadow;
        border: 2px solid $light-border;
      }

      > .author__avatar {
        width: 4.25rem;
        height: 4.25rem;
        border-radius: 50%;

        @media (max-width: 1024px) {
          width: 3.5rem;
          height: 3.5rem;
        }
      }
    }
  }

  > .social__share {
    @include flex(row, center, center, 0.6rem);  

    > span {
      font-weight: 600;
    }

    > .share__buttons {
      @include flex(row, center, flex-start, 0.3rem);
    }
  }
}

.divider {
  margin: 1rem 0;
  border: 0;

  &.dark {
    border-top: 2px solid $dark-border;
  }

  &.light {
    border-top: 2px solid $light-border;
  }
}

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

.blog__breadcrumb {
  @include flex(row, center, flex-start, 0.6rem);
  font-size: text-md;
  font-weight: 600;
  margin-bottom: 0.8rem;

  .blog__breadcrumb__link {    
    text-decoration: underline;
    color: inherit;
  }

  @media (max-width: 768px) {
    font-size: text-sm;
  }
}

.dark__preview {
  box-shadow: $dark-mode-shadow !important;
}

.light__preview {
  box-shadow: $light-mode-shadow !important;
}
</style>