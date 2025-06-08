import { createRouter, createWebHistory } from 'vue-router'
import { HomeView } from '@/views'

const router = createRouter({
  history: createWebHistory(''),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
  
    
  ],
})

export default router
