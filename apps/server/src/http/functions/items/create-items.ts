import { db } from '../../../db/connection.ts'
import { items, type NewItem } from '../../../db/schema.ts'

export async function createItems(data: NewItem) {
  const [item] = await db.insert(items).values(data).returning()
  return { item }
}
