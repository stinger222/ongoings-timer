<script setup lang="ts">
import type { CountdownCardProps } from '@/types';

const porps = defineProps<{data: CountdownCardProps}>()

const handleMarkAsWatched = (id) => {

} 
const handleMarkAsUnwatched = (id) => {

} 
const handleRemove = (id) => {

} 
const handleEdit = (id) => {

} 

const mapWeekDayIndexToTitle: Record<number, string> = {
  0: 'Sunday',
  1: 'Monday',
  2: 'Tuesday',
  3: 'Wednesday',
  4: 'Thursday',
  5: 'Friday',
  6: 'Saturday',
}

</script>

<template>
  <div class="border rounded-xl border-black p-1 flex gap-3 h-[250px] max-h-[250px] max-w-[800px] mx-auto">
    <div>
      <template v-if="(data.imageUrl)">
        <img :src="data.imageUrl" class="max-w-[100%] max-h-[100%] rounded-[10px]"/>
      </template>
      <template v-else>
        <div class="w-[180px] h-full rounded-md bg-red-200"></div>
      </template>
    </div>
    <div class="grow flex flex-col justify-around py-16">
      <header class="flex justify-between">
        <span class="max-w-[400px] truncate">{{ data.title }}</span>
        <div class="space-x-2">
          <button @click="() => handleMarkAsWatched(data.id)" class="rounded bg-zinc-200 px-2">+</button>
          <button @click="() => handleMarkAsUnwatched(data.id)" class="rounded bg-zinc-200 px-2">-</button>
          <button @click="() => handleRemove(data.id)" class="rounded bg-zinc-200 px-2">Remove</button>
          <button @click="() => handleEdit(data.id)" class="rounded bg-zinc-200 px-2">Edit</button>
          <!-- Controls -->
        </div>
      </header>
      <div>
        Done: {{ data.episodes.done }} out of {{ data.episodes.total }} 
      </div>
      <div>
        Next episode is on {{ mapWeekDayIndexToTitle[data.nextRelease.dayOfWeek]}} at {{ data.nextRelease.time }}
      </div>
    </div>
  </div>
</template>