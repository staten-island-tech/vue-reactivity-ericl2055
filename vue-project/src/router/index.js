import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

let activeRoutes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/new',
    name: 'new',
    component: () => import('../views/SavedBuilds.vue')
  },
  {
    path: '/build/:name',
    name: 'build',
    component: () => import('../views/SavedBuilds.vue')
  }
]
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: activeRoutes
})

export default router
