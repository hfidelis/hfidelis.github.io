<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useDark } from '@vueuse/core'

import technologies from '@/components/tech-tags/technologies'

const isDark = useDark()
const hoveredIndexes = ref<number[]>([])
let lastHighlightedIndexes: number[] = []

onMounted(() => {
  const tagHighlightCycle = () => {
    const availableIndexes = [...Array(technologies.length).keys()]
      .filter(i => !lastHighlightedIndexes.includes(i))

    const totalToHighlight = Math.min(3, availableIndexes.length)
    const selected: number[] = []

    while (selected.length < totalToHighlight && availableIndexes.length) {
      const randomIndex = Math.floor(Math.random() * availableIndexes.length)
      const [picked] = availableIndexes.splice(randomIndex, 1)
      selected.push(picked)
    }

    lastHighlightedIndexes = [...selected]

    selected.forEach((i, idx) => {
      setTimeout(() => {
        hoveredIndexes.value.push(i)

        setTimeout(() => {
          hoveredIndexes.value = hoveredIndexes.value.filter(v => v !== i)
        }, 2000 + Math.random() * 400)
      }, idx * 350)
    })

    const cycleDuration = selected.length * 350 + 1600
    setTimeout(tagHighlightCycle, cycleDuration + 1000)
  }

  tagHighlightCycle()
})
</script>

<template>
  <div class="flex flex-wrap justify-center gap-4 p-4">
    <div
      v-for="(tech, index) in technologies"
      v-tooltip="tech.name"
      :key="tech.name"
      class="relative flex items-center justify-start gap-2 px-4 py-2 rounded-md transition-all ease-in-out duration-500 backdrop-blur-md border text-sm font-semibold w-[9.5rem] h-[2.75rem]"
      :class="[
        isDark
          ? 'bg-secondary-dark/50 text-primary-light border-white/10'
          : 'bg-secondary-light/40 text-primary-dark border-black/10',
        hoveredIndexes.includes(index) ? `border-none scale-105 ring-1 ${isDark ? 'ring-accent-dark' : 'ring-accent-light'}` : '',
      ]"
    >
      <div
        class="absolute inset-0 rounded-md opacity-20 bg-gradient-to-br via-transparent pointer-events-none"
        :class="isDark ? 'from-accent-light to-primary-light' : 'from-accent-dark to-primary-dark'"
      ></div>

      <img
        :src="tech.image"
        :alt="tech.name"
        class="w-6 h-6 z-10"
      />
      <span class="z-10 truncate">{{ tech.name }}</span>
    </div>
  </div>
</template>
