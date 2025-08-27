import { db } from '../../../db/connection.ts'
import { boxes, type NewBox } from '../../../db/schema.ts'

export async function createLocation({
  name,
  capacity,
  description,
  location,
}: NewBox) {
  const [box] = await db
    .insert(boxes)
    .values({
      name,
      capacity,
      description,
      location,
    })
    .returning()
  return { box }
}
