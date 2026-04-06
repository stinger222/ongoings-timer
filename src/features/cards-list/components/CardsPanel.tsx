'use client'

import { Card } from "@/entities/card/types";
import { useCardsList } from "../hooks/useCardsList";
import CardsListControls from "./CardsListControls";
import CardsList from "./CardsList";
import { useSelectedDay } from "@/hooks/useSelectedDay";

export default function CardsPanel({ initialCards }: { initialCards: Card[] }) {
  const { cards, filter, setFilter, ascSort, setAscSort} = useCardsList({ initialCards })
  const { selectedDay, setSelectedDay} = useSelectedDay()

  return (
    <div className="space-y-3">
      selectedDay: {selectedDay}
      <CardsListControls
        filter={filter}
        setFilter={setFilter}
        ascSort={ascSort}
        setAscSort={setAscSort}
      />

      <CardsList cards={cards} />
    </div>
  )
}