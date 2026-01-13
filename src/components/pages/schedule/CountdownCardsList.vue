<script setup lang="ts">
import { TransitionGroup } from 'vue'
import { deleteDoc, doc, increment, updateDoc } from 'firebase/firestore'
import { Button } from '@/components/ui/button'
import { db } from '@/firebase'
import { useCountdownCards } from '@/repositories'
import type { CountdownCard as CountdownCardType } from '@/types'
import CountdownCard from './CountdownCard.vue'

const handleDelete = async (card: CountdownCardType) => {
  try {
    await deleteDoc(doc(db, 'countdownCards', card.id))
    console.success('Card deleted!')
  } catch (error) {
    console.error('Error deleting card: ', error)
  }
}

const handleIncrementWatched = async (card: CountdownCardType) => {
  if (card.episodes.done >= card.episodes.total) return
  const cardRef = doc(db, 'countdownCards', card.id)
  try {
    await updateDoc(cardRef, { 'episodes.done': increment(1) })
  } catch (error) {
    console.error('Error incrementing watched:', error)
  }
}

const handleDecrementWatched = async (card: CountdownCardType) => {
  if (card.episodes.done <= 0) return
  const cardRef = doc(db, 'countdownCards', card.id)
  try {
    await updateDoc(cardRef, { 'episodes.done': increment(-1) })
  } catch (error) {
    console.error('Error decrementing watched:', error)
  }
}

const { data, pending, error } = useCountdownCards()
</script>

<template>
  <Button
    class="mb-2"
    @click="console.log(data)"
  >
    log cards
  </Button>

  <div v-if="pending">Loading...</div>

  <div v-else-if="error">Error: {{ error.message }}</div>

  <!-- TransitionGroup for unmount animation -->
  <TransitionGroup
    v-else
    name="card"
    tag="div"
    class="space-y-2"
  >
    <CountdownCard
      v-for="card in data"
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
