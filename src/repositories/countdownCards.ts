import { useCollection, } from 'vuefire'
import { addDoc, where, query } from 'firebase/firestore'
import { countdownCardsRef } from '@/firebase/collections/countdownCards'
import type { CountdownCard } from '@/types'
import { serverTimestamp } from 'firebase/database'
import { useAuthStore } from '@/stores'

// Repository now abstracts everything related to data fetching/posting: shaping, query building, pagination - anything

// Query only cards that belong to the current user.
// Backend will further validate passed ownerId to prevent vulnerabilities
export const useCountdownCards = () => {
  const authStore = useAuthStore()

  const q = query(countdownCardsRef, where('ownerId', '==', authStore.currentUser.uid))
  return useCollection<CountdownCard>(q,  { ssrKey: 'countdown-cards-query' })
}

export  const createCountdownCard = async (payload: Omit<CountdownCard, 'id'>) => {
    const authStore = useAuthStore()

  const docRef = await addDoc(countdownCardsRef, {
    ...payload,
    ownerId: authStore.currentUser.uid,
    createdAt: serverTimestamp(),
  })
  return docRef
}
