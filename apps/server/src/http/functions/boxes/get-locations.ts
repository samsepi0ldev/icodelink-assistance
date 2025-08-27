import { db } from '../../../db/connection.ts'

export async function getLocations() {
  const boxes = await db.query.boxes.findMany()
  return { boxes }
}
