import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('@/views/HomeView/HomeView.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'ErrorView',
      component: () => import('@/views/NotFoundView/NotFound.vue'),
  }
  ]
})

export default router
