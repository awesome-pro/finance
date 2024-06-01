import { pgTable, text } from "drizzle-orm/pg-core";
import { createInsertSchema, BuildInsertSchema } from "drizzle-zod"

export const accounts = pgTable("accounts", {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    userId: text("user_id").notNull(),
    plaidId: text("plaid_id").notNull(),
})

export const insertAccountsSchema = createInsertSchema(accounts);

