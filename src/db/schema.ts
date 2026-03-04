import { pgTable, uuid, text, boolean, timestamp, integer } from "drizzle-orm/pg-core";

export const pages = pgTable("pages", {
  id: uuid("id").defaultRandom().primaryKey(),
  slug: text("slug").unique().notNull(),
  creatorName: text("creator_name").notNull(),
  partnerName: text("partner_name").notNull(),
  question: text("question").notNull().default("Will you go on a date with me?"),
  theme: text("theme").notNull().default("romantic-rose"),
  responded: boolean("responded").notNull().default(false),
  response: text("response"), // 'yes' or 'no' (though no is practically impossible!)
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const photos = pgTable("photos", {
  id: uuid("id").defaultRandom().primaryKey(),
  pageId: uuid("page_id").references(() => pages.id, { onDelete: "cascade" }).notNull(),
  url: text("url").notNull(),
  caption: text("caption").notNull(),
  order: integer("order").notNull(),
});

export type Page = typeof pages.$inferSelect;
export type NewPage = typeof pages.$inferInsert;
export type Photo = typeof photos.$inferSelect;
export type NewPhoto = typeof photos.$inferInsert;
