import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: HomeView },
    { path: '/weather', component: () => import('@/views/WeatherView.vue') },
    { path: '/cats', component: () => import('@/views/CatsView.vue') },
    { path: '/posts', component: () => import('@/views/PostsView.vue') },
  ]
})

export default router