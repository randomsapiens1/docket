'use client'

import { Header } from '@/components/landing/header'
import { Footer } from '@/components/landing/footer'
import { useLanguage } from '@/lib/language-context'
import { ArrowRight, Clock } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { trackEvent } from '@/lib/analytics'

const content = {
  en: {
    heading: 'Quick Access Tools',
    subheading: 'Free calculators and lookup tools for common government processes in Bangladesh.',
    liveBadge: 'Live',
    soonBadge: 'Coming Soon',
    tools: [
      {
        title: 'Registration Fee Calculator',
        desc: 'Estimate government fees and stamp duties for registering a business with RJSC.',
        gif: '/delivery.gif',
        href: '/calculators/fee-calculator',
        status: 'live',
      },
      {
        title: 'Document Checklist Generator',
        desc: 'Get a personalised checklist of required documents for any official process.',
        gif: '/document.gif',
        href: null,
        status: 'soon',
      },
      {
        title: 'Stamp Duty Estimator',
        desc: 'Calculate stamp duties for property transfers, agreements, and affidavits.',
        gif: '/business-plan.gif',
        href: null,
        status: 'soon',
      },
      {
        title: 'Trade License Fee Lookup',
        desc: 'Find exact trade license fees by business type and city corporation zone.',
        gif: '/soft-skills.gif',
        href: null,
        status: 'soon',
      },
      {
        title: 'TIN Eligibility Checker',
        desc: 'Determine if you or your business is required to register for a TIN with NBR.',
        gif: '/growth.gif',
        href: null,
        status: 'soon',
      },
      {
        title: 'Processing Time Estimator',
        desc: 'Get realistic timelines for any government application based on current data.',
        gif: '/update.gif',
        href: null,
        status: 'soon',
      },
    ],
  },
  bn: {
    heading: 'দ্রুত অ্যাক্সেস টুলস',
    subheading: 'বাংলাদেশের সরকারি প্রক্রিয়াগুলির জন্য বিনামূল্যে ক্যালকুলেটর ও লুকআপ টুল।',
    liveBadge: 'লাইভ',
    soonBadge: 'শীঘ্রই আসছে',
    tools: [
      {
        title: 'নিবন্ধন ফি ক্যালকুলেটর',
        desc: 'RJSC-তে ব্যবসা নিবন্ধনের জন্য সরকারি ফি ও স্ট্যাম্প ডিউটির আনুমানিক হিসাব করুন।',
        gif: '/delivery.gif',
        href: '/calculators/fee-calculator',
        status: 'live',
      },
      {
        title: 'ডকুমেন্ট চেকলিস্ট জেনারেটর',
        desc: 'যেকোনো সরকারি প্রক্রিয়ার জন্য প্রয়োজনীয় কাগজপত্রের ব্যক্তিগত চেকলিস্ট পান।',
        gif: '/document.gif',
        href: null,
        status: 'soon',
      },
      {
        title: 'স্ট্যাম্প ডিউটি এস্টিমেটর',
        desc: 'সম্পত্তি হস্তান্তর, চুক্তি ও হলফনামার জন্য স্ট্যাম্প ডিউটি হিসাব করুন।',
        gif: '/business-plan.gif',
        href: null,
        status: 'soon',
      },
      {
        title: 'ট্রেড লাইসেন্স ফি লুকআপ',
        desc: 'ব্যবসার ধরন ও সিটি কর্পোরেশন জোন অনুযায়ী ট্রেড লাইসেন্স ফি খুঁজুন।',
        gif: '/soft-skills.gif',
        href: null,
        status: 'soon',
      },
      {
        title: 'টিন যোগ্যতা পরীক্ষক',
        desc: 'আপনি বা আপনার ব্যবসার NBR-এ TIN নিবন্ধন প্রয়োজন কিনা নির্ধারণ করুন।',
        gif: '/growth.gif',
        href: null,
        status: 'soon',
      },
      {
        title: 'প্রক্রিয়াকরণ সময় এস্টিমেটর',
        desc: 'বর্তমান তথ্যের ভিত্তিতে যেকোনো সরকারি আবেদনের বাস্তবসম্মত সময়সীমা জানুন।',
        gif: '/update.gif',
        href: null,
        status: 'soon',
      },
    ],
  },
}

export default function ToolsPage() {
  const { language } = useLanguage()
  const t = content[language]

  return (
    <main className="min-h-screen bg-background pt-16">
      <Header />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        <div className="space-y-3">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            {t.heading}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            {t.subheading}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {t.tools.map((tool) => {
            const card = (
              <div className={`group rounded-2xl border bg-muted/20 p-6 space-y-4 transition-all duration-150 h-full flex flex-col ${
                tool.status === 'live'
                  ? 'border-border hover:border-primary/40 hover:bg-muted/40 cursor-pointer'
                  : 'border-border opacity-60'
              }`}>
                <div className="flex items-start justify-between gap-3">
                  <Image
                    src={tool.gif}
                    alt={tool.title}
                    width={48}
                    height={48}
                    className="w-12 h-12"
                    unoptimized
                  />
                  <span className={`shrink-0 inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                    tool.status === 'live'
                      ? 'bg-primary/10 text-primary'
                      : 'bg-muted text-muted-foreground'
                  }`}>
                    {tool.status === 'soon' && <Clock className="w-3 h-3" />}
                    {tool.status === 'live' ? t.liveBadge : t.soonBadge}
                  </span>
                </div>
                <div className="flex-1 space-y-1.5">
                  <p className="font-semibold text-foreground">{tool.title}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{tool.desc}</p>
                </div>
                {tool.status === 'live' && (
                  <div className="flex items-center gap-1 text-sm font-semibold text-primary">
                    {language === 'en' ? 'Open tool' : 'টুল খুলুন'}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                )}
              </div>
            )

            return tool.href ? (
              <Link key={tool.title} href={tool.href} className="flex" onClick={() => trackEvent('click_tool', { tool_name: tool.title })}>
                {card}
              </Link>
            ) : (
              <div key={tool.title} className="flex">
                {card}
              </div>
            )
          })}
        </div>
      </div>

      <Footer />
    </main>
  )
}
