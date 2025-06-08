<script setup lang="ts">
// import { Header } from '@/components/shared'
import { Toaster } from '@/components/ui'
</script>

<template>
  <!-- <Header /> -->

  <div class="max-w-[1920px] mx-auto px-4 mt-5">
    <RouterView />
  </div>

  <Toaster
    rich-colors
    position="top-right"
    :toast-options="{
      style: {
        'margin-top': '45px',
        'pointer-events': 'auto'
      },
    }"
  />
</template>
