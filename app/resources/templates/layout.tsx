import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Document Templates | Docket',
  description: 'Free downloadable templates for official government documents in Bangladesh.',
  alternates: { canonical: 'https://docket.bd/resources/templates' },
}

export default function TemplatesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
