import { Card } from "@/entities/card/types";
import { getCards } from "../actions";
import CardsListControls from "./CardsListControls";
import React from "react";

interface Props {
  renderItem: (card: Card) => React.ReactNode
}

// Using render prop approach we can ensure that 
// CardsList dosn't depend on card-item feature
// It just says that it's gonna pass object of type Card into renderItem
export default async function CardsList({ renderItem }: Props) {
  await new Promise(r => setTimeout(r, 300))

  const cards = await getCards()

  return (
    <div className="space-y-5 px-2">
      <h2 className="font-bold text-2xl">CardsList</h2>
      <CardsListControls />

      <div className="space-y-2">
        {cards.map(card => (
          <React.Fragment key={`card-item-${card.id}`}>
            { renderItem(card) }
          </React.Fragment>
        ))}
      </div>

    </div>
  );
};

