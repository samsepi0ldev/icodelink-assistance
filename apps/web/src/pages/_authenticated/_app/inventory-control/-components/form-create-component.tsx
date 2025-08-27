import { zodResolver } from '@hookform/resolvers/zod'
import {
  BoxIcon,
  CheckIcon,
  ChevronDownIcon,
  Loader2,
  PlusCircle,
  PlusIcon,
} from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import z from 'zod'
import { useGetBoxes } from '@/api/boxes/queries'
import { useCreateCategory } from '@/api/category/mutations'
import { useGetCategories } from '@/api/category/queries'
import { useCreateItem } from '@/api/item/mutations'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command'
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { useSearchFilter } from '@/hook/use-search-filters'
import { cn } from '@/lib/utils'
import { FormCreateCategory } from './form-create-category'

const MAX_DISCOUNT_PERCENTAGE = 100

const createItemSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
  condition: z.string().min(1, 'Condition is required'),
  status: z.string().default('in_stock'),
  categoryId: z.coerce.number().min(1, 'Category is required'),
  quantity: z.coerce
    .number()
    .min(1, 'Quantity must be at least 1')
    .int()
    .positive(),
  price: z.coerce.number().min(0, 'Price must be positive').int().positive(),
  maxDiscount: z.coerce
    .number()
    .min(0)
    .max(MAX_DISCOUNT_PERCENTAGE, 'Max discount must be between 0-100%')
    .int(),
  boxId: z.coerce.number().min(1, 'Box selection is required').int().positive(),
})

type CreateItemParams = z.infer<typeof createItemSchema>

export function FormCreateComponent() {
  const [{ box: selectedBoxId }] = useSearchFilter()
  const createItem = useCreateItem()
  const { data, isPending } = useGetBoxes()
  const { data: dataCategories } = useGetCategories()
  const createCategory = useCreateCategory()

  const form = useForm({
    resolver: zodResolver(createItemSchema),
    defaultValues: {
      status: 'in_stock',
      price: 0,
      maxDiscount: 0,
      quantity: 1,
      boxId: selectedBoxId,
    },
  })

  function handleCreateItem({
    boxId,
    categoryId,
    condition,
    description,
    maxDiscount,
    name,
    price,
    quantity,
    status,
  }: CreateItemParams) {
    createItem.mutate(
      {
        boxId,
        categoryId,
        condition,
        description,
        maxDiscount,
        name,
        price,
        quantity,
        status,
      },
      {
        onSuccess: (_, d) => {
          toast('Created item successfully!', {
            description: (
              <pre className="mt-2 w-[320px] rounded-md bg-neutral-950 p-4">
                <code className="text-white">{JSON.stringify(d, null, 2)}</code>
              </pre>
            ),
          })
          form.reset()
        },
      }
    )
  }

  function verifyIfDefaultValueIsValid() {
    const isIncluded = data?.boxes.some((b) => b.id === selectedBoxId)
    return selectedBoxId && isIncluded ? String(selectedBoxId) : ''
  }

  function filterCategoryCmd(value: string, search: string) {
    const filter = dataCategories?.categories.filter((c) =>
      c.name.toLowerCase().includes(search.toLowerCase())
    )
    if (filter?.length) {
      const findId = filter.find((f) => f.id === Number(value))
      if (findId) {
        return 1
      }
    }
    return 0
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <PlusCircle />
          Add parts
        </Button>
      </DialogTrigger>
      <DialogPortal>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Register new component</DialogTitle>
            <DialogDescription>
              Register the component in percentage, enter the percentage up to
              which the discount can be given.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form
              className="space-y-2"
              onSubmit={form.handleSubmit(handleCreateItem)}
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea placeholder="Description" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="condition"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Condition" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="status"
                  render={() => (
                    <FormItem>
                      <FormControl>
                        <Input disabled placeholder="Status" value="in_stock" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="categoryId"
                  render={({ field }) => (
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          className="w-full justify-between border-input bg-background px-3 font-normal outline-none outline-offset-0 hover:bg-background focus-visible:outline-[3px]"
                          role="combobox"
                          variant="outline"
                        >
                          <span
                            className={cn(
                              'truncate',
                              !field.value && 'text-muted-foreground'
                            )}
                          >
                            {field.value
                              ? dataCategories?.categories.find(
                                  (cat) => String(cat.id) === field.value
                                )?.name
                              : 'Select a category'}
                          </span>
                          <ChevronDownIcon
                            aria-hidden="true"
                            className="shrink-0 text-muted-foreground/80"
                            size={16}
                          />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent
                        align="start"
                        className="w-full min-w-[var(--radix-popper-anchor-width)] overflow-y-auto border-input p-0"
                      >
                        <Command filter={filterCategoryCmd}>
                          <CommandInput placeholder="Find category" />
                          <CommandList>
                            <CommandEmpty>No category found.</CommandEmpty>
                            <CommandGroup>
                              {dataCategories?.categories.map((category) => (
                                <CommandItem
                                  key={category.id}
                                  onSelect={(currentValue) =>
                                    field.onChange(
                                      currentValue === field.value
                                        ? ''
                                        : currentValue
                                    )
                                  }
                                  value={String(category.id)}
                                >
                                  {category.name}
                                  {field.value === String(category.id) && (
                                    <CheckIcon className="ml-auto size-4" />
                                  )}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                            <CommandSeparator />
                            <CommandGroup>
                              <FormCreateCategory />
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  )}
                />
                {/* <FormField
                  control={form.control}
                  name="categoryId"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Select onValueChange={field.onChange}>
                          <SelectTrigger className="[&>span]:flex [&>span]:items-center [&>span]:gap-2 [&>span_svg]:shrink-0 [&>span_svg]:text-muted-foreground/80">
                            <SelectValue placeholder="Category" />
                          </SelectTrigger>
                          <SelectContent className="[&_*[role=option]>span>svg]:shrink-0 [&_*[role=option]>span>svg]:text-muted-foreground/80 [&_*[role=option]>span]:start-auto [&_*[role=option]>span]:end-2 [&_*[role=option]>span]:flex [&_*[role=option]>span]:items-center [&_*[role=option]>span]:gap-2 [&_*[role=option]]:ps-2 [&_*[role=option]]:pe-8">
                            <SelectGroup>
                              {dataCategories?.categories.map((category) => (
                                <SelectItem
                                  key={category.id}
                                  value={String(category.id)}
                                >
                                  <span className="truncate">
                                    {category.name}
                                  </span>
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                /> */}
                <FormField
                  control={form.control}
                  name="quantity"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Quantity"
                          {...field}
                          value={String(field.value)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Price"
                          {...field}
                          value={String(field.value)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="maxDiscount"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Max discount"
                          {...field}
                          value={String(field.value)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="boxId"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Select
                          defaultValue={verifyIfDefaultValueIsValid()}
                          onValueChange={(value) =>
                            field.onChange(Number(value))
                          }
                        >
                          <SelectTrigger className="[&>span]:flex [&>span]:items-center [&>span]:gap-2 [&>span_svg]:shrink-0 [&>span_svg]:text-muted-foreground/80">
                            <SelectValue placeholder="Select a box" />
                          </SelectTrigger>
                          <SelectContent className="[&_*[role=option]>span>svg]:shrink-0 [&_*[role=option]>span>svg]:text-muted-foreground/80 [&_*[role=option]>span]:start-auto [&_*[role=option]>span]:end-2 [&_*[role=option]>span]:flex [&_*[role=option]>span]:items-center [&_*[role=option]>span]:gap-2 [&_*[role=option]]:ps-2 [&_*[role=option]]:pe-8">
                            <SelectGroup>
                              {data?.boxes.map((box) => (
                                <SelectItem
                                  key={box.id}
                                  value={box.id.toString()}
                                >
                                  <BoxIcon className="size-4" />
                                  <span className="truncate">{box.name}</span>
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
              </div>
              <Button className="min-w-full" disabled={isPending} type="submit">
                Save
                {isPending && <Loader2 className="size-4 animate-spin" />}
              </Button>
            </form>
          </Form>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  )
}
