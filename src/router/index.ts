import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/home/HomeView.vue')
    },
    {
      path: '/blog',
      name: 'blog',
      component: () => import('@/views/blog/Blog.vue'),
    },
    {
      path: '/blog/:slug',
      name: 'post',
      component: () => import('@/views/post/Post.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      name: '404',
      component: () => import('@/views/404/NotFound.vue'),
    },
  ]
})

export default router
