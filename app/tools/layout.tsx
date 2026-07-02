import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Quick Tools | Docket',
  description: 'Free calculators and lookup tools for common government processes in Bangladesh.',
  alternates: { canonical: 'https://docket.bd/tools' },
}

export default function ToolsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
