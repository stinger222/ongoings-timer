import { Card } from "@/entities/card/types";
import { useState } from "react";

interface Params {
  initialCards: Card[]
}

export const useCardsList = ({ initialCards }: Params) => {
  const [filter, setFilter] = useState<string>('')
  const [cards, setCards] = useState<Card[]>(initialCards || [])
    const [ascSort, setAscSort] = useState(false)


  return {
    filter,
    setFilter,
    cards,
    setCards,
    ascSort,
    setAscSort
  }
}