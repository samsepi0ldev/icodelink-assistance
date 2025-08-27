import { eq, sql } from 'drizzle-orm'

import { db } from '../../../db/connection.ts'
import { boxes, type NewBox } from '../../../db/schema.ts'

export async function updateLocation({ id, ...data }: NewBox) {
  if (id) {
    const [box] = await db
      .update(boxes)
      .set({ ...data, updatedAt: sql`NOW()` })
      .where(eq(boxes.id, id))
      .returning()
    return { box }
  }
}
