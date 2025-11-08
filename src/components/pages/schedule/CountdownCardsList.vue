<script setup lang="ts">
import { TransitionGroup } from 'vue'
import { useCollection } from 'vuefire'
import { deleteDoc, doc, updateDoc } from 'firebase/firestore'
import { Button } from '@/components/ui/button'
import { db } from '@/firebase'
import { countdownCardsRef } from '@/firebase/collections'
import type { CountdownCard as CountdownCardType } from '@/types'
import CountdownCard from './CountdownCard.vue'
import { increment } from 'firebase/firestore'

const { data: cards, pending: cardsPending, error: cardsError } = useCollection<CountdownCardType>(countdownCardsRef)

const handleDelete = async (card: CountdownCardType) => {
  try {
    await deleteDoc(doc(db, 'countdownCards', card.id))
    console.success('Card deleted!')
    cards.value = cards.value.filter((i) => i.id !== card.id)
  } catch (error) {
    console.error('Error deleting card: ', error)
  }
}

const handleIncrementWatched = async (card: CountdownCardType) => {
  if (card.episodes.done >= card.episodes.total) return
  const cardRef = await doc(db, 'countdownCards', card.id)
  try {
    await updateDoc(cardRef, { 'episodes.done': increment(1) })
  } catch (error) {
    console.error('Error incrementing watched:', error)
  }
}

const handleDecrementWatched = async (card: CountdownCardType) => {
  if (card.episodes.done <= 0) return
  const cardRef = await doc(db, 'countdownCards', card.id)
  try {
    await updateDoc(cardRef, { 'episodes.done': increment(-1) })
  } catch (error) {
    console.error('Error decrementing watched:', error)
  }
}
</script>

<template>
  <Button
    class="mb-2"
    @click="console.log(cards)"
  >
    log cards
  </Button>
  <div v-if="cardsPending">Loading...</div>
  <div v-else-if="cardsError">Error: {{ cardsError.message }}</div>
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
