"use client"

import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from "@vercel/speed-insights/next"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "KAZI UNCENSORED",
  description: "Projects, essays, and videos on startups, building, and founder DNA by Kazi Hossain.",
  generator: 'v0.dev',
  icons: {
    icon: '/icon.ico'
  },
  openGraph: {
    title: "KAZI UNCENSORED",
    description: "Projects, essays, and videos on startups, building, and founder DNA by Kazi Hossain.",
    type: 'website',
    siteName: "KAZI UNCENSORED"
  },
  twitter: {
    title: "KAZI UNCENSORED",
    description: "Projects, essays, and videos on startups, building, and founder DNA by Kazi Hossain.",
    card: 'summary_large_image',
    creator: '@kazihossain'
  },
  alternates: {
    canonical: 'https://kazi.vercel.app'
  },
  authors: [{ name: "Kazi Hossain" }],
  keywords: ['Kazi Hossain', 'KAZI UNCENSORED', 'startups', 'founder', 'building', 'tech', 'B2B SaaS'],
  category: 'technology'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Kazi Hossain',
              alternateName: 'KAZI UNCENSORED',
              url: 'https://kazi.vercel.app',
              jobTitle: 'Founder',
              description: 'Builder, founder, and creator focused on B2B SaaS and startups',
              sameAs: [
                'https://linkedin.com/in/kazihossain',
                'https://twitter.com/kazihossain'
              ]
            })
          }}
        />
      </head>
      <body className={inter.className}>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}