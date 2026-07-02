import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { LanguageProvider } from '@/lib/language-context'
import Script from 'next/script'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
})
const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#ffffff',
}

const siteUrl = 'https://docket.bd'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Docket | Government made easy',
    template: '%s | Docket',
  },
  description: 'Verified, step-by-step guidance for official government processes in Bangladesh. From company registration to land transfers, passports to TIN registration.',
  keywords: ['Bangladesh government services', 'government processes Bangladesh', 'NID Bangladesh', 'TIN registration', 'company registration Bangladesh', 'passport Bangladesh', 'trade license Dhaka'],
  authors: [{ name: 'Docket', url: siteUrl }],
  creator: 'Docket',
  publisher: 'Docket',
  icons: {
    icon: '/docket-fevicon.svg',
    shortcut: '/docket-fevicon.svg',
    apple: '/docket-logo.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'Docket',
    title: 'Docket | Government made easy',
    description: 'Verified, step-by-step guidance for official government processes in Bangladesh.',
    images: [
      {
        url: '/docket-hero.webp',
        width: 1200,
        height: 630,
        alt: 'Docket — Government made easy',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Docket | Government made easy',
    description: 'Verified, step-by-step guidance for official government processes in Bangladesh.',
    images: ['/docket-hero.webp'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
  verification: {
    other: {
      'msvalidate.01': '0669917BC4F71EFFDF1E81F8F807827F',
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="font-sans antialiased">
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-M9EMW509XZ" strategy="afterInteractive" />
        <Script id="gtag-init" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          window.gtag = function(){window.dataLayer.push(arguments);}
          window.gtag('js', new Date());
          window.gtag('config', 'G-M9EMW509XZ');
        `}</Script>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  )
}
