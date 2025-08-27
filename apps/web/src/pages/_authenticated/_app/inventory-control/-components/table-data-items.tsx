import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { MoreHorizontal } from 'lucide-react'

import type { Item } from '@/api/item/types'
import { EmptyStateItems } from '@/components/empty-state-items'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { formatCurrency } from '@/lib/format-currency'
import { FormCreateComponent } from './form-create-component'
import { SaleComponent } from './sell-component'

const CENTS_MULTIPLIER = 100

type TableDataItemProps = {
  data?: Item[]
  allItemsSelected: boolean
  toggleAllItems: () => void
  someItemsSelected: boolean
  selectedItems: Set<number>
  toggleItem: (itemId: number) => void
  selectedBoxName?: string
}

export function TableDataItem({
  data,
  allItemsSelected,
  selectedItems,
  someItemsSelected,
  toggleAllItems,
  toggleItem,
  selectedBoxName,
}: TableDataItemProps) {
  if (data?.length) {
    return (
      <Card className="mt-6 p-0">
        <CardContent className="p-2">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  <div className="flex">
                    <Checkbox
                      checked={allItemsSelected}
                      onCheckedChange={toggleAllItems}
                      ref={(el) => {
                        if (el) {
                          const input = el.querySelector('input')
                          if (input) {
                            input.indeterminate = someItemsSelected
                          }
                        }
                      }}
                    />
                  </div>
                </TableHead>
                <TableHead>#</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Condition</TableHead>
                <TableHead>Entry date</TableHead>
                <TableHead />
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <div className="flex">
                      <Checkbox
                        checked={selectedItems.has(item.id)}
                        onCheckedChange={() => toggleItem(item.id)}
                      />
                    </div>
                  </TableCell>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>
                    {formatCurrency(item.price * CENTS_MULTIPLIER)}
                  </TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>{item.condition}</TableCell>
                  <TableCell>
                    {formatDistanceToNow(item.createdAt, {
                      addSuffix: true,
                      locale: ptBR,
                    })}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button size="icon" variant="outline">
                          <MoreHorizontal />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <SaleComponent data={item} />
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="font-medium text-sm transition-colors">
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="font-medium text-sm transition-colors focus:bg-red-400/10 focus:text-red-400">
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    )
  }

  return (
    <EmptyStateItems boxName={selectedBoxName}>
      <FormCreateComponent />
    </EmptyStateItems>
  )
}
