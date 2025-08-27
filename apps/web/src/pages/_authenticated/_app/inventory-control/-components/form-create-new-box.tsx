import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import z from 'zod'
import { useCreateBox } from '@/api/boxes/mutations'
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

const createBoxSchema = z.object({
  name: z.string(),
  description: z.string(),
  location: z.string(),
  capacity: z.string(),
})

type CreateBoxParams = z.infer<typeof createBoxSchema>

export function FormCreateNewBox() {
  const { mutate, isPending: isLoading } = useCreateBox()

  const form = useForm<CreateBoxParams>({
    resolver: zodResolver(createBoxSchema),
  })

  function onSubmit(data: CreateBoxParams) {
    mutate(data, {
      onSuccess: (_, d) => {
        toast('Box created with success', {
          description: (
            <pre className="mt-2 w-[320px] rounded-md bg-neutral-950 p-4">
              <code className="text-white">{JSON.stringify(d, null, 2)}</code>
            </pre>
          ),
        })
        form.reset()
      },
    })
  }
  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Storage box name " {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="Storage box name " {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input placeholder="Storage box name " {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="capacity"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel>Capacity</FormLabel>
              <FormControl>
                <Input placeholder="Storage box name " {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          className="w-full bg-lime-300 text-lime-950 hover:bg-lime-400"
          disabled={isLoading}
          type="submit"
        >
          {isLoading ? <Loader2 className="animate-spin" /> : 'Save'}
        </Button>
      </form>
    </Form>
  )
}
