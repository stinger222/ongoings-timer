<script setup lang="ts">
import { collection, updateDoc, deleteDoc, doc } from 'firebase/firestore'
import { useFirestoreFetch } from '@/composables'
import { db } from '@/firebase'
import CountdownCard from './CountdownCard.vue'
import { TransitionGroup } from 'vue'
import { Button } from '@/components/ui/button'
import type { CountdownCard as CountdownCardType } from '@/types'

// TODO: Type
const { data: cards, loading, error } = useFirestoreFetch<any>(collection(db, 'countdownCards'))

const handleDelete = async (id: string) => {
  try {
    await deleteDoc(doc(db, 'countdownCards', id))
    console.success("Card deleted!")
    cards.value = cards.value.filter(card => card.id !== id)
  } catch (error) {
    console.error("Error deleting card: ", error)
  }
}

// TODO: Add type cards and stuff
const handleIncrementWatched = async (id: string, updates: object) => {
  // try {
  //   const response = await updateDoc(doc(db, 'countdownCards', id), updates)
  //   console.success("Watched episodes decremented! response: ", response )
  //   const updatedCard = cards.value.find(card => card.id === id)
  // } catch (error) {
  //   console.error("Error while decrementing watched episodes: ", error)
  // }
}

const handleDecrementWatched = async (id: string, updates: Partial<CountdownCardType>)  => {

}
</script>

<template>
  <Button class="mb-2" @click="console.log(cards)">log cards</Button>
  <div v-if="loading">Loading...</div>
  <div v-else-if="error">Error: {{ error.message }}</div>
  <TransitionGroup
    v-else
    name="card"
    tag="div"
    class="space-y-2"
  >
    <CountdownCard
      v-for="card in cards"
      :data="card"
      :key="card.id"
      @delete="handleDelete"
      @increment-watched="handleIncrementWatched"
      @decrement-watched="handleDecrementWatched"
    />
  </TransitionGroup>
</template>

<style scoped>
.card-leave-active {
  transition-property: opacity, transform, max-height;
  transition-duration: 0.3s, 0.3s, 0.2s;
  transition-delay: 0s, 0s, 0.3s;
  max-height: 250px;
  overflow: hidden;
}

.card-leave-to {
  opacity: 0;
  transform: translateX(100px);
  max-height: 0;
}
</style>