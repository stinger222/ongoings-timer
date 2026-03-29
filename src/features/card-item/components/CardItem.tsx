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
      <div>id: {card.id}</div>
      <div>image_key: {card.image_key}</div>
      <div>title: {card.title}</div>
      <div>player_url: {card.player_url }</div>
      <div>episodes_total: {card.episodes_total}</div>
      <div>episodes_watched: {card.episodes_watched}</div>
      <div>release_day_of_week: {card.release_day_of_week}</div>
      <div>release_time: {card.release_time}</div>
      <div>updated_at: {card.updated_at.toString()}</div>
      <div>created_at: {card.created_at.toString()}</div>
      <div>next_episode_at: {card.next_episode_at}</div>
    </div>
  )
} 