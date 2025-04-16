import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from "@vercel/speed-insights/next"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Kazi Hossain",
  description: "Founder, creator and lover of B2B SaaS",
  metadataBase: new URL('https://www.kazihossain.com'),
  openGraph: {
    title: "Kazi Hossain",
    description: "Founder, creator and lover of B2B SaaS",
    url: "https://www.kazihossain.com",
    siteName: "Kazi Hossain",
    images: [
      {
        // Facebook, Twitter, LinkedIn (1.91:1 ratio)
        url: '/images/Kazi_fb.png',
        width: 1200,
        height: 628,
        alt: 'Kazi Hossain'
      },
      {
        // Instagram DM link preview (1:1 ratio)
        url: '/images/Kazi_ig.png',
        width: 1080,
        height: 1080,
        alt: 'Kazi Hossain'
      }
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kazi Hossain",
    description: "Founder, creator and lover of B2B SaaS",
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
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Kazi Hossain" />
        <meta name="twitter:description" content="Founder, creator and lover of B2B SaaS" />
        <meta name="twitter:image" content="https://www.kazihossain.com/images/Kazi_fb.png" />
        <meta name="twitter:creator" content="@kazihossain" />
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
              description: 'Founder, creator and lover of B2B SaaS',
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