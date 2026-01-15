import { defineStore } from 'pinia'
import { useCurrentUser } from 'vuefire'

export const useAuthStore = defineStore('auth', () => {
  const currentUser = useCurrentUser()

  return { currentUser }
})