import { db } from '../../../db/connection.ts'
import { categories, type NewCategory } from '../../../db/schema.ts'

export async function createCategory({ name }: NewCategory) {
  const [category] = await db.insert(categories).values({ name }).returning()
  return { category }
}
