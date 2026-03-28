'use server'

import { db } from "@/database/drizzle";
import { cards } from "@/database/schema";
import { Card } from "@/entities/card/types";

export async function getCards() {
  return await db.query.cards.findMany()
}

export async function insetMockCards() {
  return await db.insert(cards).values({title: "test title!!"})
}

