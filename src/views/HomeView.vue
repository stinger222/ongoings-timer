<script setup lang="ts">
import { CountdownCard } from '@/components/pages/schedule'
import type { CountdownCardProps } from '@/types';

const exampleProp: CountdownCardProps = {
  title: 'Монолог Фармацевта II',
  episodes: {
    total: 12,
    done: 5
  },
  imageUrl: "https://imgos.info/upload/anime/images/67818f1e1be05628995357.jpg",
  playerUrl: "https://google.com",
  nextReleaseAt: "2025-10-08T18:40:00.000Z"
}
</script>

<template>
  <CountdownCard :data="exampleProp" />
</template>
