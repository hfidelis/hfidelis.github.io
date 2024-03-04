import { ref, watch, readonly } from 'vue'

const isMobile = ref(false)

const windowWidth = ref(window.innerWidth)

window.addEventListener('resize', () => {
  windowWidth.value = window.innerWidth
})

watch(
  () => windowWidth.value,
  () => {
    isMobile.value = windowWidth.value < 768
  },
)

export default readonly(isMobile)
