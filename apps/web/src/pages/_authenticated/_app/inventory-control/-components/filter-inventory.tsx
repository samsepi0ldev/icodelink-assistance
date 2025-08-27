import { Filter, RefreshCcw, X } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { useSearchFilter } from '@/hook/use-search-filters'

export function FilterInventory() {
  const [searchName, setSearchName] = useState('')
  const [{ name }, setSearchFilter] = useSearchFilter()

  function handleFilter() {
    setSearchFilter({ name: searchName })
  }
  function clearFilters() {
    setSearchFilter({ name: '' })
    setSearchName('')
  }
  return (
    <div className="flex w-fit items-center space-x-2">
      <Input
        onChange={(e) => setSearchName(e.target.value)}
        placeholder="Search for anything"
        value={searchName}
      />
      <Separator
        className="data-[orientation=vertical]:h-5"
        orientation="vertical"
      />
      <Button onClick={handleFilter} variant="secondary">
        <Filter />
        Filter
      </Button>
      <Button disabled={!name} onClick={clearFilters} variant="outline">
        <X />
        Reset
      </Button>
      <Separator
        className="data-[orientation=vertical]:h-5"
        orientation="vertical"
      />
      <Button variant="outline">
        <RefreshCcw />
        Reload
      </Button>
    </div>
  )
}
