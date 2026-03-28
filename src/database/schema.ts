import { timestamp, integer, text, pgTable, uuid } from "drizzle-orm/pg-core";

export const cards = pgTable("cards", {
  id: uuid().primaryKey().defaultRandom().notNull(),
  title: text().notNull(),
  eisodes_total: integer().default(12).notNull(),
  eisodes_watched: integer().default(0).notNull(),
  updated_at: timestamp().defaultNow().notNull(),
  created_at: timestamp().defaultNow().notNull(),
});
