import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod'
import z from 'zod'

import { createLocation } from '../functions/boxes/create-locations.ts'
import { deleteLocation } from '../functions/boxes/delete-location.ts'
import { getLocations } from '../functions/boxes/get-locations.ts'
import { updateLocation } from '../functions/boxes/update-location.ts'

export const storageLocationRoutes: FastifyPluginCallbackZod = (app) => {
  app.addHook('preValidation', app.authenticate)
  app.get(
    '/boxes',
    {
      schema: {
        summary: 'List all storage boxes',
        description:
          'Returns a list of all registered storage boxes in the system',
        tags: ['Storage Boxes'],
        response: {
          200: z.object({
            boxes: z.array(
              z.object({
                id: z.number(),
                name: z.string(),
                description: z.string(),
                location: z.string(),
                capacity: z.string(),
                createdAt: z.date(),
                updatedAt: z.date(),
              })
            ),
          }),
        },
      },
    },
    async (_req, reply) => {
      const boxes = await getLocations()
      return reply.send(boxes)
    }
  )

  app.post(
    '/boxes',
    {
      schema: {
        summary: 'Create a new storage box',
        description: 'Creates a new storage box for component storage',
        tags: ['Storage Boxes'],
        body: z.object({
          name: z.string().min(1).max(255),
          description: z.string(),
          location: z.string().min(1).max(255),
          capacity: z.string().min(1).max(100),
        }),
        response: {
          201: z.object({
            box: z.object({
              id: z.number(),
              name: z.string(),
              description: z.string(),
              location: z.string(),
              capacity: z.string(),
              createdAt: z.date(),
              updatedAt: z.date(),
            }),
          }),
        },
      },
    },
    async (req, reply) => {
      const { capacity, description, location, name } = req.body
      const result = await createLocation({
        capacity,
        description,
        location,
        name,
      })
      return reply.status(201).send(result)
    }
  )

  app.put(
    '/boxes/:id',
    {
      schema: {
        summary: 'Update a storage box',
        description: 'Updates all data of an existing storage box',
        tags: ['Storage Boxes'],
        params: z.object({
          id: z.coerce.number(),
        }),
        body: z.object({
          name: z.string().min(1).max(255),
          description: z.string().min(1),
          location: z.string().min(1).max(255),
          capacity: z.string().min(1).max(100),
        }),
        response: {
          200: z.object({
            box: z.object({
              id: z.number(),
              name: z.string(),
              description: z.string(),
              location: z.string(),
              capacity: z.string(),
              createdAt: z.date(),
              updatedAt: z.date(),
            }),
          }),
        },
      },
    },
    async (req, reply) => {
      const { id } = req.params
      const { capacity, description, location, name } = req.body
      const result = await updateLocation({
        id,
        capacity,
        description,
        location,
        name,
      })
      return reply.send(result)
    }
  )

  app.delete(
    '/boxes/:id',
    {
      schema: {
        summary: 'Delete a storage box',
        description: 'Permanently removes a storage box from the system',
        tags: ['Storage Boxes'],
        params: z.object({
          id: z.coerce.number(),
        }),
        response: {
          204: z.null(),
        },
      },
    },
    async (req, reply) => {
      const { id } = req.params
      await deleteLocation({ id })
      return reply.status(204).send()
    }
  )
}
