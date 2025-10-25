<script setup lang="ts">
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore'
import { useFirestoreFetch } from '@/composables'
import { db } from '@/services/firebase'
import CountdownCard from './CountdownCard.vue'

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
</script>

<template>
  <div v-if="loading">Loading...</div>
  <div v-else-if="error">Error: {{ error.message }}</div>
  <template v-else>
    <CountdownCard
      v-for="card in cards"
      :data="card"
      :key="card.id"
      @delete="handleDelete"
    />
  </template>
</template>
