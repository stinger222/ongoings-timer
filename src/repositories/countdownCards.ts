import { useCollection } from 'vuefire'
import { countdownCardsRef } from '@/firebase/collections/countdownCards'
import type { CountdownCard } from '@/types'

// Repository now abstracts everything related to data fetching: shaping, query building, pagination - anything

export const useCountdownCards = () => {
  return useCollection<CountdownCard>(countdownCardsRef)
}