import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2, Plus, PlusIcon } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import z from 'zod'
import { useCreateCategory } from '@/api/category/mutations'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

const createCategorySchema = z.object({
  name: z.string().min(1),
})

type CreateCategoryParams = z.infer<typeof createCategorySchema>

export function FormCreateCategory() {
  const createCategory = useCreateCategory()
  const form = useForm<CreateCategoryParams>({
    resolver: zodResolver(createCategorySchema),
  })
  function handleCreateCategory({ name }: CreateCategoryParams) {
    createCategory.mutate(
      { name },
      {
        onSuccess: (_, d) =>
          toast('Category created with successfully!', {
            description: (
              <pre className="mt-2 w-[320px] rounded-md bg-neutral-950 p-4">
                <code className="text-white">{JSON.stringify(d, null, 2)}</code>
              </pre>
            ),
          }),
      }
    )
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full justify-start font-normal" variant="ghost">
          <PlusIcon aria-hidden="true" className="-ms-2 opacity-60" size={16} />
          New category
        </Button>
      </DialogTrigger>
      <DialogPortal>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Category</DialogTitle>
            <DialogDescription>
              Add a new category to organize your inventory items.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form
              className="space-y-4"
              onSubmit={form.handleSubmit(handleCreateCategory)}
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Name of category" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                className="w-full"
                disabled={createCategory.isPending}
                type="submit"
              >
                Create
                {createCategory.isPending ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <Plus />
                )}
              </Button>
            </form>
          </Form>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  )
}
