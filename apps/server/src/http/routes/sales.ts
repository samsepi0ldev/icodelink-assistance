import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod'
import z from 'zod'

const createSaleItemSchema = z.object({
  itemId: z.number().describe('ID do item'),
  quantity: z.number().min(1).describe('Quantidade a vender'),
  unitPrice: z.number().min(0).describe('Preço unitário em centavos'),
  discount: z.number().min(0).default(0).describe('Desconto em centavos'),
})

const createSaleSchema = z.object({
  customerId: z.number().describe('ID do cliente'),
  items: createSaleItemSchema,
})

export const salesRoutes: FastifyPluginCallbackZod = (app) => {
  app.addHook('preValidation', app.authenticate)
  app.post('/sales', {
    schema: {
      summary: 'Criar uma nova venda',
      description:
        'Cria uma nova venda com itens e calcula os totais automaticamente',
      tags: ['Sales'],
      body: createSaleSchema,
      response: {
        201: createSaleItemSchema,
      },
    },
    handler: (req, reply) => {},
  })
}
