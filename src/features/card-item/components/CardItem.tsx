import { Card } from "@/entities/card/types"
import Image from "next/image"

interface Props {
  card: Card
}
export default function CardItem({ card }: Props) {
  return (
    <div className="border">
      {/* title: {card.title} */}
      {/* {card.title.substring(0, 1000)} */}
      {/* <Image width={0} height={0} src={`http://localhost:3003/${card.title}`} alt="Ado-san :з" style={{ width: '300px', height: 'auto' }}/> */}
      <img src={`http://localhost:3000/api/images/${card.image_key}`} alt="Ado-san :з" style={{ width: '300px', height: 'auto' }}/>
    </div>
  )
} 