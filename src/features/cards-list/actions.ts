'use server'

import { db } from "@/database/drizzle";
import { cards } from "@/database/schema";
import { s3 } from "@/entities/card/s3";
import { Card } from "@/entities/card/types";

import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3"

// const s3 = new S3Client({
//   region: "garage",
//   endpoint: process.env.S3_ENDPOINT,
//   credentials: {
//     accessKeyId: process.env.S3_KEY!,
//     secretAccessKey: process.env.S3_SECRET!,
//   },
// })
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

