import { ref, watch, readonly } from 'vue'

const windowWidth = ref<number>(window.innerWidth)

window.addEventListener('resize', () => {
  windowWidth.value = window.innerWidth
})

const isMobile = ref<boolean>(windowWidth.value < 768)

watch(
  () => windowWidth.value,
  () => {
    isMobile.value = (windowWidth.value < 768)
  },
)

export default readonly(isMobile)
