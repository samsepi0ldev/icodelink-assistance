import { Folder, FolderOpen, MoreHorizontal, Trash2Icon } from 'lucide-react'
import { toast } from 'sonner'
import { useDeleteBox } from '@/api/boxes/mutations'
import { useSearchFilter } from '@/hook/use-search-filters'
import { Button } from './ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'

interface BoxComponentProps {
  name: string
  id: number
}

export function BoxComponent({ id, name }: BoxComponentProps) {
  const [{ box }, setSearchFilter] = useSearchFilter()
  const deleteBox = useDeleteBox()
  const isActive = box === id

  function handleDeleteBox() {
    deleteBox.mutate(id, {
      onSuccess: () => toast('Box deleted with success!'),
    })
  }

  return (
    <div className="group flex items-center justify-between gap-2">
      <Button
        className="w-full flex-1 justify-start"
        onClick={() => setSearchFilter({ box: id })}
        size={'sm'}
        variant={isActive ? 'secondary' : 'ghost'}
      >
        {isActive ? (
          <FolderOpen className="text-zinc-500" />
        ) : (
          <Folder className="text-zinc-500" />
        )}
        {name}
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            className="size-8 p-0 opacity-0 transition-opacity group-hover:opacity-100 data-[state=open]:opacity-100"
            size="sm"
            variant="ghost"
          >
            <MoreHorizontal className="size-4" />
            <span className="sr-only">Abrir menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-fit">
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={handleDeleteBox}>
              <Trash2Icon className="size-4" />
              Excluir
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
