// @/entities/card/types.ts
import { cards } from "@/lib/database/schema"
import { InferSelectModel } from "drizzle-orm"

export type Card = InferSelectModel<typeof cards>