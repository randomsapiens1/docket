'use client'

import { ExternalLink } from 'lucide-react'
import Image from 'next/image'
import { ScrollReveal } from '@/components/ui/scroll-reveal'
import { useLanguage } from '@/lib/language-context'

const content = {
  en: {
    heading: 'Built on official sources',
    subheading: "We don't guess. We verify.",
    stats: [
      {
        gif: '/document.gif',
        gifAlt: 'Official document',
        value: '100%',
        label: 'Official source backed',
        desc: 'Every step verified against government docs',
      },
      {
        gif: '/update.gif',
        gifAlt: 'Live updates',
        value: 'Live Updates',
        label: 'When rules change, we change',
        desc: 'Monitor gazette notifications & circulars',
      },
      {
        gif: '/delivery.gif',
        gifAlt: 'No fees',
        value: 'No Fees',
        label: 'Completely free',
        desc: 'No intermediaries. No hidden costs.',
      },
    ],
    sourcesLabel: 'Data sourced directly from',
    sources: [
      { label: 'BRTA', url: 'https://brta.gov.bd', desc: 'Road Transport' },
      { label: 'RJSC', url: 'https://www.roc.gov.bd', desc: 'Companies & Firms' },
      { label: 'NBR', url: 'https://nbr.gov.bd', desc: 'Tax Authority' },
      { label: 'BDRIS', url: 'https://bdris.gov.bd', desc: 'Birth & Death' },
      { label: 'DIP', url: 'https://www.dip.gov.bd', desc: 'Passports' },
      { label: 'EC-NID', url: 'https://services.nidw.gov.bd', desc: 'National ID' },
    ],
    cta: 'Found something outdated?',
    ctaLink: 'Report it →',
  },
  bn: {
    heading: 'সরকারি উৎস থেকে যাচাইকৃত',
    subheading: 'আমরা অনুমান করি না। আমরা যাচাই করি।',
    stats: [
      {
        gif: '/document.gif',
        gifAlt: 'সরকারি দলিল',
        value: '১০০%',
        label: 'সরকারি উৎস নিশ্চিত',
        desc: 'প্রতিটি ধাপ সরকারি ডকুমেন্টের বিপরীতে যাচাই করা',
      },
      {
        gif: '/update.gif',
        gifAlt: 'লাইভ আপডেট',
        value: 'লাইভ আপডেট',
        label: 'নিয়ম বদলালে আমরাও বদলাই',
        desc: 'গেজেট বিজ্ঞপ্তি ও সার্কুলার নিয়মিত পর্যবেক্ষণ করা হয়',
      },
      {
        gif: '/delivery.gif',
        gifAlt: 'বিনামূল্যে',
        value: 'বিনামূল্যে',
        label: 'সম্পূর্ণ বিনামূল্যে',
        desc: 'কোনো মধ্যস্থতাকারী নেই। কোনো লুকানো খরচ নেই।',
      },
    ],
    sourcesLabel: 'সরাসরি যে উৎস থেকে তথ্য সংগ্রহ করা হয়েছে',
    sources: [
      { label: 'BRTA', url: 'https://brta.gov.bd', desc: 'সড়ক পরিবহন' },
      { label: 'RJSC', url: 'https://www.roc.gov.bd', desc: 'কোম্পানি ও ফার্ম' },
      { label: 'NBR', url: 'https://nbr.gov.bd', desc: 'কর কর্তৃপক্ষ' },
      { label: 'BDRIS', url: 'https://bdris.gov.bd', desc: 'জন্ম ও মৃত্যু' },
      { label: 'DIP', url: 'https://www.dip.gov.bd', desc: 'পাসপোর্ট' },
      { label: 'EC-NID', url: 'https://services.nidw.gov.bd', desc: 'জাতীয় পরিচয়পত্র' },
    ],
    cta: 'কোনো তথ্য পুরনো মনে হচ্ছে?',
    ctaLink: 'জানান →',
  },
}

export function TrustSection() {
  const { language } = useLanguage()
  const t = content[language]

  return (
    <section id="trust" className="py-20 px-4 sm:px-6 lg:px-8">
      <ScrollReveal animation="scale-up" duration={700}>
        <div className="max-w-6xl mx-auto space-y-14">
          <div className="text-center space-y-3">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
              {t.heading}
            </h2>
            <p className="text-lg text-muted-foreground">{t.subheading}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {t.stats.map(({ gif, gifAlt, value, label, desc }) => (
              <div
                key={label}
                className="rounded-2xl border border-border bg-muted/30 p-6 space-y-3 hover:bg-muted/50 transition-colors"
              >
                <Image src={gif} alt={gifAlt} width={48} height={48} className="w-12 h-12" unoptimized />
                <div className="text-2xl font-bold text-primary">{value}</div>
                <div>
                  <p className="font-semibold text-foreground">{label}</p>
                  <p className="text-sm text-muted-foreground mt-0.5">{desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground text-center">
              {t.sourcesLabel}
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {t.sources.map(({ label, url, desc }) => (
                <a
                  key={label}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm font-medium text-foreground hover:border-primary/40 hover:bg-primary/5 transition-all duration-150"
                >
                  <span>{label}</span>
                  <span className="text-xs text-muted-foreground">· {desc}</span>
                  <ExternalLink className="w-3 h-3 text-muted-foreground/50 group-hover:text-primary/60 transition-colors" />
                </a>
              ))}
            </div>
          </div>

          <div className="pt-6 text-center border-t border-border">
            <p className="text-base font-semibold text-foreground">
              {t.cta}{' '}
              <a
                href="mailto:rajkumaryhere@gmail.com"
                className="text-[#ff0000] underline decoration-2 underline-offset-4 hover:text-[#ff0000]/80"
              >
                {t.ctaLink}
              </a>
            </p>
          </div>
        </div>
      </ScrollReveal>
    </section>
  )
}
