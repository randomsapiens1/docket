'use client'

import { useState, useEffect } from "react"
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
      { label: 'Browse services', href: '/' },
      { label: 'Facilities & Benefits', href: '/facilities' },
    ],
    bn: [
      { label: 'সেবাগুলো দেখুন', href: '/' },
      { label: 'সুবিধা ও ভাতা সমূহ', href: '/facilities' },
    ]
  }

  const items = navItems[language]
  const categories = serviceCategories[language]

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

      {/* Mobile Drawer Overlay */}
      <div
        className={`fixed inset-0 z-[60] md:hidden transition-opacity duration-300 ${
          isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/40"
          onClick={close}
        />

        {/* Drawer Panel — fully opaque */}
        <div
          className={`absolute top-0 right-0 h-full w-[88%] max-w-[360px] bg-white flex flex-col shadow-2xl transition-transform duration-300 ease-out ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {/* Drawer Header */}
          <div className="flex items-center justify-between px-5 h-14 border-b border-gray-100 shrink-0">
            <span className="font-bold text-xl tracking-tighter text-gray-900">docket</span>
            <button
              onClick={close}
              className="p-2 rounded-xl hover:bg-gray-100 transition-all text-gray-500"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Scrollable Body */}
          <div className="flex-1 overflow-y-auto overscroll-contain">

            {/* Main Nav Links */}
            <nav className="px-3 pt-4 pb-2 space-y-0.5">
              {items.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={close}
                  className="flex items-center justify-between px-4 py-3.5 rounded-xl text-sm font-semibold text-gray-800 hover:bg-gray-50 transition-all group"
                >
                  {item.label}
                  <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-gray-500 transition-colors" />
                </Link>
              ))}
            </nav>

            <div className="mx-4 border-t border-gray-100" />

            {/* Services Accordion */}
            <div className="px-3 pt-2 pb-4">
              <button
                onClick={() => setServicesOpen(o => !o)}
                className="w-full flex items-center justify-between px-4 py-3.5 rounded-xl text-sm font-semibold text-gray-800 hover:bg-gray-50 transition-all"
              >
                <span>{language === 'en' ? 'All Services' : 'সব সেবা'}</span>
                <ChevronDown
                  className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${servicesOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {servicesOpen && (
                <div className="mt-2 space-y-5 pb-2">
                  {categories.map((cat, cidx) => {
                    // Flatten: if item has subItems, show subItems; otherwise show the item itself
                    const rows: { name: string; status: 'Live' | 'Soon'; href: string }[] = []
                    cat.items.forEach(item => {
                      if (item.subItems && item.subItems.length > 0) {
                        item.subItems.forEach(sub => rows.push(sub))
                      } else {
                        rows.push({ name: item.name, status: item.status, href: item.href })
                      }
                    })

                    return (
                      <div key={cidx} className="space-y-0.5">
                        <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 px-4 pb-1">
                          {cat.title}
                        </p>
                        {rows.map((row, ridx) => (
                          <a
                            key={ridx}
                            href={row.status === 'Live' ? row.href : undefined}
                            onClick={row.status === 'Live' ? close : undefined}
                            className={`flex items-center justify-between px-4 py-2.5 rounded-xl text-sm transition-all ${
                              row.status === 'Live'
                                ? 'font-medium text-gray-900 hover:bg-primary/5 hover:text-primary cursor-pointer'
                                : 'text-gray-400 cursor-default select-none'
                            }`}
                          >
                            <span>{row.name}</span>
                            {row.status === 'Live' ? (
                              <ArrowRight className="w-3.5 h-3.5 text-primary shrink-0" />
                            ) : (
                              <span className="text-[9px] font-semibold uppercase px-1.5 py-0.5 rounded-full bg-gray-100 text-gray-400 shrink-0">
                                {language === 'en' ? 'Soon' : 'শীঘ্রই'}
                              </span>
                            )}
                          </a>
                        ))}
                      </div>
                    )
                  })}

                  {/* View All */}
                  <Link
                    href="/services"
                    onClick={close}
                    className="flex items-center gap-1.5 px-4 py-2.5 text-sm font-semibold text-primary hover:bg-primary/5 rounded-xl transition-all"
                  >
                    {language === 'en' ? 'View full directory' : 'সব সেবা দেখুন'}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              )}
            </div>

          </div>

          {/* Bottom Actions */}
          <div className="shrink-0 px-4 pb-8 pt-4 border-t border-gray-100 space-y-2.5">
            {user ? (
              <>
                <Link href="/vault" onClick={close} className="block">
                  <button className="w-full flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl ring-1 ring-black/10 font-semibold text-sm text-gray-800 hover:bg-gray-50 transition-all">
                    <UserIcon className="w-4 h-4" />
                    {language === 'en' ? 'My Vault' : 'আমার ভল্ট'}
                  </button>
                </Link>
                <button
                  onClick={() => { handleSignOut(); close() }}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl font-semibold text-sm text-red-500 hover:bg-red-50 ring-1 ring-red-200 transition-all"
                >
                  <LogOut className="w-4 h-4" />
                  {language === 'en' ? 'Sign out' : 'সাইন আউট'}
                </button>
              </>
            ) : (
              <Link href="/auth" onClick={close} className="block">
                <button className="w-full flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-gray-900 text-white font-semibold text-sm hover:bg-gray-700 transition-all shadow-sm">
                  <LogIn className="w-4 h-4" />
                  {language === 'en' ? 'Sign in' : 'সাইন ইন'}
                </button>
              </Link>
            )}

            <button
              onClick={() => setLanguage(language === 'en' ? 'bn' : 'en')}
              className="w-full flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl ring-1 ring-black/10 font-semibold text-sm text-gray-600 hover:bg-gray-50 transition-all"
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
