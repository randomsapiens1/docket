'use client'

import { Header } from '@/components/landing/header'
import { Footer } from '@/components/landing/footer'
import { FeeCalculator } from '@/components/calculators/fee-calculator'

export const dynamic = 'force-dynamic'

export default function CalculatorPage() {
  return (
    <main className="min-h-screen bg-[#f3f2f1] pt-16">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl sm:text-5xl font-black text-black leading-tight">
            Registration Fee Calculator
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get an instant estimate of government fees and stamp duties required to register your business in Bangladesh.
          </p>
        </div>

        <FeeCalculator />

        <div className="bg-white border-2 border-black p-8 space-y-4">
          <h2 className="text-xl font-bold">About the Calculation</h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            The fees are calculated based on the latest notification from the Registrar of Joint Stock Companies and Firms (RJSC) as of July 26, 2023. This includes:
          </p>
          <ul className="list-disc list-inside text-sm text-gray-600 space-y-2 pl-4">
            <li><strong>Stamp Duty:</strong> Applied to the Memorandum (MoA) and Articles of Association (AoA) based on capital tiers.</li>
            <li><strong>Registration Fee:</strong> Calculated based on the authorized share capital (Private/Public) or membership (Trade Org).</li>
            <li><strong>Filing Fees:</strong> Fixed costs for submitting mandatory digital forms (Forms I, VI, IX, X, XII, etc.).</li>
          </ul>
        </div>
      </div>

      <Footer />
    </main>
  )
}
