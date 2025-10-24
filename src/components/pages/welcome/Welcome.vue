<script setup lang="ts">
import { Button } from '@/components/ui/button';
import { useAuth } from '@/composables/useAuth';

  const { user, signIn, signOut } = useAuth()
</script>

<template>
  <template v-if="user">
    Welcome, {{ user.displayName }}!
    <br/>
    <Button @click="signOut">SignOut</Button>
  </template>
  <template v-else>
    <Button @click="signIn">SignIn</Button>
  </template>
</template>

<style scoped>
</style>
