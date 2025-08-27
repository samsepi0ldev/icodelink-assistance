import { z } from 'zod'

const envParams = z.object({
  PORT: z.coerce.number().default(3333),
  DATABASE_URL: z.url().startsWith('postgresql://'),
  JWT_SECRET: z.string().nonempty(),
})
const env = envParams.parse(process.env)

export { env }
