<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { collection, addDoc } from 'firebase/firestore'
import { getApp } from 'firebase/app'

import { Button } from '@/components/ui/button'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { db } from '@/firebase'



const formSchema = toTypedSchema(z.object({
  title: z.string().min(3),
  imageUrl: z.string().min(3),
  playerUrl: z.string().min(3),
  episodes: z.object({
    total: z.number().min(0),
    done: z.number().min(0),
  }),
  nextRelease: z.object({
    dayOfWeek: z.number().min(0).max(6),
    time: z.string().min(3),
  }),
}))

const form = useForm({
  validationSchema: formSchema,
  initialValues: {
    title: `title ${Math.random() * 10}`,
    imageUrl: 'https://img.yani.tv/posters/huge/1636845534.avif',
    playerUrl: 'https://site.yummyani.me/catalog/item/molchalivaya-vedma-tayna-molchalivoy-kolduni',
    episodes: {
      total: 12,
      done: 5,
    },
    nextRelease: {
      dayOfWeek: 3,
      time: '23:50',
    },
  },
})

const onSubmit = form.handleSubmit(async (values) => {
  console.log('Form submitted!', values)

  try {
    const docRef = await addDoc(collection(db, 'countdownCards'), values)
    console.success('Document written with ID: ', docRef.id)
  } catch (e) {
    console.error('Error adding document: ', e)
  }
})
</script>

<template>
  <form @submit.prevent="onSubmit" class="form">
    <FormField v-slot="{ componentField }" name="title">
      <FormItem>
        <FormLabel>Title</FormLabel>
        <FormControl>
          <Input type="text" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="imageUrl">
      <FormItem>
        <FormLabel>Image URL</FormLabel>
        <FormControl>
          <Input type="text" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="playerUrl">
      <FormItem>
        <FormLabel>Player URL</FormLabel>
        <FormControl>
          <Input type="text" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="episodes.total">
      <FormItem>
        <FormLabel>Total Episodes</FormLabel>
        <FormControl>
          <Input type="number" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="episodes.done">
      <FormItem>
        <FormLabel>Episodes Done</FormLabel>
        <FormControl>
          <Input type="number" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="nextRelease.dayOfWeek">
      <FormItem>
        <FormLabel>Next Release Day</FormLabel>
        <Select v-bind="componentField">
          <FormControl>
            <SelectTrigger>
              <SelectValue placeholder="Select a day" />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            <SelectGroup>
              <SelectItem :value="0">Sunday</SelectItem>
              <SelectItem :value="1">Monday</SelectItem>
              <SelectItem :value="2">Tuesday</SelectItem>
              <SelectItem :value="3">Wednesday</SelectItem>
              <SelectItem :value="4">Thursday</SelectItem>
              <SelectItem :value="5">Friday</SelectItem>
              <SelectItem :value="6">Saturday</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="nextRelease.time">
      <FormItem>
        <FormLabel>Next Release Time</FormLabel>
        <FormControl>
          <Input type="time" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <Button type="submit">Submit</Button>
  </form>
</template>

<style scoped>
.form {
  display: grid;
  gap: 1rem;
  max-width: 400px;
}
</style>
