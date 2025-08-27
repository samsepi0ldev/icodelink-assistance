import { createFileRoute } from '@tanstack/react-router'
import {
  ArrowRight,
  HardDriveIcon,
  MoreHorizontal,
  PackagePlus,
  Plus,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import ViewsCountChart from '@/components/view-chart'

export const Route = createFileRoute('/_authenticated/_app/inventory-control/_overview/')({
  component: Overview,
})

function Overview() {
  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      <div className="relative rounded border border-accent bg-zinc-950">
        <div className="flex justify-between p-4">
          <div className="flex flex-col">
            <span className="font-medium text-xl">Components</span>
            <span className="text-xs text-zinc-400">30 component(s)</span>
          </div>
          <Button size="icon" variant={'outline'}>
            <MoreHorizontal />
          </Button>
        </div>
        <div className="h-24">
          <ViewsCountChart
            dates={['', '', '', '', '', '', '']}
            views={[40, 30, 40, 10, 20, 50, 30]}
          />
        </div>
        <div className="flex items-center justify-between bg-zinc-900 px-4 py-1">
          <div className="flex items-center gap-2 text-xs">
            <HardDriveIcon className="size-4" />
            10MB
          </div>
          <Button size={'sm'} variant={'outline'}>
            Parts and metrics
            <ArrowRight />
          </Button>
        </div>
      </div>
      <div className="relative rounded border border-accent bg-zinc-950">
        <div className="flex justify-between p-4">
          <div className="flex flex-col">
            <span className="font-medium text-xl">Parts</span>
            <span className="text-xs text-zinc-400">30 component(s)</span>
          </div>
          <Button size="icon" variant={'outline'}>
            <MoreHorizontal />
          </Button>
        </div>
        <div className="h-24">
          <ViewsCountChart
            dates={['', '', '', '', '', '', '']}
            views={[0, 0, 0, 0, 0, 0, 0]}
          />
        </div>
        <div className="flex items-center justify-between bg-zinc-900 px-4 py-1">
          <div className="flex items-center gap-2 text-xs">
            <HardDriveIcon className="size-4" />
            10MB
          </div>
          <Button size={'sm'} variant={'outline'}>
            Parts and metrics
            <ArrowRight />
          </Button>
        </div>
      </div>
      <div className="flex flex-col justify-center gap-0.5 rounded border border-zinc-900 bg-zinc-950 p-10">
        <PackagePlus />
        <span className="font-medium text-lg">Create a storage box</span>
        <span className="text-sm text-zinc-500">
          Register storage spaces to organize your goods
        </span>
        <Button className="mt-4" size={'sm'} variant={'secondary'}>
          <Plus />
          Register new storage box
        </Button>
      </div>
    </div>
  )
}
