import { timestamp, integer, text, pgTable, uuid } from "drizzle-orm/pg-core";

export const cards = pgTable("cards", {
  id: uuid().primaryKey().defaultRandom().notNull(),
  title: text().notNull(),
  episodes_total: integer().default(12).notNull(),
  episodes_watched: integer().default(0).notNull(),
  image_key: text(),
  updated_at: timestamp().defaultNow().notNull(),
  created_at: timestamp().defaultNow().notNull(),
});

