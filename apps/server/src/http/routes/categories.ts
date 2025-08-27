import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { createCategory } from '../functions/categories/create-category.ts'
import { getCategories } from '../functions/categories/get-categories.ts'

export const categoryRoute: FastifyPluginCallbackZod = (app) => {
  app.addHook('preValidation', app.authenticate)
  app.get(
    '/categories',
    {
      schema: {
        response: {
          200: z.object({
            categories: z.array(
              z.object({
                id: z.number(),
                name: z.string(),
                createdAt: z.date(),
                updatedAt: z.date(),
              })
            ),
          }),
        },
      },
    },
    async (req, reply) => {
      const { id } = req.user
      const response = await getCategories()
      return reply.send(response)
    }
  )
  app.post(
    '/categories',
    {
      schema: {
        body: z.object({
          name: z.string().min(1),
        }),
        response: {
          200: z.object({
            category: z.object({
              id: z.number(),
              name: z.string(),
              createdAt: z.date(),
              updatedAt: z.date(),
            }),
          }),
        },
      },
    },
    async (req, reply) => {
      const { name } = req.body
      const response = await createCategory({ name })
      return reply.send(response)
    }
  )
}
