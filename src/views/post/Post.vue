<script lang="ts">
import { useRoute } from 'vue-router'
import { useDark } from '@vueuse/core'
import { mdiNoteRemove } from '@mdi/js'
import { MdPreview } from 'md-editor-v3'
import { ref, watch, onMounted } from 'vue'
import { getPostContents } from '@/services/posts/posts'

import 'md-editor-v3/lib/preview.css'

export default {
  components: {    
    MdPreview,
  },
  data() {    
    const route = useRoute()
    const isDark = useDark()
    const isError = ref<boolean>(false)
    const isLoading = ref<boolean>(true)
    const postContents = ref<Object | null>(null)
    const currentContent = ref<string | null>(null)
    const currentLocale = ref<string>(this.$i18n.locale.toLowerCase())

    const fetchPostData = (): void => {
      const { slug } = route.params

      getPostContents(slug as string).then((contents): void => {
                              postContents.value = contents
                              currentContent.value = contents[currentLocale.value]
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
    })

    return {      
      route,
      isDark,
      isError,
      isLoading,
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