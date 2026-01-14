<script setup lang="ts">
import { ref } from "vue"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Menu } from "lucide-vue-next"

const days = [
  { short: "M", full: "Monday" },
  { short: "T", full: "Tuesday" },
  { short: "W", full: "Wednesday" },
  { short: "T", full: "Thursday" },
  { short: "F", full: "Friday" },
  { short: "S", full: "Saturday" },
  { short: "S", full: "Sunday" },
]

interface Props {
  /** Array of booleans indicating if each day has content */
  contentByDay?: boolean[]
}

const props = withDefaults(defineProps<Props>(), {
  contentByDay: () => [true, false, true, false, true, true],
})

const selectedDay = ref<number | null>(null)

const today = ref((new Date().getDay() + 6) % 7)
</script>

<template>
  <header class="flex items-center justify-between px-3 py-4 mb-3 border-b border-border">
    <div class="flex items-center gap-1">
      <Button
        v-for="(day, index) in days"
        :key="`nav-btn-${index}`"
        size="sm"
        :variant="selectedDay === index ? 'default' : 'ghost'"
        class="relative w-9 h-9 p-0 text-sm font-medium focus-visible:ring-0 focus-visible:shadow-md"
        :title="day.full"
        @click="selectedDay = index"
      >
        {{ day.short }}

        <span
          v-if="props.contentByDay[index]"
          class="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
          :class="
            selectedDay === index
              ? 'bg-primary-foreground'
              : 'bg-primary'
          "
        />

        <span
          v-if="index === today"
          class="absolute top-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
          :class="
            selectedDay === today
              ? 'bg-primary-foreground'
              : 'bg-primary'
          "
        />

      </Button>
    </div>

    <DropdownMenu>
      <DropdownMenuTrigger as-child>
        <Button variant="ghost" size="icon" class="h-9 w-9">
          <Menu class="h-4 w-4" />
          <span class="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuItem>Settings</DropdownMenuItem>
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Calendar</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Help</DropdownMenuItem>
        <DropdownMenuItem>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </header>
</template>
