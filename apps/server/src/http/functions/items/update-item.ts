import { eq } from 'drizzle-orm'

import { db } from '../../../db/connection.ts'
import { items, type NewItem } from '../../../db/schema.ts'

export async function updateItem({ id, ...data }: NewItem & { id: number }) {
  const [item] = await db
    .update(items)
    .set(data)
    .where(eq(items.id, id))
    .returning()
  return { item }
}
