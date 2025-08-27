import { createFileRoute } from '@tanstack/react-router'
import { Folder, PlusCircle, Trash2 } from 'lucide-react'
import { useMemo, useState } from 'react'
import { toast } from 'sonner'

import { useGetBoxes } from '@/api/boxes/queries'
import { useDeleteItems } from '@/api/item/mutations'
import { useGetItems } from '@/api/item/queries'
import { BoxComponent } from '@/components/box'
import { EmptyStateBoxes } from '@/components/empty-state-boxes'
import { EmptyStateNoSelection } from '@/components/empty-state-no-selection'
import { Pagination } from '@/components/pagination'
import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Skeleton } from '@/components/ui/skeleton'
import { useSearchFilter } from '@/hooks/use-search-filters'
import { FilterInventory } from './-components/filter-inventory'
import { FormCreateComponent } from './-components/form-create-component'
import { FormCreateNewBox } from './-components/form-create-new-box'
import { FormMoveItemToBox } from './-components/form-move-item-to-box'
import { TableDataItem } from './-components/table-data-items'
import { TableSkeleton } from './-components/table-skeleton'

export const Route = createFileRoute(
  '/_authenticated/_app/inventory-control/inventory'
)({
  component: Inventory,
  head: () => ({
    meta: [
      {
        title: 'Inventory | icl.site',
      },
    ],
  }),
})

function Inventory() {
  const [{ box, page }] = useSearchFilter()
  const { data, isPending } = useGetBoxes()
  const { data: itemsFromBox, isPending: isLoadingItems } = useGetItems(
    box,
    page
  )
  const deleteItems = useDeleteItems()

  // Encontrar o nome da caixa selecionada
  const selectedBoxName = data?.boxes.find((b) => b.id === box)?.name

  const [selectedItems, setSelectedItems] = useState<Set<number>>(new Set())

  const allItemsSelected = useMemo(() => {
    if (!itemsFromBox?.items.length) return false
    return itemsFromBox.items.every((item) => selectedItems.has(item.id))
  }, [selectedItems, itemsFromBox?.items])

  const someItemsSelected = useMemo(() => {
    if (!itemsFromBox?.items.length) return false
    return (
      itemsFromBox.items.some((item) => selectedItems.has(item.id)) &&
      !allItemsSelected
    )
  }, [selectedItems, itemsFromBox?.items, allItemsSelected])

  const toggleAllItems = () => {
    if (!itemsFromBox?.items) return

    if (allItemsSelected) {
      setSelectedItems(new Set())
    } else {
      setSelectedItems(new Set(itemsFromBox.items.map((item) => item.id)))
    }
  }

  const toggleItem = (itemId: number) => {
    const newSelected = new Set(selectedItems)
    if (newSelected.has(itemId)) {
      newSelected.delete(itemId)
    } else {
      newSelected.add(itemId)
    }
    setSelectedItems(newSelected)
  }

  const deleteSelectedItems = () => {
    deleteItems.mutate(Array.from(selectedItems), {
      onSuccess: () => toast.success('The items were deleted successfully.'),
    })
    setSelectedItems(new Set())
  }

  const clearSelection = () => {
    setSelectedItems(new Set())
  }

  return (
    <div className="grid grid-cols-[384px_1fr] p-10">
      <div>
        {!!data?.boxes.length && (
          <Popover>
            <PopoverTrigger asChild>
              <Button className="border-dashed" variant={'outline'}>
                New storage box
                <PlusCircle />
              </Button>
            </PopoverTrigger>

            <PopoverContent align="start" className="space-y-4">
              <FormCreateNewBox />
            </PopoverContent>
          </Popover>
        )}
        <div className="flex w-fit flex-col space-y-1 py-8">
          {isPending &&
            Array.from({ length: 3 }, (_, i) => (
              <Skeleton className="h-8 w-40" key={i.toString()} />
            ))}

          {!isPending && data?.boxes.length === 0 && (
            <EmptyStateBoxes>
              <Popover>
                <PopoverTrigger asChild>
                  <Button className="gap-2">
                    <PlusCircle className="h-4 w-4" />
                    Criar primeira caixa
                  </Button>
                </PopoverTrigger>

                <PopoverContent align="center" className="space-y-4">
                  <FormCreateNewBox />
                </PopoverContent>
              </Popover>
            </EmptyStateBoxes>
          )}

          <aside className="space-y-1">
            {data?.boxes.map((b) => (
              <BoxComponent id={b.id} key={b.id} name={b.name} />
            ))}
          </aside>
        </div>
      </div>
      <div>
        <div className="flex items-center justify-between">
          <FilterInventory />
          <div className="space-x-4">
            <span className="text-sm">
              {selectedItems.size} rows of {itemsFromBox?.items.length || 0}{' '}
              selected
            </span>
            <Popover>
              <PopoverTrigger asChild>
                <Button disabled={selectedItems.size === 0} variant="outline">
                  <Folder />
                  Move to folder
                </Button>
              </PopoverTrigger>

              <PopoverContent>
                <FormMoveItemToBox
                  items={selectedItems}
                  onSuccess={clearSelection}
                />
              </PopoverContent>
            </Popover>
            <FormCreateComponent />
            <Button
              disabled={selectedItems.size === 0}
              onClick={deleteSelectedItems}
              variant="destructive"
            >
              <Trash2 />
              Delete
            </Button>
          </div>
        </div>
        {isLoadingItems && <TableSkeleton />}
        {box === 0 && !isLoadingItems ? (
          <EmptyStateNoSelection />
        ) : (
          !isLoadingItems && (
            <TableDataItem
              allItemsSelected={allItemsSelected}
              data={itemsFromBox?.items}
              selectedBoxName={selectedBoxName}
              selectedItems={selectedItems}
              someItemsSelected={someItemsSelected}
              toggleAllItems={toggleAllItems}
              toggleItem={toggleItem}
            />
          )
        )}
        {!!itemsFromBox?.items.length && (
          <Pagination
            total={itemsFromBox.total}
            totalPages={itemsFromBox.totalPages}
          />
        )}
      </div>
    </div>
  )
}
