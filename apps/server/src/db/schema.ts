import { relations, sql } from 'drizzle-orm'
import {
  integer,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core'

export const itemStatusEnum = pgEnum('item_status', [
  'in_stock',
  'in_repair',
  'awaiting_customer',
  'sold',
])

export const users = pgTable('users', {
  id: uuid('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  password: text('password').notNull(),
})

export const categories = pgTable('categories', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).unique().notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

export const boxes = pgTable('boxes', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).unique().notNull(),
  description: text('description').notNull(),
  location: varchar('location', { length: 255 }).notNull(),
  capacity: varchar('capacity', { length: 100 }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

export const items = pgTable('items', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description').notNull(),
  condition: text('condition').notNull(),
  status: itemStatusEnum('status').notNull(),
  categoryId: serial('category_id').references(() => categories.id, {
    onDelete: 'set null',
  }),
  quantity: integer('quantity').default(1).notNull(),
  boxId: serial('box_id')
    .references(() => boxes.id, { onDelete: 'set null' })
    .notNull(),
  price: integer('price').notNull(),
  maxDiscount: integer('max_discount').default(0).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

export const customers = pgTable('customers', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  phoneNumber: text('phone_number'),
  email: text('email'),
  cpfCnpj: text('cpf_cnpj'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

export const sales = pgTable('sales', {
  id: serial('id').primaryKey(),
  customerId: serial('customer_id')
    .references(() => customers.id, { onDelete: 'set null' })
    .notNull(),
  totalAmount: integer('total_amount').notNull(),
  totalDiscount: integer('total_discount').default(0),
  finalAmount: integer('final_amount').notNull(),
  saleDate: text('sale_date').default(sql`CURRENT_TIMESTAMP`),
})

export const saleItems = pgTable('sale_items', {
  id: serial('id').primaryKey(),
  saleId: serial('sale_id')
    .references(() => sales.id, { onDelete: 'cascade' })
    .notNull(),
  itemId: serial('item_id')
    .references(() => items.id, { onDelete: 'restrict' })
    .notNull(),
  quantity: integer('quantity').default(1).notNull(),
  unitPrice: integer('unit_price').notNull(),
  discount: integer('discount').default(0).notNull(),
  subtotal: integer('subtotal').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

/** RELATIONS */
export const boxRelations = relations(boxes, ({ many }) => ({
  items: many(items),
}))

export const itemsRelations = relations(items, ({ one, many }) => ({
  box: one(boxes, { fields: [items.boxId], references: [boxes.id] }),
  category: one(categories, {
    fields: [items.categoryId],
    references: [categories.id],
  }),
  saleItems: many(saleItems),
}))

export const salesRelations = relations(sales, ({ one, many }) => ({
  customer: one(customers, {
    fields: [sales.customerId],
    references: [customers.id],
  }),
  items: many(saleItems),
}))

export const customersRelations = relations(customers, ({ many }) => ({
  sales: many(sales),
}))

export const saleItemsRelations = relations(saleItems, ({ one }) => ({
  sale: one(sales, { fields: [saleItems.saleId], references: [sales.id] }),
  item: one(items, { fields: [saleItems.itemId], references: [items.id] }),
}))

/** TYPES */
export type Box = typeof boxes.$inferSelect
export type NewBox = typeof boxes.$inferInsert
export type Category = typeof categories.$inferSelect
export type NewCategory = typeof categories.$inferInsert
export type Item = typeof items.$inferSelect
export type NewItem = typeof items.$inferInsert
export type Customer = typeof customers.$inferSelect
export type NewCustomer = typeof customers.$inferInsert
export type Sale = typeof sales.$inferSelect
export type NewSale = typeof sales.$inferInsert
export type SaleItem = typeof saleItems.$inferSelect
export type NewSaleItem = typeof saleItems.$inferInsert
