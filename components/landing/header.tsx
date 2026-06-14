'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useLanguage } from "@/lib/language-context"

export function Header() {
  const { language, setLanguage } = useLanguage()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navItems = {
    en: [
      { label: 'How it works', href: '#' },
      { label: 'Browse services', href: '#' },
    ],
    bn: [
      { label: 'কিভাবে এটি কাজ করে', href: '#' },
      { label: 'সেবাগুলো দেখুন', href: '#' },
    ]
  }

  const items = navItems[language]

  return (
    <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <div className="flex items-center gap-3 group cursor-pointer -ml-1">
          <Image
            src="/Docket-logo.png"
            alt="docket logo"
            width={32}
            height={32}
            priority
            className="w-8 h-8 object-contain"
          />
          <span className="font-bold text-2xl sm:text-3xl tracking-tighter text-foreground">docket</span>
        </div>

        <nav className="hidden md:flex gap-8 items-center">
          {items.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-sm font-bold text-foreground/80 hover:text-foreground hover:underline decoration-2 underline-offset-4 transition-colors"
            >
              {item.label}
            </a>
          ))}

          <button
            onClick={() => setLanguage(language === 'en' ? 'bn' : 'en')}
            className="text-sm font-bold px-3 py-1 border-2 border-black hover:bg-black hover:text-white transition-colors min-w-[60px]"
          >
            {language === 'en' ? 'বাংলা' : 'EN'}
          </button>

          <Button variant="outline" size="sm" className="font-bold">
            {language === 'en' ? 'Sign in' : 'সাইন ইন'}
          </Button>
        </nav>

        <div className="flex items-center gap-3 md:hidden">
          <button
            onClick={() => setLanguage(language === 'en' ? 'bn' : 'en')}
            className="text-xs font-bold px-2 py-1 border-2 border-black"
          >
            {language === 'en' ? 'বাংলা' : 'EN'}
          </button>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="px-4 py-2 font-bold text-foreground underline decoration-2 underline-offset-4"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen
              ? (language === 'en' ? 'Close' : 'বন্ধ')
              : (language === 'en' ? 'Menu' : 'মেনু')
            }
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-md px-4 py-4 space-y-1">
          {items.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setIsMenuOpen(false)}
              className="block text-base font-bold text-foreground/80 hover:text-foreground py-3 border-b border-border last:border-0"
            >
              {item.label}
            </a>
          ))}
          <div className="pt-3">
            <Button variant="outline" size="sm" className="font-bold w-full">
              {language === 'en' ? 'Sign in' : 'সাইন ইন'}
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}

