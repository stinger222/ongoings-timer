import { createFetch } from '@vueuse/core'

export const useAppFetch = createFetch({
  baseUrl: import.meta.env.VITE_APP_BASE_API,
  fetchOptions: {
    mode: 'cors',
  },
  options: {
    beforeFetch() {
      if (!import.meta.env.VITE_APP_BASE_API) {
        console.error('⚠️ Не указан домен бекенда в переменной окружения VITE_APP_BASE_API!')
      }
    },
  },
})
