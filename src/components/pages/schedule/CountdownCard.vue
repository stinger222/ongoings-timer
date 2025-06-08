<script setup lang="ts">
import type { CountdownCardProps } from '@/types';

const porps = defineProps<{data: CountdownCardProps}>()
</script>

<template>
  <div class="border rounded-xl border-black p-1 flex gap-3 h-[250px] max-h-[250px] max-w-[800px] mx-auto">
    <div>
      <img :src="data.imageUrl" class="max-w-[100%] max-h-[100%] rounded-[10px]"/>
       <!-- <div class="w-[180px] h-full rounded-md bg-red-200"></div> -->
    </div>
    <div class="grow">
      <header class="flex justify-between">
        <span class="truncate">{{ data.title }}</span>
        <div>
          <span>1</span>
          <span>1</span>
          <span>1</span>
          <!-- Controls -->
        </div>
      </header>
    </div>
  </div>
</template>