'use server'
import { db } from "@/lib/database/drizzle";
import { cards } from "@/lib/database/schema";
import { s3 } from "@/lib/storage/s3";

import {  PutObjectCommand } from "@aws-sdk/client-s3"
import { eq } from "drizzle-orm";

export async function deleteCard(id: string) {
  try {
    await db.delete(cards).where(eq(cards.id, id))
  } catch(error) {
    console.error(error)
  }
}

export async function getCards() {
  console.log("938492084")
  // console.log("FILTER: ", filter)
  try {
    const rawCards = (await db.query.cards.findMany()).sort((a,b) => +b.created_at - +a.created_at)

    return rawCards.map(card => ({
      ...card,
      next_episode_at: 1849179178982
    }))

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

// type CreateCardParams = Omit<Card, "updated_at" | "created_at" | "id">
export async function createCard(formData: FormData) {
  try {
    const title = formData.get("title") as string
    const cover = formData.get("cover") as File | null

    let imageKey: string | null = null

    if (cover && cover.size > 0) {
      const buffer = Buffer.from(await cover.arrayBuffer())
      imageKey = `cover_${Math.random().toString().substring(2, 10)}`
      console.log("imageKey", imageKey)

      await s3.send(
        new PutObjectCommand({
          Bucket: process.env.S3_BUCKET!,
          Key: imageKey,
          Body: buffer,
          ContentType: cover.type,
        })
      )
    }

    return await db.insert(cards).values({
      title,
      image_key: imageKey
      // episodes_total: data.episodes_total,
      // episodes_watched: data.episodes_watched
    })
  } catch(error) {
    console.error(error)
  }
}

