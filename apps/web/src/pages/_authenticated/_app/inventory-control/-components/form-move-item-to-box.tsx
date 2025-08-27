import { zodResolver } from '@hookform/resolvers/zod'
import { BoxIcon, Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import z from 'zod'
import { useGetBoxes } from '@/api/boxes/queries'
import { useMoveItemsToBox } from '@/api/item/mutations'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const moveItemSchema = z.object({
  boxId: z.coerce.number(),
})

type MoveItemTypeInput = z.input<typeof moveItemSchema>
type MoveItemTypeOutput = z.output<typeof moveItemSchema>

interface FormMoveItemToBoxProps {
  items: Set<number>
  onSuccess?: () => void
}

export function FormMoveItemToBox({
  items,
  onSuccess,
}: FormMoveItemToBoxProps) {
  const { data } = useGetBoxes()
  const moveItemsToBox = useMoveItemsToBox()

  const form = useForm<MoveItemTypeInput, unknown, MoveItemTypeOutput>({
    resolver: zodResolver(moveItemSchema),
  })

  function onSubmit({ boxId }: MoveItemTypeOutput) {
    moveItemsToBox.mutate(
      {
        boxId,
        itemsId: Array.from(items),
      },
      {
        onSuccess: (_, d) => {
          toast('Itens moved with success!', {
            description: (
              <pre className="mt-2 w-[320px] rounded-md bg-neutral-950 p-4">
                <code className="text-white">{JSON.stringify(d, null, 2)}</code>
              </pre>
            ),
          })
          onSuccess?.()
        },
      }
    )
  }

  return (
    <Form {...form}>
      <form className="space-y-2" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="boxId"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Select onValueChange={field.onChange}>
                  <SelectTrigger className="[&>span]:flex [&>span]:items-center [&>span]:gap-2 [&>span_svg]:shrink-0 [&>span_svg]:text-muted-foreground/80">
                    <SelectValue placeholder="Select a box to move" />
                  </SelectTrigger>
                  <SelectContent className='className="[&_*[role=option]>span>svg]:shrink-0 [&_*[role=option]>span>svg]:text-muted-foreground/80 [&_*[role=option]>span]:start-auto [&_*[role=option]>span]:end-2 [&_*[role=option]>span]:flex [&_*[role=option]>span]:items-center [&_*[role=option]>span]:gap-2 [&_*[role=option]]:ps-2 [&_*[role=option]]:pe-8'>
                    <SelectGroup>
                      {data?.boxes.map((box) => (
                        <SelectItem key={box.id} value={String(box.id)}>
                          <BoxIcon aria-hidden="true" className="size-4" />
                          {box.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          className="min-w-full"
          disabled={moveItemsToBox.isPending}
          type="submit"
        >
          Move
          {moveItemsToBox.isPending && (
            <Loader2 className="size-4 animate-spin" />
          )}
        </Button>
      </form>
    </Form>
  )
}
