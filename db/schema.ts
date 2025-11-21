import { pgTable, serial, text, numeric, timestamp } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
});

export const expenses = pgTable("expenses", {
  id: serial("id").primaryKey(),
  userEmail: text("user_email").notNull(),
  description: text("description").notNull(),
  amount: numeric("amount", { precision: 10, scale: 2 }).notNull(),
  category: text("category").notNull(),
  date: timestamp("date", { withTimezone: false }).notNull(),
  receiptUrl: text("receipt_url"),
});

