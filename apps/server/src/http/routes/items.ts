import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod'
import z from 'zod'

import { createItems } from '../functions/items/create-items.ts'
import { deleteItem } from '../functions/items/delete-item.ts'
import { getItemsByBox } from '../functions/items/get-items-by-box.ts'
import { moveItemToBox } from '../functions/items/move-item-to-box.ts'
import { updateItem } from '../functions/items/update-item.ts'

export const itemsRoutes: FastifyPluginCallbackZod = (app) => {
  app.addHook('preValidation', app.authenticate)
  app.get(
    '/box/:boxId/items',
    {
      schema: {
        summary: 'Get items by storage box',
        description: 'Returns all items stored in a specific storage box',
        tags: ['Items'],
        params: z.object({
          boxId: z.coerce.number().describe('ID of the storage box'),
        }),
        querystring: z
          .object({
            page: z.coerce.number().default(1).describe('Page number'),
          })
          .describe('Optional query parameters'),
        response: {
          200: z.object({
            total: z.number(),
            totalPages: z.number(),
            items: z.array(
              z.object({
                id: z.number(),
                name: z.string(),
                description: z.string(),
                condition: z.string(),
                status: z.enum([
                  'in_stock',
                  'in_repair',
                  'awaiting_customer',
                  'sold',
                ]),
                categoryId: z.number(),
                category: z.string().nullable(),
                quantity: z.number(),
                price: z.number(),
                maxDiscount: z.number(),
                boxId: z.number(),
                createdAt: z.date(),
                updatedAt: z.date(),
              })
            ),
          }),
        },
      },
    },
    async (req, reply) => {
      const { boxId } = req.params
      const { page } = req.query
      const response = await getItemsByBox({ boxId, page })
      return reply.send(response)
    }
  )

  app.post(
    '/items',
    {
      schema: {
        summary: 'Create a new item',
        description: 'Creates a new item and assigns it to a storage box',
        tags: ['Items'],
        body: z.object({
          name: z.string().min(1).describe('Item name'),
          description: z.string().describe('Item description'),
          condition: z.string().describe('Item condition'),
          status: z
            .enum(['in_stock', 'in_repair', 'awaiting_customer', 'sold'])
            .describe('Item status'),
          categoryId: z.number().describe('Item category'),
          quantity: z.number().min(1).default(1).describe('Item quantity'),
          price: z.number().min(0).describe('Item price in cents'),
          maxDiscount: z
            .number()
            .min(0)
            .default(0)
            .describe('Maximum discount percentage (0-100)'),
          boxId: z.number().describe('ID of the storage box'),
        }),
        response: {
          201: z.object({
            item: z.object({
              id: z.number(),
              name: z.string(),
              description: z.string(),
              condition: z.string(),
              status: z.enum([
                'in_stock',
                'in_repair',
                'awaiting_customer',
                'sold',
              ]),
              categoryId: z.number(),
              quantity: z.number(),
              price: z.number(),
              maxDiscount: z.number(),
              boxId: z.number(),
              createdAt: z.date(),
              updatedAt: z.date(),
            }),
          }),
        },
      },
    },
    async (req, reply) => {
      const {
        boxId,
        categoryId,
        condition,
        description,
        name,
        quantity,
        price,
        maxDiscount,
        status,
      } = req.body
      const response = await createItems({
        boxId,
        categoryId,
        condition,
        description,
        name,
        quantity,
        price,
        maxDiscount,
        status,
      })
      return reply.send(response)
    }
  )

  app.put(
    '/items/:id',
    {
      schema: {
        summary: 'Update an item',
        description: 'Updates all data of an existing item',
        tags: ['Items'],
        params: z.object({
          id: z.coerce.number().describe('ID of the item to be updated'),
        }),
        body: z.object({
          name: z.string().min(1).describe('Item name'),
          description: z.string().describe('Item description'),
          condition: z.string().describe('Item condition'),
          status: z
            .enum(['in_stock', 'in_repair', 'awaiting_customer', 'sold'])
            .describe('Item status'),
          categoryId: z.number().describe('Item category'),
          quantity: z.number().min(1).describe('Item quantity'),
          price: z.number().min(0).describe('Item price in cents'),
          maxDiscount: z
            .number()
            .min(0)
            .default(0)
            .describe('Maximum discount percentage (0-100)'),
          boxId: z.number().describe('ID of the storage box'),
        }),
        response: {
          200: z.object({
            item: z.object({
              id: z.number(),
              name: z.string(),
              description: z.string(),
              condition: z.string(),
              status: z.enum([
                'in_stock',
                'in_repair',
                'awaiting_customer',
                'sold',
              ]),
              categoryId: z.number(),
              quantity: z.number(),
              price: z.number(),
              maxDiscount: z.number(),
              boxId: z.number(),
              createdAt: z.date(),
              updatedAt: z.date(),
            }),
          }),
        },
      },
    },
    async (req, reply) => {
      const {
        boxId,
        categoryId,
        condition,
        description,
        name,
        quantity,
        price,
        maxDiscount,
        status,
      } = req.body
      const { id } = req.params

      const response = await updateItem({
        id,
        boxId,
        categoryId,
        condition,
        description,
        name,
        quantity,
        price,
        maxDiscount,
        status,
      })
      return reply.send(response)
    }
  )

  app.delete(
    '/items',
    {
      schema: {
        summary: 'Delete an item',
        description: 'Permanently removes an item from the system',
        tags: ['Items'],
        body: z.object({
          ids: z.array(z.number().describe('ID of the item to be deleted')),
        }),
        response: {
          204: z.null().describe('Item deleted successfully'),
        },
      },
    },
    async (req, reply) => {
      const { ids } = req.body
      await deleteItem(ids)

      return reply.status(204).send(null)
    }
  )

  app.patch(
    '/item/box/move',
    {
      schema: {
        summary: 'Move item to another box',
        description: 'Moves an existing item from one storage box to another',
        tags: ['Items'],
        body: z.object({
          itemsId: z.array(z.number().describe('ID of the item to be moved')),
          boxId: z.number().describe('ID of the destination storage box'),
        }),
        response: {
          200: z.object({
            itemsId: z.array(
              z.object({
                id: z.number().describe('ID of the new storage box'),
              })
            ),
          }),
        },
      },
    },
    async (req, reply) => {
      const { boxId, itemsId } = req.body
      const response = await moveItemToBox({ boxId, itemsId })
      return reply.send(response)
    }
  )
}
