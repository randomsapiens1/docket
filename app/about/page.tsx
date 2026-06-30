import { Header } from '@/components/landing/header'
import { Footer } from '@/components/landing/footer'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About',
  description: 'Docket is making government processes accessible to every Bangladeshi, one verified guide at a time.',
}

export default function AboutPage() {
  return (
    <main className="bg-white">
      <Header />

      {/* Hero */}
      <section className="pt-16">
        <Image
          src="/docket-hero.webp"
          alt="Docket"
          width={0}
          height={0}
          sizes="100vw"
          className="w-full h-auto"
          priority
        />
      </section>

      {/* Stats */}
      <section className="px-6 sm:px-10 lg:px-16 py-16 sm:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-gray-100">
          {[
            { stat: '170M+', desc: 'people navigating government processes with little guidance' },
            { stat: '30+', desc: 'separate portals for common services, each with different rules' },
            { stat: '৳Billions', desc: 'lost annually to avoidable mistakes, agents, and delays' },
          ].map((item, i) => (
            <div
              key={i}
              className={[
                'space-y-3 py-10 sm:py-0',
                i > 0 ? 'sm:pl-12 lg:pl-16' : '',
                i < 2 ? 'sm:pr-12 lg:pr-16' : '',
              ].join(' ')}
            >
              <p className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 tracking-tighter">{item.stat}</p>
              <p className="text-sm text-gray-400 leading-relaxed max-w-[220px]">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Statement */}
      <section className="px-6 sm:px-10 lg:px-16 py-16 sm:py-24 border-t border-gray-100">
        <p className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 leading-tight max-w-4xl">
          Millions of Bangladeshis lose time, money, and dignity to paperwork they didn&apos;t know how to do.
        </p>
      </section>

      {/* What we do */}
      <section className="px-6 sm:px-10 lg:px-16 pb-16 sm:pb-24 border-t border-gray-100">
        <div className="grid sm:grid-cols-3 gap-12 sm:gap-8 lg:gap-16 pt-16 sm:pt-20">
          {[
            {
              title: 'Verified guides',
              desc: 'Every pathway is researched against official government portals and updated when rules change. No guesswork.',
            },
            {
              title: 'Secure vault',
              desc: 'Store your NID, TIN, and other documents once. Docket pre-fills checklists automatically.',
            },
            {
              title: 'Step by step',
              desc: 'No legal jargon. No walls of text. Just numbered steps, real links, and honest timelines.',
            },
          ].map((item, i) => (
            <div key={i} className="space-y-5">
              <div className="w-8 h-[3px] bg-[#ff0000]" />
              <h3 className="text-lg font-bold text-gray-900">{item.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Mission */}
      <section className="bg-black px-6 sm:px-10 lg:px-16 py-24 sm:py-36">
        <blockquote className="text-2xl sm:text-3xl lg:text-4xl xl:text-[2.75rem] font-bold text-white leading-tight max-w-5xl">
          Every Bangladeshi, regardless of education, income, or connections, deserves to know exactly what to do, where to go, and how much it costs.
        </blockquote>
        <p className="mt-8 text-[11px] text-white/30 tracking-[0.15em] uppercase">Docket, Dhaka</p>
      </section>

      {/* What Docket is not */}
      <section className="px-6 sm:px-10 lg:px-16 py-16 sm:py-24 border-b border-gray-100">
        <div className="grid lg:grid-cols-[1fr_2fr] gap-16 items-start">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
            What Docket<br />is not
          </h2>
          <div className="grid sm:grid-cols-2 gap-x-12 gap-y-10">
            {[
              { label: 'Not a government agency', desc: "We have no official affiliation. We link to official portals; we don't submit on your behalf." },
              { label: 'Not a law firm', desc: 'Our guides are informational. For legal disputes or complex cases, consult a qualified lawyer.' },
              { label: 'Not an agent service', desc: "We don't charge per application or take commissions. Guidance is free." },
              { label: 'Not always up to the minute', desc: 'We update guides as fast as we can, but always verify on official portals before submitting.' },
            ].map((item, i) => (
              <div key={i} className="space-y-2 pt-5 border-t border-gray-100">
                <p className="text-sm font-bold text-gray-900">{item.label}</p>
                <p className="text-sm text-gray-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 sm:px-10 lg:px-16 py-20 sm:py-28 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
        <p className="text-2xl sm:text-3xl font-bold text-gray-900">Start with a service guide.</p>
        <Link
          href="/services"
          className="shrink-0 inline-flex items-center gap-2 px-7 py-4 rounded-2xl bg-black hover:bg-gray-800 text-white font-semibold text-sm transition-all group"
        >
          Browse services
          <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </section>

      <Footer />
    </main>
  )
}
