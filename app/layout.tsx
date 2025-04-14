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
  metadataBase: new URL('https://kazi-portfolio.vercel.app'),
  openGraph: {
    title: "Kazi Hossain",
    description: "Builder, founder, and creator focused on B2B SaaS and startups",
    url: "https://www.kazihossain.com",
    siteName: "Kazi Hossain",
    images: [
      {
        // Instagram DM link preview (square format)
        url: '/images/Kazi_ig.png',
        width: 1080,
        height: 1080,
        alt: 'Kazi Hossain'
      },
      {
        // Other platforms (Facebook, Twitter, LinkedIn)
        url: '/images/Kazi_fb.png',
        width: 1200,
        height: 628,
        alt: 'Kazi Hossain'
      }
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kazi Hossain",
    description: "Builder, founder, and creator focused on B2B SaaS and startups",
    images: ['/images/Kazi_fb.png'],
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
              url: 'https://www.kazihossain.com',
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