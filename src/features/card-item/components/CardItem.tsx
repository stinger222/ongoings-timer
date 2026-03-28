import { Card } from "@/entities/card/types"

interface Props {
  card: Card
}
export default function CardItem({ card }: Props) {
  return (
    <div className="border">
      title: {card.title}
    </div>
  )
} 