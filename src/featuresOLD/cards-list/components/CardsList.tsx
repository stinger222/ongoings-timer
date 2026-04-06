'use client'

import CardsListControls from "./CardsListControls";
import React from "react";
import CardItem from "@/featuresOLD/card-item/components/CardItem";
interface Props {
  extraControls?:  React.ReactNode
}

export default function CardsList({ extraControls }: Props) {

  return (
    <div className="space-y-5 px-2">
      <h2 className="font-bold w-215 mx-auto text-2xl">CardsList</h2>

      {/* List wrapper */}
      <div className="w-215 mx-auto space-y-2">
        <CardsListControls extraControls={extraControls} />

        <div className="gap-5 flex flex-col">
          {cards.map(card => (
            <React.Fragment key={`card-item-${card.id}`}>
              <CardItem card={card}/>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};
