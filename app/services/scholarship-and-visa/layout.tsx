import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Docket | Study Abroad Scholarships & Student Visas Guide',
  description: 'Comprehensive, step-by-step directory and tracking portal for global scholarships and student visas. Track documents, requirements, and application deadlines.',
  keywords: ['scholarships study abroad', 'student visa requirements', 'study visa checklist', 'fully funded scholarships', 'visa document vault'],
}

export default function ServiceLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
