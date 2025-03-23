import type React from "react"
import "./globals.css"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "KAZI UNCENSORED",
  description: "PROJECTS. ESSAYS. VIDEOS.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-terminal">{children}</body>
    </html>
  )
}



import './globals.css'