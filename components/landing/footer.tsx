'use client'

import Image from "next/image"
import Link from "next/link"
import { useLanguage } from "@/lib/language-context"

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
    ctaTitle: "সরকারি আমলাতান্ত্রিক জটিলতা এড়াতে প্রস্তুত?",
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
          { label: "অফিশিয়াল ব্লগ", href: "#" },
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
    <footer className="bg-[#ff0000] text-white select-none border-t-[4px] border-black">
      {/* 1. Merged CTA Box */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 border-b-2 border-dashed border-white/20 text-center space-y-6 sm:space-y-8">
        <div className="space-y-3 sm:space-y-4 max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-none uppercase">
            {t.ctaTitle}
          </h2>
          <p className="text-sm sm:text-base text-white/90 max-w-2xl mx-auto font-medium leading-relaxed">
            {t.ctaSubtitle}
          </p>
        </div>
        <div>
          <Link href="/services">
            <button className="h-12 px-8 border-2 border-black bg-white hover:bg-black text-black hover:text-white font-black uppercase text-xs sm:text-sm tracking-wider transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none active:translate-x-0.5 active:translate-y-0.5 cursor-pointer">
              {t.ctaBtn}
            </button>
          </Link>
        </div>
      </div>

      {/* 2. Traditional Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          
          {/* Logo & Slogan Column */}
          <div className="space-y-4 md:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 w-fit">
              <div className="bg-white p-1 border border-black">
                <Image 
                  src="/docket-logo.png" 
                  alt="docket logo" 
                  width={24} 
                  height={24} 
                  className="w-6 h-6 object-contain"
                />
              </div>
              <span className="text-2xl font-black tracking-tight lowercase">docket</span>
            </Link>
            <p className="text-sm text-white/80 max-w-xs font-semibold leading-relaxed">
              {t.desc}
            </p>
          </div>

          {/* Links Columns */}
          {t.columns.map((col, idx) => (
            <div key={idx} className="space-y-4">
              <h4 className="font-black text-xs sm:text-sm uppercase tracking-widest text-white">{col.title}</h4>
              <ul className="space-y-2 text-sm">
                {col.links.map((link, lIdx) => (
                  <li key={lIdx}>
                    <Link 
                      href={link.href} 
                      className="text-white/80 hover:text-black hover:underline font-bold transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

        </div>

        {/* 3. Bottom Credits */}
        <div className="border-t border-white/20 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center text-xs sm:text-sm text-white/80 gap-4">
          <p className="font-bold">{t.rights}</p>
          <p className="font-bold uppercase tracking-wider">{t.footerNote}</p>
        </div>
      </div>
    </footer>
  )
}
