import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  linkActiveClass: 'active',
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/cities', name: 'cities', component: () => import('../views/YourCitiesView.vue') },
    { path: '/map', name: 'map', component: () => import('../views/WorldMapView.vue') },
    { path: '/actions', name: 'actions', component: () => import('../views/YourActionsView.vue') },
    { path: '/user', name: 'user', component: () => import('../views/ProfileView.vue') },
  ]
})

export default router
