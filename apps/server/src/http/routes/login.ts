import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod'
import z from 'zod'

export const loginRoutes: FastifyPluginCallbackZod = (app) => {
  app.post(
    '/sign-in',
    {
      schema: {
        summary: 'Criar uma nova venda',
        description:
          'Cria uma nova venda com itens e calcula os totais automaticamente',
        tags: ['Sales'],
        body: z.object({
          email: z.email(),
          password: z.string(),
        }),
        response: {
          200: z.object({
            success: z.boolean(),
          }),
          401: z.object({ error: z.string() }),
        },
      },
    },
    async (req, reply) => {
      const { email, password } = req.body
      const user = { email: 'test@test.com', password: '123' }
      if (user.email === email && user.password === password) {
        const token = app.jwt.sign({ id: 1, email })
        return reply
          .setCookie('token', token, {
            httpOnly: true,
            secure: true,
            maxAge: 3600,
            path: '/',
          })
          .send({ success: true })
      }
      await new Promise((resolve) => setTimeout(resolve, 1))
      return reply.status(401).send({ error: 'Invalid credentials' })
    }
  )
  app.get('/profile', { preValidation: [app.authenticate] }, (req, reply) => {
    const user = req.user
    return reply.send(user)
  })
}
