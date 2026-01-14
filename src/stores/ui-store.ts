import { ref } from 'vue'
import { defineStore } from 'pinia'
import { jsToIsoWeekday } from '@/utils'

// Later can be broken down if grown too large
export const useUIStore = defineStore('ui', () => {
  // Header-related:
  const contentByDay = ref<boolean[]>([true, false, false, true, false, false, true])
  const activeTabIndex = ref<number>(jsToIsoWeekday(new Date().getDay()))

  return {
    contentByDay,
    activeTabIndex,
  }
})
