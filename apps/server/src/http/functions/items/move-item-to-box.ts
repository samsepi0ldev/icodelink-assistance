import { inArray } from 'drizzle-orm'

import { db } from '../../../db/connection.ts'
import { items } from '../../../db/schema.ts'

interface MoveItemToBoxProps {
  boxId: number
  itemsId: number[]
}

export async function moveItemToBox({ boxId, itemsId }: MoveItemToBoxProps) {
  const ids = await db
    .update(items)
    .set({ boxId })
    .where(inArray(items.id, itemsId))
    .returning({ id: items.id })
  return { itemsId: ids }
}
