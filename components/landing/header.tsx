'use client'

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useLanguage } from "@/lib/language-context"
import Link from 'next/link'
import { createClient } from "@/lib/supabase"
import { useRouter } from "next/navigation"

import { User } from "@supabase/supabase-js"

export function Header() {
  const { language, setLanguage } = useLanguage()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const supabase = createClient()
  const router = useRouter()

  useEffect(() => {
    const getUser = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setUser(session?.user || null)
    }
    getUser()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null)
    })

    return () => subscription.unsubscribe()
  }, [supabase])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  const navItems = {
    en: [
      { label: 'How it works', href: '#' },
      { label: 'Browse services', href: '/' },
    ],
    bn: [
      { label: 'কিভাবে এটি কাজ করে', href: '#' },
      { label: 'সেবাগুলো দেখুন', href: '/' },
    ]
  }

  const items = navItems[language]

  return (
    <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-3 group cursor-pointer -ml-1">
          <Image
            src="/Docket-logo.png"
            alt="docket logo"
            width={32}
            height={32}
            priority
            className="w-8 h-8 object-contain"
          />
          <span className="font-bold text-2xl sm:text-3xl tracking-tighter text-foreground">docket</span>
        </Link>

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

          {user ? (
            <div className="flex items-center gap-4">
              <Link href="/vault">
                <Button variant="outline" size="sm" className="font-bold border-2 border-black">
                  {language === 'en' ? 'My Vault' : 'আমার ভল্ট'}
                </Button>
              </Link>
              <button 
                onClick={handleSignOut}
                className="text-sm font-bold text-[#ff0000] hover:underline"
              >
                {language === 'en' ? 'Sign out' : 'সাইন আউট'}
              </button>
            </div>
          ) : (
            <Link href="/auth">
              <Button variant="outline" size="sm" className="font-bold border-2 border-black">
                {language === 'en' ? 'Sign in' : 'সাইন ইন'}
              </Button>
            </Link>
          )}
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
          <div className="pt-3 space-y-3">
            {user ? (
              <>
                <Link href="/vault" className="block" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="outline" size="sm" className="font-bold w-full border-2 border-black">
                    {language === 'en' ? 'My Vault' : 'আমার ভল্ট'}
                  </Button>
                </Link>
                <button 
                  onClick={() => { handleSignOut(); setIsMenuOpen(false); }}
                  className="w-full text-center text-sm font-bold text-[#ff0000] py-2"
                >
                  {language === 'en' ? 'Sign out' : 'সাইন আউট'}
                </button>
              </>
            ) : (
              <Link href="/auth" className="block" onClick={() => setIsMenuOpen(false)}>
                <Button variant="outline" size="sm" className="font-bold w-full border-2 border-black">
                  {language === 'en' ? 'Sign in' : 'সাইন ইন'}
                </Button>
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  )
}

