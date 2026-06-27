'use client'

import { useState, useEffect } from "react"
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
  const [scrolled, setScrolled] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const supabase = createClient()
  const router = useRouter()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'unset'
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
      { label: 'Browse services', href: '/' },
      { label: 'Facilities & Benefits', href: '/facilities' },
    ],
    bn: [
      { label: 'সেবাগুলো দেখুন', href: '/' },
      { label: 'সুবিধা ও ভাতা সমূহ', href: '/facilities' },
    ]
  }

  const items = navItems[language]

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 will-change-transform [transform:translateZ(0)] ${
      scrolled
        ? 'bg-white/85 dark:bg-gray-950/85 backdrop-blur-2xl shadow-sm shadow-black/5 border-b border-black/8'
        : 'bg-white/70 dark:bg-gray-950/70 backdrop-blur-xl border-b border-black/5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group cursor-pointer -ml-1">
          <Image
            src="/docket-logo.png"
            alt="docket logo"
            width={32}
            height={32}
            priority
            className="w-7 h-7 object-contain"
          />
          <span className="font-bold text-2xl sm:text-[26px] tracking-tighter text-gray-900 dark:text-white">
            docket
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {items.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3.5 py-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/8 transition-all duration-150"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Desktop Right Actions */}
        <div className="hidden md:flex items-center gap-2">
          {/* Language Toggle */}
          <button
            onClick={() => setLanguage(language === 'en' ? 'bn' : 'en')}
            className="flex items-center gap-1.5 text-sm font-medium px-3.5 py-2 rounded-xl ring-1 ring-black/10 dark:ring-white/10 hover:bg-black/5 dark:hover:bg-white/8 text-gray-600 dark:text-gray-300 transition-all duration-150"
          >
            <Globe className="w-3.5 h-3.5" />
            {language === 'en' ? 'বাংলা' : 'EN'}
          </button>

          {user ? (
            <>
              <Link href="/vault">
                <button className="flex items-center gap-1.5 text-sm font-semibold px-4 py-2 rounded-xl ring-1 ring-black/10 dark:ring-white/10 hover:bg-black/5 dark:hover:bg-white/8 text-gray-700 dark:text-gray-200 transition-all duration-150">
                  <UserIcon className="w-3.5 h-3.5" />
                  {language === 'en' ? 'My Vault' : 'আমার ভল্ট'}
                </button>
              </Link>
              <button
                onClick={handleSignOut}
                className="text-sm font-semibold text-red-500 hover:text-red-600 px-3 py-2 rounded-xl hover:bg-red-50 dark:hover:bg-red-950/40 transition-all duration-150"
              >
                {language === 'en' ? 'Sign out' : 'সাইন আউট'}
              </button>
            </>
          ) : (
            <Link href="/auth">
              <button className="text-sm font-semibold px-4 py-2 rounded-xl bg-gray-900 dark:bg-white hover:bg-gray-700 dark:hover:bg-gray-100 text-white dark:text-gray-900 transition-all duration-150 shadow-sm">
                {language === 'en' ? 'Sign in' : 'সাইন ইন'}
              </button>
            </Link>
          )}
        </div>

        {/* Mobile Controls */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={() => setLanguage(language === 'en' ? 'bn' : 'en')}
            className="flex items-center gap-1 text-xs font-semibold px-3 py-2 rounded-xl ring-1 ring-black/10 text-gray-600 hover:bg-black/5 transition-all"
          >
            <Globe className="w-3.5 h-3.5" />
            {language === 'en' ? 'বাংলা' : 'EN'}
          </button>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 rounded-xl hover:bg-black/8 transition-all"
            aria-expanded={isMenuOpen}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div className={`fixed inset-0 z-[60] md:hidden transition-all duration-300 ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/25 backdrop-blur-sm"
          onClick={() => setIsMenuOpen(false)}
        />

        {/* Drawer Panel */}
        <div className={`absolute top-0 right-0 h-full w-[85%] max-w-[320px] bg-white/90 dark:bg-gray-950/90 backdrop-blur-2xl border-l border-black/8 dark:border-white/8 shadow-2xl flex flex-col transition-transform duration-300 ease-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          {/* Drawer Header */}
          <div className="flex justify-between items-center px-6 py-5 border-b border-black/8 dark:border-white/8">
            <span className="font-bold text-xl tracking-tighter text-gray-900 dark:text-white">docket</span>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="p-2 rounded-xl hover:bg-black/8 dark:hover:bg-white/8 transition-all"
            >
              <X className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            </button>
          </div>

          {/* Nav Links */}
          <nav className="flex-1 px-4 py-6 space-y-1">
            {items.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center justify-between px-4 py-3.5 rounded-xl text-base font-semibold text-gray-800 dark:text-gray-100 hover:bg-black/5 dark:hover:bg-white/8 group transition-all"
              >
                {item.label}
                <ChevronRight className="w-4 h-4 text-gray-400 group-hover:translate-x-0.5 transition-transform" />
              </a>
            ))}
          </nav>

          {/* Bottom Actions */}
          <div className="px-4 pb-8 pt-4 border-t border-black/8 dark:border-white/8 space-y-2.5">
            {user ? (
              <>
                <Link href="/vault" className="block" onClick={() => setIsMenuOpen(false)}>
                  <button className="w-full flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl ring-1 ring-black/10 font-semibold text-sm text-gray-800 hover:bg-black/5 transition-all">
                    <UserIcon className="w-4 h-4" />
                    {language === 'en' ? 'My Vault' : 'আমার ভল্ট'}
                  </button>
                </Link>
                <button
                  onClick={() => { handleSignOut(); setIsMenuOpen(false) }}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl font-semibold text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 ring-1 ring-red-200 dark:ring-red-900/40 transition-all"
                >
                  <LogOut className="w-4 h-4" />
                  {language === 'en' ? 'Sign out' : 'সাইন আউট'}
                </button>
              </>
            ) : (
              <Link href="/auth" className="block" onClick={() => setIsMenuOpen(false)}>
                <button className="w-full flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-semibold text-sm hover:bg-gray-700 dark:hover:bg-gray-100 transition-all shadow-sm">
                  <LogIn className="w-4 h-4" />
                  {language === 'en' ? 'Sign in' : 'সাইন ইন'}
                </button>
              </Link>
            )}

            <button
              onClick={() => setLanguage(language === 'en' ? 'bn' : 'en')}
              className="w-full flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl ring-1 ring-black/10 dark:ring-white/10 font-semibold text-sm text-gray-600 dark:text-gray-300 hover:bg-black/5 dark:hover:bg-white/8 transition-all"
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
