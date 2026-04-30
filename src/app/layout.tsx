import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './Providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Financy — Shaxsiy moliya va xarajatlar tahlili',
  description:
    'Financy orqali kunlik xarajatlaringizni aqlli boshqaring. Zamonaviy va intellektual xarajatlar tahlili ilovasi.',
  keywords: ['xarajat', 'moliya', 'byudjet', 'finance', 'tracker', 'uzbekistan', 'money'],
  authors: [{ name: 'Financy Team' }],
  viewport: 'width=device-width, initial-scale=1',
  manifest: '/manifest.json',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uz" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>{children}</Providers>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js');
                });
              }
            `,
          }}
        />
      </body>
    </html>
  )
}
