import { inArray } from 'drizzle-orm'

import { db } from '../../../db/connection.ts'
import { items } from '../../../db/schema.ts'

export async function deleteItem(ids: number[]) {
  await db.delete(items).where(inArray(items.id, ids))
}
