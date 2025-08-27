import { zodResolver } from '@hookform/resolvers/zod'
import { createFileRoute, redirect, useRouter } from '@tanstack/react-router'
import { ArrowRight, Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import z from 'zod'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'

const fallback = '/' as const

export const Route = createFileRoute('/_auth/sign-in')({
  validateSearch: z.object({
    redirect: z.string().optional().catch(''),
  }),
  beforeLoad: ({ context, search }) => {
    if (context.authentication.isAuthenticated) {
      throw redirect({ to: search.redirect || fallback })
    }
  },
  component: RouteComponent,
})

const loginSchema = z.object({
  email: z.email().nonempty(),
  password: z.string().nonempty(),
})

type LoginType = z.infer<typeof loginSchema>

function RouteComponent() {
  const { authentication } = Route.useRouteContext()
  const router = useRouter()
  const navigate = Route.useNavigate()

  const search = Route.useSearch()

  const form = useForm<LoginType>({
    resolver: zodResolver(loginSchema),
  })

  async function onSubmit(formData: LoginType) {
    try {
      await authentication.signIn(formData)
      await router.invalidate()
      await navigate({ to: search.redirect || fallback })
    } catch (error) {
      toast('Error', {
        description: (
          <pre className="mt-2 w-[320px] rounded-md bg-neutral-950 p-4">
            <code className="text-white">
              {JSON.stringify(error.response.data, null, 2)}
            </code>
          </pre>
        ),
      })
    }
  }

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center gap-4">
      <Form {...form}>
        <form
          className="w-full max-w-sm space-y-6"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <Button
            aria-label="Sign in with Google"
            className="w-full"
            type="button"
            variant="outline"
          >
            <svg
              aria-hidden="true"
              clipRule="evenodd"
              fillRule="evenodd"
              strokeLinejoin="round"
              strokeMiterlimit="2"
              viewBox="0 0 512 512"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M32.582 370.734C15.127 336.291 5.12 297.425 5.12 256c0-41.426 10.007-80.291 27.462-114.735C74.705 57.484 161.047 0 261.12 0c69.12 0 126.836 25.367 171.287 66.793l-73.31 73.309c-26.763-25.135-60.276-38.168-97.977-38.168-66.56 0-123.113 44.917-143.36 105.426-5.12 15.36-8.146 31.65-8.146 48.64 0 16.989 3.026 33.28 8.146 48.64l-.303.232h.303c20.247 60.51 76.8 105.426 143.36 105.426 34.443 0 63.534-9.31 86.341-24.67 27.23-18.152 45.382-45.148 51.433-77.032H261.12v-99.142h241.105c3.025 16.757 4.654 34.211 4.654 52.364 0 77.963-27.927 143.592-76.334 188.276-42.356 39.098-100.305 61.905-169.425 61.905-100.073 0-186.415-57.483-228.538-141.032v-.233z"
                fill="#fff"
              />
            </svg>
            Sign in with google
          </Button>
          <Separator orientation="horizontal" />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>E-mail</FormLabel>
                <FormControl>
                  <Input placeholder="ex: email@email.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="ex: email@email.com"
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="w-full" type="submit">
            Log in
            <ArrowRight />
          </Button>
        </form>
      </Form>
      <span className="text-xs text-zinc-500">
        Don't have an account?{' '}
        <a
          className="text-foreground hover:underline"
          href="https://wa.me/75992326727?text=I%20want%20to%20get%20your%20services"
        >
          Speak with us
        </a>
      </span>
    </div>
  )
}
