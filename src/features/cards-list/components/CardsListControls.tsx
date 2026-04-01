'use client'

import { Button } from "@/components/ui/button"
import { Field } from "@/components/ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import { SearchIcon, SortAscIcon, SortDescIcon } from "lucide-react"
import { useState } from "react"

export default function CardsListControls() {
  // TODO: Save current controls to LS
  const [ascSort, setAscSort] = useState(false)
  return (
    <div className="space-x-3 flex">
      <Field className="shadow-sm">
        <InputGroup className="border-zinc-300 rounded-sm">
          {/* TODO: Placeholders rotation */}
          <InputGroupInput id="cards-search-filter" placeholder="Fate/Strange Fake II"/> 
          <InputGroupAddon align="inline-end">
            <SearchIcon />
          </InputGroupAddon>
        </InputGroup>
      </Field>

      <Button onClick={() => setAscSort(prev => !prev)}>
        {ascSort ? <SortDescIcon /> :  <SortAscIcon />}
      </Button>
    </div>
  )
}
