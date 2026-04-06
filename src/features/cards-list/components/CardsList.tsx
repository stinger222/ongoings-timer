import { Card } from "@/entities/card/types";
import CardItem from "@/features/card-item/components/CardItem";

export default function CardsList({ cards }: { cards: Card[] }) {
  return (
    <div className="space-y-3">
      {
        cards.map(c => (
          // TODO: Refactor. Features should not dfepend on each other!!
          <CardItem card={c} key={c.id} />
        ))
      }
    </div>
  )
}