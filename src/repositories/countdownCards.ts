import { addDoc } from 'firebase/firestore'
import { useCollection } from 'vuefire'
import { countdownCardsRef } from '@/firebase/collections/countdownCards'
import type { CountdownCard } from '@/types'

// Repository now abstracts everything related to data fetching/posting: shaping, query building, pagination - anything

export const useCountdownCards = () => {
  return useCollection<CountdownCard>(countdownCardsRef)
}

export async function createCountdownCard(payload: Omit<CountdownCard, 'id'>) {
  const docRef = await addDoc(countdownCardsRef, payload)
  return docRef.id
}