<script setup lang="ts">
import { ref } from 'vue'
import { Menu } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useUIStore } from '@/stores'
import { jsToIsoWeekday } from '@/utils'
import { useAuth } from '@/composables'

const days = [
  { short: 'M', full: 'Monday' },
  { short: 'T', full: 'Tuesday' },
  { short: 'W', full: 'Wednesday' },
  { short: 'T', full: 'Thursday' },
  { short: 'F', full: 'Friday' },
  { short: 'S', full: 'Saturday' },
  { short: 'S', full: 'Sunday' },
]

const uiStore = useUIStore()
const auth = useAuth()
const today = ref(jsToIsoWeekday(new Date().getDay()))
</script>

<template>
  <header class="flex items-center justify-between px-3 py-4 mb-3 border-b border-border">
    <div class="flex items-center gap-1">
      <Button
        v-for="(day, index) in days"
        :key="`nav-btn-${index}`"
        size="sm"
        :variant="uiStore.activeTabIndex === index ? 'default' : 'ghost'"
        class="relative w-9 h-9 p-0 text-sm font-medium focus-visible:ring-0 focus-visible:shadow-md"
        :title="day.full"
        @click="uiStore.activeTabIndex = index"
      >
        {{ day.short }}

        <!-- Current day of the week indicator (top) -->
        <span
          v-if="index === today"
          class="absolute top-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
          :class="uiStore.activeTabIndex === today ? 'bg-primary-foreground' : 'bg-primary'"
        />

        <!-- Has content indicator (bottom) -->
        <span
          v-if="uiStore.contentByDay[index]"
          class="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
          :class="uiStore.activeTabIndex === index ? 'bg-primary-foreground' : 'bg-primary'"
        />
      </Button>
    </div>

    <DropdownMenu>
      <DropdownMenuTrigger as-child>
        <Button
          variant="ghost"
          size="icon"
          class="h-9 w-9"
        >
          <Menu class="h-4 w-4" />
          <span class="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuItem disabled>Settings</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem disabled>About</DropdownMenuItem>
        <DropdownMenuItem @click="auth.signOut">Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </header>
</template>
