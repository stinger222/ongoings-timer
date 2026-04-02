import { Card } from "@/entities/card/types";
import { getCards } from "../actions";
import CardsListControls from "./CardsListControls";
import React from "react";

interface Props {
  renderItem: (card: Card) => React.ReactNode
  extraControls?:  React.ReactNode
  search?: string
}

// Using render prop approach we can ensure that 
// CardsList dosn't depend on card-item feature
// It just says that it's gonna pass object of type Card into renderItem
export default async function CardsList({ renderItem, extraControls, search }: Props) {
  // await new Promise(r => setTimeout(r, 300))
  // TODO: Handle error. Can suspense render error messages as well?
  const cards = await getCards()

  return (
    <div className="space-y-5 px-2">
      <h2 className="font-bold w-215 mx-auto text-2xl">CardsList</h2>

      {/* List wrapper */}
      <div className="w-215 mx-auto space-y-2">
        <CardsListControls extraControls={extraControls} /> {/* Props drilling suka is my life blyat' */}

        <div className="gap-5 flex flex-col">
          {cards.map(card => (
            <React.Fragment key={`card-item-${card.id}`}>
              { renderItem(card) }
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

