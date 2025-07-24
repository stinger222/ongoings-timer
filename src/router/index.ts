import { createRouter, createWebHistory } from 'vue-router'
import { HomeView } from '@/views'
import AddCardForm from '@/components/pages/add-card/AddCardForm.vue'

const router = createRouter({
  history: createWebHistory(''),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/add-card',
      name: 'add-card',
      component: AddCardForm,
    },
  
    
  ],
})

export default router
