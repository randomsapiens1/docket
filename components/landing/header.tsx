'use client'

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { useLanguage } from "@/lib/language-context"
import Link from 'next/link'
import { createClient } from "@/lib/supabase"
import { useRouter } from "next/navigation"
import { Menu, X, Globe, LogIn, User as UserIcon, LogOut, ChevronRight, ChevronDown, ArrowRight } from "lucide-react"
import { User } from "@supabase/supabase-js"
import { serviceCategories } from "@/lib/services"

export function Header() {
  const { language, setLanguage } = useLanguage()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const supabase = createClient()
  const router = useRouter()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
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

    return () => { subscription.unsubscribe() }
  }, [supabase])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  const close = () => setIsMenuOpen(false)

  const navItems = {
    en: [
      { label: 'Facilities & Benefits', href: '/facilities' },
    ],
    bn: [
      { label: 'সুবিধা ও ভাতা সমূহ', href: '/facilities' },
    ]
  }

  const items = navItems[language]
  const categories = serviceCategories[language]

  const openDropdown = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setDropdownOpen(true)
  }
  const scheduleClose = () => {
    closeTimer.current = setTimeout(() => setDropdownOpen(false), 120)
  }

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

          {/* Browse services dropdown */}
          <div
            className="relative"
            onMouseEnter={openDropdown}
            onMouseLeave={scheduleClose}
          >
            <button
              className={`flex items-center gap-1.5 text-sm font-medium px-3.5 py-2 rounded-xl transition-all duration-150 ${
                dropdownOpen
                  ? 'bg-black/5 text-gray-900 dark:text-white'
                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/8'
              }`}
            >
              {language === 'en' ? 'Browse services' : 'সেবাগুলো দেখুন'}
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {dropdownOpen && (
              <div
                className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[540px] bg-white dark:bg-gray-950 rounded-2xl ring-1 ring-black/8 shadow-xl shadow-black/10 py-4 z-50 animate-in fade-in slide-in-from-top-1 duration-150"
                onMouseEnter={openDropdown}
                onMouseLeave={scheduleClose}
              >
                <div className="grid grid-cols-2 gap-x-2 gap-y-0.5 px-3">
                  {categories.map((cat, idx) => (
                    <Link
                      key={idx}
                      href="/services"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white transition-all duration-100 group"
                    >
                      {cat.title}
                      <ChevronRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-gray-500 shrink-0 transition-colors" />
                    </Link>
                  ))}
                </div>
                <div className="mt-3 mx-3 pt-3 border-t border-gray-100 dark:border-white/8">
                  <Link
                    href="/services"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-1.5 px-3 py-2 text-sm font-semibold text-primary hover:bg-primary/5 rounded-xl transition-all duration-100"
                  >
                    {language === 'en' ? 'View full directory' : 'সব সেবা দেখুন'}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* Desktop Right Actions */}
        <div className="hidden md:flex items-center gap-2">
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

        {/* Mobile: Language + Hamburger */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={() => setLanguage(language === 'en' ? 'bn' : 'en')}
            className="flex items-center gap-1 text-xs font-semibold px-3 py-2 rounded-xl ring-1 ring-black/10 text-gray-600 hover:bg-black/5 transition-all"
          >
            <Globe className="w-3.5 h-3.5" />
            {language === 'en' ? 'বাংলা' : 'EN'}
          </button>
          <button
            onClick={() => setIsMenuOpen(true)}
            className="p-2 rounded-xl hover:bg-black/8 transition-all"
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5 text-gray-800" />
          </button>
        </div>
      </div>

      {/* Full-screen Mobile Nav */}
      <div
        className={`fixed inset-0 z-[60] md:hidden flex flex-col bg-[#0a0a0a] transition-all duration-300 ease-out ${
          isMenuOpen
            ? 'opacity-100 pointer-events-auto translate-y-0'
            : 'opacity-0 pointer-events-none -translate-y-3'
        }`}
      >
        {/* Top bar */}
        <div className="flex items-center justify-between px-5 h-16 shrink-0 border-b border-white/8">
          <Link href="/" onClick={close} className="flex items-center gap-2 group">
            <div className="w-7 h-7 bg-[#ff0000] rounded-lg flex items-center justify-center shrink-0">
              <Image
                src="/docket-logo.png"
                alt="docket logo"
                width={16}
                height={16}
                className="w-4 h-4 object-contain brightness-0 invert"
              />
            </div>
            <span className="font-bold text-xl tracking-tight text-white">docket</span>
          </Link>
          <button
            onClick={close}
            className="p-2 rounded-xl bg-white/8 hover:bg-white/12 transition-all text-white"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto overscroll-contain px-5 py-6 space-y-8">

          {/* Primary nav links */}
          <nav className="space-y-1">
            {items.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={close}
                className="flex items-center justify-between py-3.5 border-b border-white/8 text-base font-semibold text-white/80 hover:text-white transition-colors group"
              >
                {item.label}
                <ArrowRight className="w-4 h-4 text-white/20 group-hover:text-[#ff0000] group-hover:translate-x-0.5 transition-all duration-150" />
              </Link>
            ))}
            <Link
              href="/services"
              onClick={close}
              className="flex items-center justify-between py-3.5 border-b border-white/8 text-base font-semibold text-white/80 hover:text-white transition-colors group"
            >
              {language === 'en' ? 'Services Directory' : 'সেবা ডিরেক্টরি'}
              <ArrowRight className="w-4 h-4 text-white/20 group-hover:text-[#ff0000] group-hover:translate-x-0.5 transition-all duration-150" />
            </Link>
            <Link
              href="/vault"
              onClick={close}
              className="flex items-center justify-between py-3.5 border-b border-white/8 text-base font-semibold text-white/80 hover:text-white transition-colors group"
            >
              {language === 'en' ? 'Document Vault' : 'ডকুমেন্ট ভল্ট'}
              <ArrowRight className="w-4 h-4 text-white/20 group-hover:text-[#ff0000] group-hover:translate-x-0.5 transition-all duration-150" />
            </Link>
          </nav>

          {/* Services accordion */}
          <div>
            <button
              onClick={() => setServicesOpen(o => !o)}
              className="w-full flex items-center justify-between mb-4"
            >
              <span className="text-[10px] font-semibold uppercase tracking-widest text-white/30">
                {language === 'en' ? 'Browse by Category' : 'বিভাগ অনুযায়ী'}
              </span>
              <ChevronDown
                className={`w-3.5 h-3.5 text-white/30 transition-transform duration-200 ${servicesOpen ? 'rotate-180' : ''}`}
              />
            </button>

            {servicesOpen && (
              <div className="space-y-6 animate-in fade-in slide-in-from-top-2 duration-200">
                {categories.map((cat, cidx) => {
                  const liveItems = cat.items.flatMap(item =>
                    item.subItems
                      ? item.subItems.filter(s => s.status === 'Live')
                      : item.status === 'Live' ? [{ name: item.name, status: item.status, href: item.href }] : []
                  )
                  if (liveItems.length === 0) return null
                  return (
                    <div key={cidx} className="space-y-1">
                      <p className="text-[10px] font-semibold uppercase tracking-widest text-white/25 pb-1">
                        {cat.title}
                      </p>
                      {liveItems.map((row, ridx) => (
                        <a
                          key={ridx}
                          href={row.href}
                          onClick={close}
                          className="flex items-center justify-between py-2 text-sm font-medium text-white/60 hover:text-white transition-colors group"
                        >
                          {row.name}
                          <ArrowRight className="w-3.5 h-3.5 text-white/10 group-hover:text-[#ff0000] shrink-0 transition-colors" />
                        </a>
                      ))}
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>

        {/* Bottom actions */}
        <div className="shrink-0 px-5 pb-10 pt-4 border-t border-white/8 space-y-3">
          {user ? (
            <>
              <Link href="/vault" onClick={close} className="block">
                <button className="w-full flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-white/8 hover:bg-white/12 text-white font-semibold text-sm transition-all">
                  <UserIcon className="w-4 h-4" />
                  {language === 'en' ? 'My Vault' : 'আমার ভল্ট'}
                </button>
              </Link>
              <button
                onClick={() => { handleSignOut(); close() }}
                className="w-full flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-[#ff0000]/10 hover:bg-[#ff0000]/20 text-[#ff0000] font-semibold text-sm transition-all"
              >
                <LogOut className="w-4 h-4" />
                {language === 'en' ? 'Sign out' : 'সাইন আউট'}
              </button>
            </>
          ) : (
            <Link href="/auth" onClick={close} className="block">
              <button className="w-full flex items-center justify-center gap-2 px-4 py-4 rounded-xl bg-[#ff0000] hover:bg-[#e00000] text-white font-semibold text-sm transition-all shadow-lg shadow-[#ff0000]/20">
                <LogIn className="w-4 h-4" />
                {language === 'en' ? 'Sign in' : 'সাইন ইন'}
              </button>
            </Link>
          )}
          <button
            onClick={() => setLanguage(language === 'en' ? 'bn' : 'en')}
            className="w-full flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-white/5 hover:bg-white/8 text-white/50 hover:text-white/80 font-medium text-sm transition-all"
          >
            <Globe className="w-4 h-4" />
            {language === 'en' ? 'Switch to বাংলা' : 'Switch to English'}
          </button>
        </div>
      </div>
    </header>
  )
}
