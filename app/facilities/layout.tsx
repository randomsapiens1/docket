import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Docket | Government Facilities & Benefits Finder',
  description: 'Discover verified allowances, subsidies, grants, and support structures provided by the government of Bangladesh.',
  alternates: {
    canonical: 'https://docket.bd/facilities',
  },
}

export default function FacilitiesLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <>{children}</>
}
