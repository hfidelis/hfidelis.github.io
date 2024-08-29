<script setup lang="ts">
import { ref, watch } from 'vue'

import IconFacebook from '@/components/icons/IconFacebook.vue'
import IconTwitter from '@/components/icons/IconTwitter.vue'
import IconLinkedin from '@/components/icons/IconLinkedin.vue'
import IconWhatsapp from '@/components/icons/IconWhatsapp.vue'

import SocialOption from '@/types/components/social-share/SocialOption.type'

interface SocialShareProps {
  type: SocialOption  
  url: string
  isDark: boolean
}

const props = defineProps<SocialShareProps>()

const currentColor = ref<string>('white')

const getContextIcon = (type: SocialOption) => {
  const COMPONENTS: { [key in SocialOption]: any } = {
    facebook: IconFacebook,
    twitter: IconTwitter,
    linkedin: IconLinkedin,
    whatsapp: IconWhatsapp,
  }

  return COMPONENTS[type]
}

const getContextColor = (type: SocialOption) => {
  const COLORS: { [key in SocialOption]: string } = {
    facebook: '#1877f2',
    twitter: '#1da1f2',
    linkedin: '#0077b5',
    whatsapp: '#25d366',
  }

  return COLORS[type]
}

watch(
  () => props.type,
  () => {
    currentColor.value = getContextColor(props.type)
  },
  { immediate: true }
)
</script>

<template>
  <div>
    <a
      :href="props.url"
      target="_blank"
      rel="noopener noreferrer"
      class="share__button"
      :class="isDark ? 'dark' : 'light'"
      :style="{ backgroundColor: getContextColor(props.type) }"
    >
      <component
        :is="getContextIcon(props.type)"
        :size="20"
        :color="'white'"
      />
    </a>
  </div>
</template>

<style lang="scss" scoped>
@import '@/styles/app.scss';

.share__button {
  display: inline-flex;
  justify-content: center;
  align-items: center;    
  border-radius: 50%;
  padding: 0.3rem;  
  transition: all 0.3s ease-in-out;

  &:hover {
    transform: scale(1.1);
    filter: brightness(1.8);
  }

  &.dark {
    box-shadow: $dark-mode-shadow;
  }

  &.light {
    box-shadow: $light-mode-shadow;
  }
}
</style>