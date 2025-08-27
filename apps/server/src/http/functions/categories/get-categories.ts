import { db } from '../../../db/connection.ts'

export async function getCategories() {
  const categories = await db.query.categories.findMany()
  return {
    categories,
  }
}
