<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { NResult, NButton } from 'naive-ui';
import isMobile from '@/helpers/isMobile';

const router = useRouter();
</script>

<template>
  <Layout>
    <section
      class="flex items-center justify-center min-h-[50dvh]"
    >
      <NResult
        status="404"
        :title="$t('views.notFound.title')"
        :description="$t('views.notFound.subtitle')"
        :size="isMobile ? 'small' : 'medium'"
      >
        <template #footer>
          <NButton
            secondary
            type="default"
            @click="router.push('/')"
            :size="isMobile ? 'medium' : 'large'"
          >
            {{ $t('views.notFound.back') }}
          </NButton>
        </template>
      </NResult>
    </section>
  </Layout>
</template>