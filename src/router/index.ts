import { createRouter, createWebHistory } from 'vue-router'
import { WelcomeView, CardsListView } from '@/views'
import AddCardForm from '@/components/pages/add-card/AddCardForm.vue'

const router = createRouter({
  history: createWebHistory(''),
  routes: [
    {
      path: '/',
      name: 'welcome',
      component: WelcomeView,
    },
    {
      path: '/cards-list',
      name: 'cards-list',
      component: CardsListView,
    },
    {
      path: '/add-card',
      name: 'add-card',
      component: AddCardForm, // TODO: change to view, lol
    },  
  ],
})

export default router
