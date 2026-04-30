import * as React from 'react'
import { Button } from '@/shared/ui/button'
import { useTranslation } from 'react-i18next'

export function LoadMoreButton({
  onClick,
  disabled,
  loading,
}: {
  onClick: () => void
  disabled?: boolean
  loading?: boolean
}) {
  const { t } = useTranslation()
  if (disabled) return null

  return (
    <div className="mt-4 flex justify-center">
      <Button variant="secondary" onClick={onClick} disabled={loading}>
        {loading ? '...' : t('xarajat.loadMore')}
      </Button>
    </div>
  )
}
