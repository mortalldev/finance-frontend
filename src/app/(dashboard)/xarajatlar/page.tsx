'use client'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useGetXarajatlarQuery } from '@/shared/api/xarajatApi'
import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import { Search, Plus, LayoutGrid, List as ListIcon } from 'lucide-react'
import { XarajatCreateModal } from '@/features/xarajat-crud/ui/XarajatCreateModal'
import { XarajatTable } from '@/widgets/XarajatTable'
import { LoadMoreButton } from '@/shared/ui/LoadMoreButton'
import useDebounce from '@/shared/hooks/useDebounce'
import { Loader } from '@/shared/ui/Loader'

export default function XarajatlarPage() {
  const { t } = useTranslation()
  const [view, setView] = useState<'table' | 'card'>('table')
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce(search, 400)
  const [page, setPage] = useState(1)
  const [isCreateOpen, setIsCreateOpen] = useState(false)

  const { data, isLoading, isFetching } = useGetXarajatlarQuery({
    page,
    limit: 10,
    search: debouncedSearch,
  })

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
    setPage(1)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="text-2xl font-bold">{t('xarajat.title')}</h1>
        <Button onClick={() => setIsCreateOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> {t('xarajat.add')}
        </Button>
      </div>

      <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute top-2.5 left-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder={t('xarajat.search')}
            className="pl-9"
            value={search}
            onChange={handleSearchChange}
          />
        </div>
        <div className="flex self-end rounded-md bg-gray-100 p-1 sm:self-auto dark:bg-gray-800">
          <button
            className={`rounded p-2 ${view === 'table' ? 'bg-white shadow-sm dark:bg-gray-700' : ''}`}
            onClick={() => setView('table')}
          >
            <ListIcon size={18} />
          </button>
          <button
            className={`rounded p-2 ${view === 'card' ? 'bg-white shadow-sm dark:bg-gray-700' : ''}`}
            onClick={() => setView('card')}
          >
            <LayoutGrid size={18} />
          </button>
        </div>
      </div>

      {isLoading && page === 1 ? <Loader /> : <XarajatTable data={data?.data || []} view={view} />}

      <LoadMoreButton
        onClick={() => setPage((p) => p + 1)}
        disabled={!data?.meta?.hasMore}
        loading={isFetching}
      />

      <XarajatCreateModal isOpen={isCreateOpen} onClose={() => setIsCreateOpen(false)} />
    </div>
  )
}
