import { count, eq } from 'drizzle-orm'

import { db } from '../../../db/connection.ts'
import { categories, items } from '../../../db/schema.ts'

interface GetItemsProps {
  page?: number
  boxId: number
}

export async function getItemsByBox({ boxId, page = 1 }: GetItemsProps) {
  const limit = 10
  const offset = (page - 1) * limit

  const [totalItems] = await db
    .select({ total: count() })
    .from(items)
    .where(eq(items.boxId, boxId))

  const result = await db
    .select({
      id: items.id,
      name: items.name,
      createdAt: items.createdAt,
      updatedAt: items.updatedAt,
      description: items.description,
      condition: items.condition,
      status: items.status,
      category: categories.name,
      quantity: items.quantity,
      boxId: items.boxId,
      price: items.price,
      maxDiscount: items.maxDiscount,
    })
    .from(items)
    .leftJoin(categories, eq(items.categoryId, categories.id))
    .where(eq(items.boxId, boxId))
    .limit(limit)
    .offset(offset)

  const total = totalItems.total
  const totalPages = Math.ceil(total / limit)

  return {
    total,
    totalPages,
    items: result,
  }
}
