import fastifyCookie from '@fastify/cookie'
import fastifyCors from '@fastify/cors'
import { fastifyJwt } from '@fastify/jwt'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'
import fastify from 'fastify'
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod'
import { env } from './env.ts'
import { categoryRoute } from './http/routes/categories.ts'
import { itemsRoutes } from './http/routes/items.ts'
import { loginRoutes } from './http/routes/login.ts'
import { salesRoutes } from './http/routes/sales.ts'
import { storageLocationRoutes } from './http/routes/storage-locations.ts'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(fastifyCors, {
  origin: 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
})
app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'IL Assistance API',
      version: '0.0.1',
    },
  },
  transform: jsonSchemaTransform,
})
app.register(fastifySwaggerUi, {
  routePrefix: '/docs',
  uiConfig: {
    docExpansion: 'full',
    deepLinking: false,
  },
})

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: 'token',
    signed: false,
  },
  sign: { expiresIn: '1h' },
})

app.register(fastifyCookie)

app.decorate('authenticate', async (req, reply) => {
  try {
    await req.jwtVerify()
  } catch (err) {
    reply.send(err)
  }
})

app.get('/health', (_, res) => {
  res.send({ message: 'Success' })
})

app.register(storageLocationRoutes)
app.register(itemsRoutes)
app.register(salesRoutes)
app.register(loginRoutes)
app.register(categoryRoute)

const PORT = env.PORT

app.listen({ port: PORT, host: '0.0.0.0' }, (_, pathname) => {
  process.stdout.write(`🚀 server running at ${pathname}`)
})
