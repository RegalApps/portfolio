import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Idea Maze',
  description: 'the winding path of insights, pivots, and lessons that lead to breakthrough products. Here, I share the frameworks, mental models, and hard-won lessons that shape my approach to building and scaling B2B SaaS.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
