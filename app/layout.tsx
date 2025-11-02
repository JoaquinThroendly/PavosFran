// app/layout.tsx - VERSIÓN CORREGIDA
import type { Metadata } from 'next'
import './styles.css'  // ← CAMBIADO: globals.css por styles.css

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