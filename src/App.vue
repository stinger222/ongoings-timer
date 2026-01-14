<script setup lang="ts">
import { Header } from '@/components/shared'
import { Toaster } from '@/components/ui'
</script>

<template>
  <!-- This RouterView will render layouts provided by router -->
  <RouterView />

  <Toaster
    rich-colors
    position="top-right"
    :toast-options="{
      style: {
        'margin-top': '45px',
        'pointer-events': 'auto',
      },
    }"
  />
</template>
