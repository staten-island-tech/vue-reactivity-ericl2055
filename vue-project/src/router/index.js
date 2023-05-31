import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

let getBuilds = localStorage.getItem('builds')
if (getBuilds === undefined || getBuilds === '' || getBuilds === null) {
  getBuilds = []
  localStorage.setItem('builds', JSON.stringify(getBuilds))
}

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
  }
]

JSON.parse(localStorage.getItem('builds')).forEach((build) =>
  activeRoutes.push({
    path: `/${build.name}`,
    name: `${build.name}|custom`,
    component: () => import('../views/SavedBuilds.vue')
  })
)

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: activeRoutes
})

export default router
