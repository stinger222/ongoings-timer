import { Card } from "@/entities/card/types";
import CardItem from "@/features/card-item/components/CardItem";
import { CardsList } from "@/features/cards-list";
import CreateCardFormWrapper from "@/features/create-card/components/CreateCardFormWrapper";
import { Suspense } from "react";

export default async function CardsListPage() {

  return (
    <div>
      <CreateCardFormWrapper />

      <Suspense fallback="Skeleton loading... for list">
        <CardsList renderItem={(card: Card) => <CardItem card={card}/>}/>
      </Suspense>
    </div>
  )
}