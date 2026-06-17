'use client'

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useLanguage } from "@/lib/language-context"
import Link from 'next/link'
import { createClient } from "@/lib/supabase"
import { useRouter } from "next/navigation"
import { Menu, X, Globe, LogIn, User as UserIcon, LogOut, ChevronRight } from "lucide-react"

import { User } from "@supabase/supabase-js"

export function Header() {
  const { language, setLanguage } = useLanguage()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const supabase = createClient()
  const router = useRouter()

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [isMenuOpen])

  useEffect(() => {
    const getUser = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setUser(session?.user || null)
    }
    getUser()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null)
    })

    return () => {
      subscription.unsubscribe()
      document.body.style.overflow = 'unset'
    }
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
            className="flex items-center gap-1.5 text-[10px] font-black uppercase px-2 py-1.5 border-2 border-black hover:bg-black hover:text-white transition-colors"
          >
            <Globe className="w-3 h-3" />
            {language === 'en' ? 'বাংলা' : 'EN'}
          </button>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 border-2 border-black bg-white active:translate-y-0.5 transition-all"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-[60] md:hidden transition-all duration-300 ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsMenuOpen(false)} />
        <div className={`absolute top-0 right-0 h-full w-[85%] max-w-[320px] bg-white border-l-[4px] border-black p-8 shadow-[-12px_0_0_0_rgba(0,0,0,1)] flex flex-col transition-transform duration-300 transform ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex justify-between items-center mb-10">
            <span className="font-black text-2xl tracking-tighter">docket</span>
            <button onClick={() => setIsMenuOpen(false)} className="p-2 border-2 border-black">
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="flex-1 space-y-6">
            {items.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center justify-between text-xl font-black text-black group"
              >
                {item.label}
                <ChevronRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            ))}
          </nav>

          <div className="pt-8 border-t-[4px] border-black space-y-4">
            {user ? (
              <>
                <Link href="/vault" className="block" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="outline" className="w-full h-14 font-black border-[3px] border-black rounded-none shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all flex items-center justify-center gap-2">
                    <UserIcon className="w-5 h-5" />
                    {language === 'en' ? 'My Vault' : 'আমার ভল্ট'}
                  </Button>
                </Link>
                <button 
                  onClick={() => { handleSignOut(); setIsMenuOpen(false); }}
                  className="w-full h-14 flex items-center justify-center gap-2 font-black text-[#ff0000] border-[3px] border-black hover:bg-[#ff0000]/5"
                >
                  <LogOut className="w-5 h-5" />
                  {language === 'en' ? 'Sign out' : 'সাইন আউট'}
                </button>
              </>
            ) : (
              <Link href="/auth" className="block" onClick={() => setIsMenuOpen(false)}>
                <Button className="w-full h-14 bg-black text-white font-black rounded-none border-[3px] border-black shadow-[4px_4px_0_0_rgba(255,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1 transition-all flex items-center justify-center gap-2">
                  <LogIn className="w-5 h-5" />
                  {language === 'en' ? 'Sign in' : 'সাইন ইন'}
                </Button>
              </Link>
            )}
            
            <button
              onClick={() => setLanguage(language === 'en' ? 'bn' : 'en')}
              className="w-full h-14 flex items-center justify-center gap-2 border-[3px] border-black font-black uppercase text-sm"
            >
              <Globe className="w-4 h-4" />
              {language === 'en' ? 'Switch to বাংলা' : 'Switch to English'}
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

