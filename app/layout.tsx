import { Analytics } from '@vercel/analytics/next'
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { LanguageProvider } from '@/lib/language-context'
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

export const metadata: Metadata = {
  title: 'Docket | Government made easy',
  description: 'Verified, step-by-step guidance for official processes in Bangladesh. From company registration to land transfers.',
  icons: {
    icon: '/Docket-logo.png',
    apple: '/Docket-logo.png',
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
        <LanguageProvider>
          {children}
          {/* {process.env.NODE_ENV === 'production' && <Analytics />} */}
        </LanguageProvider>
      </body>
    </html>
  )
}
