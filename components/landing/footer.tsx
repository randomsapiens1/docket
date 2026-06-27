'use client'

import Image from "next/image"
import Link from "next/link"
import { useLanguage } from "@/lib/language-context"
import { ArrowRight } from "lucide-react"

const content = {
  en: {
    ctaTitle: "Ready to cut through the bureaucracy?",
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
          { label: "About Us", href: "#" },
          { label: "Official Blog", href: "#" },
          { label: "Contact Support", href: "#" }
        ]
      },
      {
        title: "Legal",
        links: [
          { label: "Privacy Policy", href: "#" },
          { label: "Terms of Service", href: "#" }
        ]
      }
    ],
    rights: "© 2026 docket. All rights reserved.",
    footerNote: "Made in Bangladesh for Bangladeshis."
  },
  bn: {
    ctaTitle: "সরকারি আমলাতান্ত্রিক জটিলতা এড়াতে প্রস্তুত?",
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
          { label: "আমাদের সম্পর্কে", href: "#" },
          { label: "অফিশিয়াল ব্লগ", href: "#" },
          { label: "যোগাযোগ", href: "#" }
        ]
      },
      {
        title: "আইনি তথ্য",
        links: [
          { label: "প্রাইভেসি পলিসি", href: "#" },
          { label: "ব্যবহারের শর্তাবলী", href: "#" }
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
    <footer className="bg-[#e00000] text-white select-none relative overflow-hidden">
      {/* Ambient depth layers */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/3 w-[600px] h-[400px] bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[300px] bg-black/10 rounded-full blur-3xl" />
      </div>

      {/* CTA Section */}
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="bg-white/10 backdrop-blur-sm ring-1 ring-white/20 rounded-3xl px-8 py-14 sm:px-14 text-center space-y-6 shadow-xl shadow-black/10">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight text-white">
            {t.ctaTitle}
          </h2>
          <p className="text-sm sm:text-base text-white/70 max-w-2xl mx-auto leading-relaxed">
            {t.ctaSubtitle}
          </p>
          <div>
            <Link href="/services">
              <button className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-white hover:bg-gray-50 text-[#e00000] font-semibold text-sm transition-all duration-200 shadow-lg shadow-black/15 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 group">
                {t.ctaBtn}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-150" />
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Links Grid */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-white/15">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">

          {/* Logo & Description */}
          <div className="space-y-4 md:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 w-fit group">
              <div className="w-8 h-8 rounded-xl bg-white/15 ring-1 ring-white/25 flex items-center justify-center group-hover:bg-white/25 transition-colors duration-150">
                <Image
                  src="/docket-logo.png"
                  alt="docket logo"
                  width={20}
                  height={20}
                  className="w-5 h-5 object-contain"
                />
              </div>
              <span className="text-xl font-bold tracking-tighter text-white">docket</span>
            </Link>
            <p className="text-sm text-white/60 max-w-xs leading-relaxed">
              {t.desc}
            </p>
          </div>

          {/* Link Columns */}
          {t.columns.map((col, idx) => (
            <div key={idx} className="space-y-4">
              <h4 className="text-xs font-semibold uppercase tracking-widest text-white/50">
                {col.title}
              </h4>
              <ul className="space-y-2.5">
                {col.links.map((link, lIdx) => (
                  <li key={lIdx}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/70 hover:text-white transition-colors duration-150"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/15 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-white/40">
          <p>{t.rights}</p>
          <p>{t.footerNote}</p>
        </div>
      </div>
    </footer>
  )
}
