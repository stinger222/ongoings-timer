<script setup lang="ts">
import { useFirestoreFetch } from '@/composables';
import { db } from '@/services/firebase';
import { collection, getDocs } from 'firebase/firestore';
import CountdownCard from './CountdownCard.vue';

const {
  data: cards,
  loading,
  error,
  refresh,
} = useFirestoreFetch<any>(collection(db, 'countdownCards'))
</script>

<template>
<div v-if="loading">Loading...</div>
  <div v-else-if="error">Error: {{ error.message }}</div>
  <template v-else>
     <CountdownCard v-for="card in cards" :data="card" :key="card.id" />
  </template>
</template>