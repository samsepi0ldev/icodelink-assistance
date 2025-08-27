import { useState } from 'react'
import { toast } from 'sonner'
import type { Item } from '@/api/item/types'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { formatCurrency } from '@/lib/format-currency'

interface SaleComponentProps {
  data: Item
}

export function SaleComponent({ data }: SaleComponentProps) {
  const maxDiscount = data.maxDiscount
  const steps = 4
  const price = data.price

  const [discount, setDiscount] = useState('0')

  const valueWithDiscount = price * (1 - Number(discount) / 100)

  const discounts = Array.from({ length: steps }, (_, i) => {
    return ((i + 1) * maxDiscount) / steps
  })

  function handleSellItem() {
    const formData = {
      customerId: 1,
      item: {
        itemId: data.id,
        quantity: 1,
        unitePrice: data.price * 100,
        discount: valueWithDiscount * 100,
      },
    }
    toast('Sell Item', {
      description: (
        <pre className="mt-2 w-[320px] rounded-md bg-neutral-950 p-4">
          <code className="text-white">
            {JSON.stringify(formData, null, 2)}
          </code>
        </pre>
      ),
    })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="w-full justify-start px-2 py-1.5 text-sm"
          size={'sm'}
          variant={'ghost'}
        >
          Vender
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Sell component</DialogTitle>
          <DialogDescription>
            Sell components with discount ot no
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center justify-center gap-2">
          <span className="font-bold">
            Price: {formatCurrency(price * 100)}
          </span>
          <Select defaultValue="0" onValueChange={setDiscount}>
            <SelectTrigger className="[&>span]:flex [&>span]:items-center [&>span]:gap-2 [&>span_svg]:shrink-0 [&>span_svg]:text-muted-foreground/80">
              <SelectValue placeholder="Select a discount" />
            </SelectTrigger>
            <SelectContent className="[&_*[role=option]>span>svg]:shrink-0 [&_*[role=option]>span>svg]:text-muted-foreground/80 [&_*[role=option]>span]:start-auto [&_*[role=option]>span]:end-2 [&_*[role=option]>span]:flex [&_*[role=option]>span]:items-center [&_*[role=option]>span]:gap-2 [&_*[role=option]]:ps-2 [&_*[role=option]]:pe-8">
              <SelectGroup>
                <SelectItem value="0">Without discount</SelectItem>
                {discounts.map((d, i) => (
                  <SelectItem key={i.toString()} value={d.toString()}>
                    {d}%
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <p className="text-zinc-400">
            Discount: {formatCurrency(valueWithDiscount * 100)}
          </p>
          <Button className="w-full" onClick={handleSellItem}>
            Sell
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
