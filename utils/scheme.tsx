import { pgTable,serial, varchar } from "drizzle-orm/pg-core";
import { Icon } from "lucide-react";

export const Budgets = pgTable('budgets', {
    id: serial('id').primaryKey(),
    name: varchar('name').notNull(),
    amount: varchar('amount').notNull(),
    icon: varchar('icon'),
    createdBy: varchar('createdBy').notNull(),
})