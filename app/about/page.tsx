import { Header } from '@/components/landing/header'
import { Footer } from '@/components/landing/footer'
import Link from 'next/link'
import { ArrowRight, FileText, Shield, Zap } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us | Docket',
  description: 'Docket is making government processes accessible to every Bangladeshi — one verified guide at a time.',
}

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gray-50 pt-16">
      <Header />

      {/* Hero */}
      <section className="bg-black text-white px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
        <div className="max-w-4xl mx-auto space-y-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-white/30">About Docket</p>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05]">
            Government,{' '}
            <span className="text-[#ff0000]">demystified.</span>
          </h1>
          <p className="text-lg sm:text-xl text-white/60 max-w-2xl leading-relaxed">
            We believe that navigating official processes in Bangladesh shouldn&apos;t require a lawyer,
            an agent, or insider knowledge. It should just be clear.
          </p>
        </div>
      </section>

      {/* The problem */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl ring-1 ring-black/8 shadow-sm p-8 sm:p-12 space-y-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">The Problem</p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 leading-snug">
              Millions of Bangladeshis lose time, money, and dignity to paperwork they didn&apos;t know how to do.
            </h2>
            <div className="grid sm:grid-cols-3 gap-6 pt-4 border-t border-gray-100">
              {[
                { stat: '170M+', label: 'people navigating government processes with little guidance' },
                { stat: '30+', label: 'separate portals for common services — each with different rules' },
                { stat: '৳Billions', label: 'lost annually to avoidable mistakes, agents, and delays' },
              ].map((item, i) => (
                <div key={i} className="space-y-1">
                  <p className="text-3xl font-bold text-[#ff0000]">{item.stat}</p>
                  <p className="text-sm text-gray-500 leading-snug">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* What we do */}
      <section className="px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20">
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              {
                icon: FileText,
                title: 'Verified guides',
                desc: 'Every pathway is researched against official government portals and updated when rules change. No guesswork.',
              },
              {
                icon: Shield,
                title: 'Secure vault',
                desc: 'Store your NID, TIN, and other documents once. Docket pre-fills checklists automatically.',
              },
              {
                icon: Zap,
                title: 'Step-by-step',
                desc: 'No legal jargon. No walls of text. Just numbered steps, real links, and honest timelines.',
              },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-2xl ring-1 ring-black/8 shadow-sm p-6 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#ff0000]/8 flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-[#ff0000]" />
                </div>
                <h3 className="font-semibold text-gray-900">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission statement */}
      <section className="px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20">
        <div className="max-w-4xl mx-auto">
          <div className="bg-[#ff0000] rounded-2xl p-8 sm:p-12 space-y-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-white/60">Our Mission</p>
            <blockquote className="text-2xl sm:text-3xl font-bold text-white leading-snug">
              &ldquo;Every Bangladeshi — regardless of education, income, or connections —
              deserves to know exactly what to do, where to go, and how much it costs.&rdquo;
            </blockquote>
            <p className="text-white/70 text-sm pt-2">Docket Team, Dhaka</p>
          </div>
        </div>
      </section>

      {/* What we are not */}
      <section className="px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl ring-1 ring-black/8 shadow-sm p-8 sm:p-10 space-y-5">
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">Transparency</p>
            <h2 className="text-2xl font-bold text-gray-900">What Docket is not</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { label: 'Not a government agency', desc: 'We have no official affiliation. We link to official portals; we don\'t submit on your behalf.' },
                { label: 'Not a law firm', desc: 'Our guides are informational. For legal disputes or complex cases, consult a qualified lawyer.' },
                { label: 'Not an agent service', desc: 'We don\'t charge per application or take commissions. Guidance is free.' },
                { label: 'Not always up to the minute', desc: 'We update guides as fast as we can, but always verify on official portals before submitting.' },
              ].map((item, i) => (
                <div key={i} className="flex gap-3 p-4 rounded-xl bg-gray-50 ring-1 ring-black/5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ff0000] shrink-0 mt-2" />
                  <div className="space-y-0.5">
                    <p className="text-sm font-semibold text-gray-900">{item.label}</p>
                    <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 sm:px-6 lg:px-8 pb-24">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 bg-white rounded-2xl ring-1 ring-black/8 shadow-sm px-8 py-8">
            <div className="space-y-1">
              <h3 className="text-xl font-bold text-gray-900">Start with a service guide</h3>
              <p className="text-sm text-gray-500">Pick any government process and see how simple it can be.</p>
            </div>
            <Link
              href="/services"
              className="shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-black hover:bg-gray-800 text-white font-semibold text-sm transition-all shadow-sm group"
            >
              Browse services
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
