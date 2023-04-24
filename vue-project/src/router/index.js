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

// import caseFan from '../data/case-fan.json'
// import case from '../data/case.json'
// import cpu-cooler from '../data/cpu-cooler.json'
// import cpu from '../data/cpu.json'
// import externalHardDrive from '../data/external-hard-drive.json'
// import fanController from '../data/fan-controller.json'
// import headphones from '../data/headphones.json'
// import internalHardDrive from '../data/internal-hard-drive.json'
// import keyboard from '../data/keyboard.json'
// import memory from '../data/memory.json'
// import monitor from '../data/monitor.json'
// import motherboard from '../data/motherboard.json'
// import mouse from '../data/mouse.json'
// import opticalDrive from '../data/optical-drive.json'
// import powerSupply from '../data/power-supply.json'
// import soundCard from '../data/sound-card.json'
// import speakers from '../data/speakers.json'
// import thermalPaste from '../data/thermal-paste.json'
// import ups from '../data/ups.json'
// import videoCard from '../data/video-card.json'
// import wiredNetworkCard from '../data/wired-network-card.json'
// import wirelessNetworkCard from '../data/wireless-network-card.json'
