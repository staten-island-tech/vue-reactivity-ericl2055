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
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/SavedBuilds.vue')
  }
]

JSON.parse(localStorage.getItem('builds')).forEach((build) =>
  activeRoutes.push({
    path: `/${build.name}`,
    name: build.name,
    component: () => import('../views/SavedBuilds.vue')
  })
)

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: activeRoutes
})

export default router
