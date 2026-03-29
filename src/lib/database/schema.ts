import { timestamp, integer, text, pgTable, uuid } from "drizzle-orm/pg-core";

export const cards = pgTable("cards", {
  id: uuid().primaryKey().defaultRandom().notNull(),
  image_key: text(),
  title: text().notNull(),
  player_url: text(),
  episodes_total: integer().default(12).notNull(),
  episodes_watched: integer().default(0).notNull(),
 
  release_day_of_week: integer().notNull().default(1),   // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
  release_time: text().notNull().default("12:00"),  // HH:mm (eg 14:30)
  
  updated_at: timestamp().defaultNow().notNull(),
  created_at: timestamp().defaultNow().notNull(),
});

