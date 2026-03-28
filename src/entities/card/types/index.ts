// @/entities/card/types.ts
import { cards } from "@/database/schema"
import { InferSelectModel } from "drizzle-orm"

export type Card = InferSelectModel<typeof cards>
