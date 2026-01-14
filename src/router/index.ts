import { createRouter, createWebHistory } from 'vue-router'
import { getCurrentUser, useCurrentUser } from 'vuefire'
import { CardsListView, WelcomeView } from '@/views'
import AddCardView from '@/views/AddCardView.vue'

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
      component: AddCardView,
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
