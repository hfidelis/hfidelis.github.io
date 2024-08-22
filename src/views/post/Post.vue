<script lang="ts">
import { useRoute } from 'vue-router'
import { useDark } from '@vueuse/core'
import { MdPreview } from 'md-editor-v3'
import { ref, watch, onMounted } from 'vue'
import { getPostContents } from '@/services/posts/posts'

import 'md-editor-v3/lib/preview.css'

import FadeTransition from '@/components/fade-transition/FadeTransition.vue'

export default {
  components: {    
    MdPreview,
    FadeTransition
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
        currentContent.value = postContents.value![currentLocale.value]
      }
    )

    onMounted(() => {
      fetchPostData()
    })

    return {
      isDark,
      isError,
      isLoading,
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
          class="state__container"
        >
          <span>// TODO: Erro</span>
        </section>
      </template>

      <template
        v-else-if="currentContent"
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
      </template>
    </FadeTransition>
  </Layout>
</template>

<style lang="scss" scoped>
@import '@/styles/app.scss';

.dark__preview {
  box-shadow: $dark-mode-shadow !important;
}

.light__preview {
  box-shadow: $light-mode-shadow !important;
}
</style>