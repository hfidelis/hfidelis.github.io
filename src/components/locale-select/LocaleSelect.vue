<script lang="ts">
import { ref } from 'vue'
import { useDark } from '@vueuse/core'

import Locale from '@/types/i18n/Locale'
import LocaleOption from '@/components/locale-select/locale-option/LocaleOption.vue'
import LocaleValue from '@/components/locale-select/locale-value/LocaleValue.type'

import ptBRFlag from '@/assets/flags/pt-BR.png'
import enUSFlag from '@/assets/flags/en-US.png'

import VueMultiselect from 'vue-multiselect'

export default {
  components: {
    VueMultiselect,
    LocaleOption,
  },
  data() {
    const isDark = useDark()

    const countryFlags: { [key in Locale]: string } = {
      'pt-BR': ptBRFlag,
      'en-US': enUSFlag,
    } as const;

    const selectedLocale = ref<LocaleValue>({
      value: this.$i18n.locale as Locale,
      flag: countryFlags[this.$i18n.locale as Locale],
    })

    const locales = this.$i18n.availableLocales.map((k): LocaleValue => {
      return {
        value: k as Locale,
        flag: countryFlags[k as Locale],
      }
    })

    const updateLocale = (locale: LocaleValue): void => {
      selectedLocale.value = locale
      this.$i18n.locale = locale.value

      localStorage.setItem('i18nLocale', locale.value)
    }

    const checkStorageLocale = (): void => {
      const storageLocale = localStorage.getItem('i18nLocale')

      if (storageLocale) {
        selectedLocale.value = {
          value: storageLocale as Locale,
          flag: countryFlags[storageLocale as Locale],
        }
        this.$i18n.locale = storageLocale as Locale
      }
    }

    return {
      isDark,
      locales,
      updateLocale,
      countryFlags,
      selectedLocale,
      checkStorageLocale,
    }
  },
  created() {
    this.checkStorageLocale()
  }
}

</script>

<template>
  <div
    class="select__wrapper"
    :class="isDark ? 'dark__select' : 'light__select'"
  >
    <VueMultiselect
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
@import '@/styles.css';

.select__wrapper,
.multiselect {
  width: fit-content;
  transition: all 150ms ease;
}

.select__wrapper {
  &:hover {
    transform: scale(1.05);
  }
}
</style>

<style lang="scss">
@import '@/styles.css';

.dark__select {
  border: 0.15rem solid var(--color-secondary-dark);
  border-radius: 0.4rem;

  &:hover {
    box-shadow: var(--shadow-dark);
  }

  .multiselect {
    background-color: transparent;
    color: var(--color-primary-light);
    border: none;
    cursor: pointer;

    .multiselect__tags,
    .multiselect__single,
    .multiselect__content-wrapper {
      background-color: transparent !important;
      color: var(--color-primary-light);
      border: none;

      @media screen and (max-width: 768px) {
        background-color: var(--color-primary-dark) !important;
      }
    }
  }

  .multiselect > .multiselect__content-wrapper {
    border: 0.15rem solid var(--color-secondary-dark);
    box-shadow: var(--shadow-dark);
  }

  .multiselect > .multiselect__select::before {
    border-top-color: var(--color-secondary-dark);
  }
}

.light__select {
  border: 0.15rem solid var(--color-secondary-light);
  border-radius: 0.4rem;

  &:hover {
    box-shadow: var(--shadow-light);
  }

  .multiselect {
    background-color: transparent;
    color: var(--color-primary-dark);
    border: none;

    .multiselect__tags,
    .multiselect__single,
    .multiselect__content-wrapper {
      background-color: transparent !important;
      color: var(--color-primary-dark);
      border: none;

      @media screen and (max-width: 768px) {
        background-color: var(--color-primary-light) !important;
      }
    }
  }

  .multiselect > .multiselect__content-wrapper {
    border: 0.15rem solid var(--color-secondary-light);
    box-shadow: var(--shadow-light);
  }

  .multiselect > .multiselect__select::before {
    border-top-color: var(--color-secondary-light);
  }
}
</style>

<style src="vue-multiselect/dist/vue-multiselect.css" />
