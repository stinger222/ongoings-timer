<script setup lang="ts">
import { useCurrentUser } from 'vuefire'
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth'
import { Button } from '@/components/ui/button'
import { useCurrentElement } from '@vueuse/core'

const auth = getAuth()
const user = useCurrentUser()
</script>

<template>
  <template v-if="user">
    Welcome, {{ user.displayName }}!
    <br />
    <Button @click="signOut(auth)">SignOut</Button>
  </template>
  <template v-else>
    <Button @click="signInWithPopup(auth, new GoogleAuthProvider())">SignIn</Button>
  </template>
</template>

<style scoped></style>
