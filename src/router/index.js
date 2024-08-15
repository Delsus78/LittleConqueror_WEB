import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useAuthStore } from '@/stores/index.js'

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  linkActiveClass: 'active',
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/cities', name: 'cities', component: () => import('../views/YourCitiesView.vue') },
    { path: '/map', name: 'map', component: () => import('../views/WorldMapView.vue') },
    { path: '/actions', name: 'actions', component: () => import('../views/YourActionsView.vue') },
    { path: '/user', name: 'user', component: () => import('../views/ProfileView.vue') },
    { path: '/login', name: 'login', component: () => import('../views/LoginView.vue') },
    { path: '/register', name: 'register', component: () => import('../views/RegisterView.vue') },
    { path: '/forgot-password' , name: 'forgot-password', component: () => import('../views/ForgotPasswordView.vue') },
  ]
})

router.beforeEach((to, from, next) => {
  const { isAuthenticated, user } = useAuthStore()
  const publicPages = ['/login','/register','/rules','/forgot-password'];
  const authRequired = !publicPages.includes(to.path);

  if (authRequired && !isAuthenticated) {
    console.log('not authenticated')
    next({name: 'login'})
  } else {
    next()
  }
})

