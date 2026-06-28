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
        className={`fixed inset-0 z-[60] md:hidden flex flex-col bg-[#0d0d0d] transition-all duration-300 ease-out ${
          isMenuOpen
            ? 'opacity-100 pointer-events-auto translate-y-0'
            : 'opacity-0 pointer-events-none translate-y-4'
        }`}
      >
        {/* Top bar */}
        <div className="flex items-center justify-between px-6 pt-14 pb-6 shrink-0">
          <Link href="/" onClick={close}>
            <span className="font-bold text-2xl tracking-tight text-white">docket</span>
          </Link>
          <button
            onClick={close}
            aria-label="Close menu"
            className="w-10 h-10 flex items-center justify-center text-white/60 hover:text-white transition-colors relative"
          >
            {/* Crosshair-style X */}
            <span className="absolute w-[18px] h-px bg-current rotate-45" />
            <span className="absolute w-[18px] h-px bg-current -rotate-45" />
            <span className="absolute inset-0 border border-white/15 rounded-sm" />
          </button>
        </div>

        {/* Tagline */}
        <p className="px-6 pb-8 text-[10px] font-mono uppercase tracking-[0.2em] text-white/20 leading-relaxed">
          {language === 'en'
            ? 'CLEAR GUIDANCE.\nVERIFIED PATHWAYS.'
            : 'স্বচ্ছ নির্দেশিকা।\nযাচাইকৃত পথ।'}
        </p>

        {/* Nav links */}
        <nav className="flex-1 overflow-y-auto overscroll-contain px-6">
          {[
            { label: language === 'en' ? 'Services Directory' : 'সেবা ডিরেক্টরি', href: '/services' },
            { label: language === 'en' ? 'Document Vault' : 'ডকুমেন্ট ভল্ট', href: '/vault' },
            ...items,
            { label: language === 'en' ? 'Fee Calculator' : 'ফি ক্যালকুলেটর', href: '/calculators/fee-calculator' },
          ].map((item, idx) => (
            <Link
              key={idx}
              href={item.href}
              onClick={close}
              className="group flex items-center justify-between py-5 border-b border-white/8 transition-all duration-150 active:opacity-60"
            >
              <span className="text-[1.6rem] font-semibold tracking-tight text-white/85 group-hover:text-white transition-colors leading-none">
                {item.label}
              </span>
              <ArrowRight className="w-5 h-5 text-white/15 group-hover:text-[#ff0000] group-hover:translate-x-0.5 transition-all duration-150 shrink-0" />
            </Link>
          ))}
        </nav>

        {/* Bottom bar */}
        <div className="shrink-0 px-6 pb-10 pt-6 flex items-center justify-between gap-4">
          <button
            onClick={() => setLanguage(language === 'en' ? 'bn' : 'en')}
            className="flex items-center gap-2 text-sm font-medium text-white/30 hover:text-white/60 transition-colors"
          >
            <Globe className="w-4 h-4" />
            {language === 'en' ? 'বাংলা' : 'English'}
          </button>

          {user ? (
            <div className="flex items-center gap-4">
              <Link href="/vault" onClick={close} className="text-sm font-semibold text-white/60 hover:text-white transition-colors">
                {language === 'en' ? 'My Vault' : 'আমার ভল্ট'}
              </Link>
              <button
                onClick={() => { handleSignOut(); close() }}
                className="text-sm font-semibold text-[#ff0000] hover:text-[#ff3333] transition-colors"
              >
                {language === 'en' ? 'Sign out' : 'সাইন আউট'}
              </button>
            </div>
          ) : (
            <Link
              href="/auth"
              onClick={close}
              className="flex items-center gap-1.5 text-sm font-semibold text-[#ff0000] hover:text-[#ff3333] transition-colors group"
            >
              {language === 'en' ? 'Sign in' : 'সাইন ইন'}
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}
