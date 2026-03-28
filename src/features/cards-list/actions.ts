'use server'

import { db } from "@/database/drizzle";
import { cards } from "@/database/schema";

export async function getCards() {
  try {
    return await db.query.cards.findMany()
  } catch(error) {
    console.error(error)
    return []
  }
}

export async function insetMockCards() {
  try {
    return await db.insert(cards).values({title: "test title!!"})
  } catch(error) {
    console.error(error)
  }
}

