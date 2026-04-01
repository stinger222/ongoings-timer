'use client' // Temp!
import { Button } from "@/components/ui/button"
import { Card } from "@/entities/card/types"
import { MinusIcon, MoreVerticalIcon, PlusIcon } from "lucide-react"
import Image from "next/image"

interface Props {
  card: Card
}
export default function CardItem({ card }: Props) {

  const parseDateToCountdown = (targetDate: Date) => {
    const now = new Date();
    // Calculate total difference in milliseconds
    const diff = targetDate.getTime() - now.getTime();

    // past dates
    if (diff <= 0) {
      return { days: 0, hours: 0, mins: 0, secs: 0 };
    }

    const seconds = Math.floor((diff / 1000) % 60);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    return { days, hours, mins: minutes, secs: seconds };
  };
  const [countdown, setCountdown] = useState(parseDateToCountdown(new Date(card.next_episode_at)))

  useEffect(() => {
    const x =setInterval(() => {
      setCountdown(parseDateToCountdown(new Date(card.next_episode_at )))
    }, 1000)

    return () => {
      clearInterval(x)
    }
  })

  return (
    <div className="w-215 h-60 border rounded-md overflow-hidden shadow-[-3px_4px_10px_0_rgba(0,0,0,0.25)] flex  ">
      <Image
        src={`/api/images/${card.image_key}`}
        alt="Ado-san :з"
        width={300}
        height={580}
        sizes="100vw"
        // sizes="(max-width: 768px) 100vw, 600px"
        className="object-cover aspect-5/7 w-auto h-full"
        quality={100}
        loading="eager"
      />

      <div className="p-5 grow gap-2 flex items-center justify-evenly">
        <div className="grow-5 shrink-0 basis-0 min-w-auto flex flex-col items-start">
          <span className="mb-2 text-xl font-semibold text-center">Fate/Strangfe Fake I</span>
          <span className="text-[#9494a2] flex items-center gap-2.5">
            <Button
              variant={"ghost"}
              className="px-1 text-inherit hover:text-[#5e5e6e]"
              onClick={() => console.log('- clicked!')}
            >
              <MinusIcon className="size-4.5"/>
            </Button>
            <span className="text-xl font-mono tracking-widest">6/12</span>
            <Button
              variant={"ghost"}
              className="px-1 text-inherit hover:text-[#5e5e6e]"
              onClick={() => console.log('+ clicked!')}
            >
              <PlusIcon className="size-4.5"/>
            </Button>
          </span>
        </div>
        <div className="grow-5 basis-0">
          <span className="text-4xl font-mono font-semibold tracking-wide">
            {/* 03:13:59:39 */}
            {countdown.days}:
            {countdown.hours}:
            {countdown.mins}:
            {countdown.secs}
          </span>
        </div>
        <div>
          <TestDD trigger={
            <Button variant='ghost'>
              <MoreVerticalIcon className="focus-within:outline-0"/>
            </Button>
          }/>
        </div>
      </div>
    </div>
  )
}

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ReactElement, useEffect, useState } from "react"

function TestDD({trigger}: {trigger: ReactElement}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={trigger}>
        Open
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuItem>Delete</DropdownMenuItem>
          <DropdownMenuItem>Edit</DropdownMenuItem>
          <DropdownMenuItem disabled>Archive (?)</DropdownMenuItem>
        </DropdownMenuGroup>
        {/* <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>Team</DropdownMenuItem>
          <DropdownMenuItem>Subscription</DropdownMenuItem>
        </DropdownMenuGroup> */}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}