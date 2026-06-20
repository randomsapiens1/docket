'use client'

import { useState, useEffect } from 'react'
import { X, ArrowRight } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'
import Link from 'next/link'

export function PhaseBanner() {
  const [isVisible, setIsVisible] = useState(false)

  // Show after a short delay for a "popup" effect
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 1000)
    return () => clearTimeout(timer)
  }, [])

  const content = {
    en: {
      tag: "Beta",
      label: "New Service",
      text: "e-TIN Registration is now live! Follow our verified guide to get your TIN in minutes.",
      link: "View Guide",
      href: "/services/register-for-tin"
    },
    bn: {
      tag: "বেটা",
      label: "নতুন সেবা",
      text: "ই-টিন (e-TIN) নিবন্ধন এখন লাইভ! কয়েক মিনিটে আপনার টিন পেতে আমাদের নির্দেশিকা দেখুন।",
      link: "নির্দেশিকা দেখুন",
      href: "/services/register-for-tin"
    }
  }

  const { language } = useLanguage()
  const { tag, label, text, link, href } = content[language]

  if (!isVisible) return null

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-6 sm:max-w-sm z-[100] bg-white border-2 border-black p-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <button 
        onClick={() => setIsVisible(false)}
        className="absolute top-2 right-2 p-1 hover:bg-gray-100 transition-colors"
        aria-label="Dismiss"
      >
        <X className="w-4 h-4" />
      </button>
      
      <div className="flex flex-col gap-3 pr-6">
        <div className="flex items-center gap-2">
          <strong className="bg-[#ff0000] text-white px-2 py-0.5 font-bold uppercase tracking-wide text-[10px]">
            {tag}
          </strong>
          <span className="font-bold text-sm">{label}</span>
        </div>
        <p className="text-sm text-gray-700 leading-relaxed font-medium">
          {text}
        </p>
        <Link 
          href={href}
          className="text-[#ff0000] underline font-bold hover:text-[#ff0000]/80 text-sm flex items-center gap-1"
        >
          {link}
          <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
    </div>
  )
}
