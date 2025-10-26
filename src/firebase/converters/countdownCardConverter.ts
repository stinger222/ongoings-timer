import { type FirestoreDataConverter } from 'firebase/firestore'
import type { CountdownCard } from '@/types'

export const countdownCardConverter: FirestoreDataConverter<CountdownCard> = {
  toFirestore(card) {
    return {
      ...card,
    }
  },
  fromFirestore(snapshot, options) {
    const data = snapshot.data(options)
    return data as CountdownCard
    // return { id: snapshot.id, ...data } as CountdownCard
  },
}
