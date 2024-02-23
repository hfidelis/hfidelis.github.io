<script lang="ts">
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
  <VueMultiselect
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
</template>

<style src="vue-multiselect/dist/vue-multiselect.css" />

<style lang="scss">
.multiselect {
  width: fit-content;
}
</style>