'use server'
import { db } from "@/lib/database/drizzle"

export const  getInitialCards = async () => {
 await new Promise(r => setTimeout(r, 500))

  try {
    const rawCards = (await db.query.cards.findMany()).sort((a,b) => +b.created_at - +a.created_at)

    return rawCards.map(card => ({
      ...card,
      next_episode_at: 1846179178982
    }))

  } catch(error) {
    console.error(error)
    return []
  }
}