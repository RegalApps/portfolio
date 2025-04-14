import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from "@vercel/speed-insights/next"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Kazi Hossain",
  description: "Builder, founder, and creator focused on B2B SaaS and startups",
  metadataBase: new URL('https://kazi.vercel.app'),
  openGraph: {
    title: "Kazi Hossain",
    description: "Builder, founder, and creator focused on B2B SaaS and startups",
    url: "https://kazi.vercel.app",
    siteName: "Kazi Hossain",
    images: [
      {
        url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/kazi-profile-pic-5XEtZtPcLHNKpQPrEYxaUXsXqwgBMm.png",
        width: 1200,
        height: 1200,
        alt: "Kazi Hossain"
      }
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kazi Hossain",
    description: "Builder, founder, and creator focused on B2B SaaS and startups",
    images: ["https://hebbkx1anhila5yf.public.blob.vercel-storage.com/kazi-profile-pic-5XEtZtPcLHNKpQPrEYxaUXsXqwgBMm.png"],
    creator: "@kazihossain"
  },
  robots: {
    index: true,
    follow: true
  }
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