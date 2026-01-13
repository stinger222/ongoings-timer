import { collection } from 'firebase/firestore'
import { db } from '@/firebase'

export const countdownCardsRef = collection(db, 'countdownCards')
