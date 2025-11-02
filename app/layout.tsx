import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Pavos Fran',
  description: 'Fortnite V-Bucks and items',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}