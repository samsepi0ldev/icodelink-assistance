import { eq } from 'drizzle-orm'

import { db } from '../../../db/connection.ts'
import { boxes } from '../../../db/schema.ts'

export async function deleteLocation({ id }: { id: number }) {
  await db.delete(boxes).where(eq(boxes.id, id))
}
