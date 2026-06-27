'use client'

import { useState, useEffect } from 'react'
import { X, ArrowRight, Sparkles } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'
import Link from 'next/link'

export function PhaseBanner() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 1200)
    return () => clearTimeout(timer)
  }, [])

  const content = {
    en: {
      tag: "New",
      text: "e-TIN Registration is now live! Get your TIN in minutes.",
      link: "View Guide",
      href: "/services/register-for-tin"
    },
    bn: {
      tag: "নতুন",
      text: "ই-টিন নিবন্ধন এখন লাইভ! কয়েক মিনিটে আপনার টিন পান।",
      link: "নির্দেশিকা দেখুন",
      href: "/services/register-for-tin"
    }
  }

  const { language } = useLanguage()
  const { tag, text, link, href } = content[language]

  if (!isVisible) return null

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-5 sm:bottom-5 sm:w-[340px] z-[100] animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-white rounded-2xl ring-1 ring-black/10 shadow-xl shadow-black/10 p-4">
        <button
          onClick={() => setIsVisible(false)}
          className="absolute top-3 right-3 p-1.5 rounded-lg hover:bg-gray-100 transition-colors text-gray-400 hover:text-gray-600"
          aria-label="Dismiss"
        >
          <X className="w-3.5 h-3.5" />
        </button>

        <div className="flex flex-col gap-2.5 pr-6">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-primary/10 text-primary rounded-full text-[10px] font-semibold">
              <Sparkles className="w-3 h-3" />
              {tag}
            </span>
          </div>
          <p className="text-sm text-gray-700 leading-relaxed font-medium">
            {text}
          </p>
          <Link
            href={href}
            className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:gap-1.5 transition-all duration-150"
          >
            {link}
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  )
}
