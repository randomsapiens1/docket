'use client'

import Image from "next/image"
import Link from "next/link"
import { useLanguage } from "@/lib/language-context"
import { ArrowRight } from "lucide-react"

const content = {
  en: {
    ctaTitle: "Government shouldn't be this hard to navigate.",
    ctaSubtitle: "Start your first process today. No signup. No credit card. Just clear, verified guidance.",
    ctaBtn: "Get Started Free",
    desc: "Making government processes accessible to everyone.",
    columns: [
      {
        title: "Product",
        links: [
          { label: "Services Directory", href: "/services" },
          { label: "Document Vault", href: "/vault" },
          { label: "Fee Calculator", href: "/calculators/fee-calculator" }
        ]
      },
      {
        title: "Company",
        links: [
          { label: "About Us", href: "/about" },
          { label: "Official Blog", href: "#" },
          { label: "Contact Support", href: "#" }
        ]
      },
      {
        title: "Legal",
        links: [
          { label: "Privacy Policy", href: "/privacy-policy" },
          { label: "Terms of Service", href: "/terms-of-service" }
        ]
      }
    ],
    rights: "© 2026 docket. All rights reserved.",
    footerNote: "Made in Bangladesh for Bangladeshis."
  },
  bn: {
    ctaTitle: "সরকারি কাজ এত কঠিন হওয়ার কথা না।",
    ctaSubtitle: "আজই আপনার প্রথম কাজ শুরু করুন। কোনো সাইন-আপ বা ক্রেডিট কার্ড লাগবে না। শুধু সঠিক এবং যাচাইকৃত নির্দেশিকা।",
    ctaBtn: "ফ্রি শুরু করুন",
    desc: "সরকারি সেবা ও নির্দেশিকাসমূহ সকলের জন্য সহজলভ্য করা।",
    columns: [
      {
        title: "প্রোডাক্ট",
        links: [
          { label: "সেবা ডিরেক্টরি", href: "/services" },
          { label: "ডকুমেন্ট ভল্ট", href: "/vault" },
          { label: "ফি ক্যালকুলেটর", href: "/calculators/fee-calculator" }
        ]
      },
      {
        title: "কোম্পানি",
        links: [
          { label: "আমাদের সম্পর্কে", href: "/about" },
          { label: "অফিশিয়াল ব্লগ", href: "#" },
          { label: "যোগাযোগ", href: "#" }
        ]
      },
      {
        title: "আইনি তথ্য",
        links: [
          { label: "প্রাইভেসি পলিসি", href: "/privacy-policy" },
          { label: "ব্যবহারের শর্তাবলী", href: "/terms-of-service" }
        ]
      }
    ],
    rights: "© ২০২৬ ডকেট। সর্বস্বত্ব সংরক্ষিত।",
    footerNote: "বাংলাদেশিদের জন্য তৈরি।"
  }
}

export function Footer() {
  const { language } = useLanguage()
  const t = content[language]

  return (
    <footer className="bg-[#0a0a0a] text-white select-none">

      {/* CTA Band */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10">
            <div className="space-y-4 max-w-2xl">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05] text-white">
                {t.ctaTitle}
              </h2>
              <p className="text-base text-white/50 leading-relaxed max-w-lg">
                {t.ctaSubtitle}
              </p>
            </div>
            <div className="shrink-0">
              <Link
                href="/services"
                className="group inline-flex items-center gap-3 px-7 py-4 bg-[#ff0000] hover:bg-[#e00000] text-white font-semibold text-sm rounded-xl transition-all duration-200 shadow-lg shadow-[#ff0000]/20"
              >
                {t.ctaBtn}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-150" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Links Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 md:gap-12">

          {/* Brand column */}
          <div className="col-span-2 space-y-5">
            <Link href="/" className="flex items-center gap-2.5 w-fit group">
              <div className="w-8 h-8 bg-[#ff0000] rounded-lg flex items-center justify-center shrink-0">
                <Image
                  src="/docket-logo.png"
                  alt="docket logo"
                  width={18}
                  height={18}
                  className="w-4.5 h-4.5 object-contain brightness-0 invert"
                />
              </div>
              <span className="text-lg font-bold tracking-tight text-white">docket</span>
            </Link>
            <p className="text-sm text-white/40 leading-relaxed max-w-[220px]">
              {t.desc}
            </p>
          </div>

          {/* Link columns */}
          {t.columns.map((col, idx) => (
            <div key={idx} className="space-y-4">
              <h4 className="text-[10px] font-semibold uppercase tracking-widest text-white/30">
                {col.title}
              </h4>
              <ul className="space-y-3">
                {col.links.map((link, lIdx) => (
                  <li key={lIdx}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/60 hover:text-white transition-colors duration-150"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white/30">{t.rights}</p>
          <p className="text-xs text-white/30">{t.footerNote}</p>
        </div>
      </div>

    </footer>
  )
}
