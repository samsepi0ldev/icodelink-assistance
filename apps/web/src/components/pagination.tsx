import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react'
import { parseAsInteger, useQueryState } from 'nuqs'
import { useSearchFilter } from '@/hooks/use-search-filters'
import { Button } from './ui/button'

interface PaginationProps {
  total: number
  totalPages: number
}

export function Pagination({ total, totalPages }: PaginationProps) {
  const [{ page }, setSearchFilter] = useSearchFilter()
  const showing = 10

  const alreadyLastPage = page === totalPages
  const alreadyFirstPage = page === 1

  function nextPage() {
    if (page < totalPages) {
      setSearchFilter({ page: page + 1 })
    }
  }
  function prevPage() {
    if (page >= totalPages && page > 1) {
      setSearchFilter({ page: page - 1 })
    }
  }
  return (
    <div className="flex items-center justify-between py-4">
      <span className="text-sm text-zinc-400">
        Showing {showing} of {total} components.
      </span>
      <div className="space-x-2">
        <span className="text-sm text-zinc-400">
          Page {page} of {totalPages}
        </span>
        <Button
          disabled={alreadyFirstPage}
          onClick={() => setSearchFilter({ page: 1 })}
          size="icon"
          variant={'outline'}
        >
          <ChevronsLeft />
        </Button>
        <Button
          disabled={alreadyFirstPage}
          onClick={prevPage}
          size="icon"
          variant={'outline'}
        >
          <ChevronLeft />
        </Button>
        <Button
          disabled={alreadyLastPage}
          onClick={nextPage}
          size="icon"
          variant={'outline'}
        >
          <ChevronRight />
        </Button>
        <Button
          disabled={alreadyLastPage}
          onClick={() => setSearchFilter({ page: totalPages })}
          size="icon"
          variant={'outline'}
        >
          <ChevronsRight />
        </Button>
      </div>
    </div>
  )
}
