'use client'
import { useTranslation } from 'react-i18next'
import { Home, List, Settings } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function MobileNav() {
  const { t } = useTranslation()
  const pathname = usePathname()

  const navs = [
    { name: t('dashboard.title'), path: '/', icon: <Home size={20} /> },
    { name: t('xarajat.title'), path: '/xarajatlar', icon: <List size={20} /> },
    { name: t('settings.title'), path: '/settings', icon: <Settings size={20} /> },
  ]

  return (
    <nav className="fixed right-0 bottom-0 left-0 z-50 border-t border-gray-200 bg-white pb-[env(safe-area-inset-bottom)] md:hidden dark:border-gray-700 dark:bg-gray-800">
      <div className="flex items-center justify-around p-2">
        {navs.map((n) => {
          const isActive = pathname === n.path
          return (
            <Link
              key={n.path}
              href={n.path}
              className={`flex flex-col items-center rounded-lg p-2 transition-colors ${isActive ? 'text-blue-600' : 'text-gray-500 hover:text-gray-900 dark:hover:text-gray-100'}`}
            >
              {n.icon}
              <span className="mt-1 text-[10px]">{n.name}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
