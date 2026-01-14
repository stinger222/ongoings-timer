import { createRouter, createWebHistory } from 'vue-router'
import { getCurrentUser } from 'vuefire'
import { CardsListView, WelcomeView } from '@/views'
import AddCardView from '@/views/AddCardView.vue'
import AppLayout from '@/layouts/AppLayout.vue'
import GuestLayout from '@/layouts/GuestLayout.vue'

const router = createRouter({
  history: createWebHistory(''),
  routes: [
    {
      path: '/',
      redirect: () => '/cards-list',
    },

    {
      path: '/login',
      component: GuestLayout,
      children: [
        { path: '', name: 'login', component: WelcomeView },
      ],
    },

    {
      path: '/',
      component: AppLayout,
      meta: { isProtected: true },
      children: [
        { path: 'cards-list', name: 'cards-list', component: CardsListView },
        { path: 'add-card', name: 'add-card', component: AddCardView },
      ],
    },
  ],
})

router.beforeEach(async (to, from) => {
  const user = await getCurrentUser()
  if (!user && to.meta.isProtected) {
    return { name: 'login' }
  }

  if (user && to.name === 'login') {
    return '/cards-list'
  }
})

export default router
