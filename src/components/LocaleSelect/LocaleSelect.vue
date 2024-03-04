<script lang="ts">
import { useDark } from '@vueuse/core'

import VueMultiselect from 'vue-multiselect'

import Locale from '@/types/i18n/Locale'
import LocaleOption from '@/components/LocaleSelect/LocaleOption/LocaleOption.vue'
import LocaleValueType from '@/types/components/LocaleSelect/LocaleValueType'

export default {
  components: {
    VueMultiselect,
    LocaleOption,
  },
  data() {
    const isDark = useDark()

    const selectedLocale: LocaleValueType = {
      value: this.$i18n.locale as Locale,
      flag: '🇧🇷',
    } as const;

    const countryFlags: { [key in Locale]: string } = {
      'pt-BR': '🇧🇷',
      'en-US': '🇺🇸',
    } as const;

    const locales = this.$i18n.availableLocales.map((k): LocaleValueType => {      
      return {
        value: k as Locale,
        flag: countryFlags[k as Locale],
      }
    })

    return {
      isDark,
      locales,
      countryFlags,
      selectedLocale,
    }
  },
  methods: {
    updateLocale(locale: LocaleValueType): void {
      this.selectedLocale = locale
      this.$i18n.locale = locale.value
    }
  },
}

</script>

<template>
  <div
    class="select__wrapper"
    :class="isDark ? 'dark__select' : 'light__select'"
  >
    <VueMultiselect
      :aria-hidden="true"
      :aria-label="$t('components.localeSelect.ariaLabel')"
      :options="locales"
      :selectLabel="''"
      :deselectLabel="''"
      :allowEmpty="false"
      :searchable="false"
      :selectedLabel="$t('components.localeSelect.selectedLabel')"
      :model-value="selectedLocale"
      @update:model-value="updateLocale"
    >
      <template
        v-slot:singleLabel="props"
      >
        <LocaleOption
          :option="props.option"
        />
      </template>
      <template
        v-slot:option="props"
      >
        <LocaleOption
          :option="props.option"
        />
      </template>
    </VueMultiselect>
  </div>
</template>

<style lang="scss" scoped>
@import '@/styles/app.scss';

.select__wrapper,
.multiselect {
  width: fit-content;
}
</style>

<style lang="scss">
@import '@/styles/app.scss';

.dark__select {
  border: $border-sm solid $dark-border;
  border-radius: $radius-md;
  box-shadow: $dark-mode-shadow;

  .multiselect {
    background-color: transparent;
    color: $primary-light;
    border: none;
    cursor: pointer;

    .multiselect__tags,
    .multiselect__single,
    .multiselect__content-wrapper {
      background-color: $primary-dark;
      color: $primary-light;
      border: none;
    }
  }

  .multiselect > .multiselect__content-wrapper {
    border: $border-sm solid $dark-border;
    box-shadow: $dark-mode-shadow;
  }

  .multiselect > .multiselect__select::before {
    border-top-color: $dark-border;
  }
}

.light__select {
  border: $border-sm solid $light-border;
  border-radius: $radius-md;
  box-shadow: $light-mode-shadow;

  .multiselect {
    background-color: transparent;
    color: $primary-dark;
    border: none;

    .multiselect__tags,
    .multiselect__single,
    .multiselect__content-wrapper {
      background-color: $primary-light;
      color: $primary-dark;
      border: none;
    }
  }

  .multiselect > .multiselect__content-wrapper {
    border: $border-sm solid $light-border;
    box-shadow: $light-mode-shadow;
  }

  .multiselect > .multiselect__select::before {
    border-top-color: $light-border;
  }
}
</style>

<style src="vue-multiselect/dist/vue-multiselect.css" />
