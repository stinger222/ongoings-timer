import { createRouter, createWebHistory } from 'vue-router'
import { getCurrentUser, useCurrentUser } from 'vuefire'
import AddCardForm from '@/components/pages/add-card/AddCardForm.vue'
import { CardsListView, WelcomeView } from '@/views'

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
      meta: { isProtected: true },
    },
    {
      path: '/add-card',
      name: 'add-card',
      component: AddCardForm, // TODO: change to view, lol
      meta: { isProtected: true },
    },
  ],
})

router.beforeEach(async (to, from) => {
  const user = await getCurrentUser()
  if (!user && to.meta.isProtected) {
    return { name: 'welcome' }
  }
})

export default router
