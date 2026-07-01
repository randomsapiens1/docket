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
import { trackEvent } from "@/lib/analytics"

export function Header() {
  const { language, setLanguage } = useLanguage()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
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

  const categories = serviceCategories[language]

  const openDropdown = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setDropdownOpen(true)
  }
  const scheduleClose = () => {
    closeTimer.current = setTimeout(() => setDropdownOpen(false), 120)
  }

  const navLinks = [
    { label: language === 'en' ? 'Services' : 'সেবাসমূহ', href: '/services' },
    { label: language === 'en' ? 'Facilities & Benefits' : 'সুবিধা ও ভাতা', href: '/facilities' },
    { label: language === 'en' ? 'Document Vault' : 'ডকুমেন্ট ভল্ট', href: '/vault' },
    { label: language === 'en' ? 'Quick Access' : 'দ্রুত অ্যাক্সেস', href: '/tools' },
    { label: language === 'en' ? 'About Us' : 'আমাদের সম্পর্কে', href: '/about' },
  ]

  return (
    <>
      {/* ── Navbar ── */}
      <header className={`fixed top-0 w-full z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-2xl shadow-sm border-b border-black/8'
          : 'bg-white/70 backdrop-blur-xl border-b border-black/5'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 -ml-1">
            <Image src="/docket-logo.png" alt="docket" width={32} height={32} priority className="w-7 h-7 object-contain" />
            <span className="font-bold text-2xl tracking-tighter text-gray-900">docket</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            <Link href="/about" className="text-sm font-medium text-gray-600 hover:text-gray-900 px-3.5 py-2 rounded-xl hover:bg-black/5 transition-all duration-150">
              {language === 'en' ? 'About' : 'আমাদের সম্পর্কে'}
            </Link>

            <a href="/facilities" className="text-sm font-medium text-gray-600 hover:text-gray-900 px-3.5 py-2 rounded-xl hover:bg-black/5 transition-all duration-150">
              {language === 'en' ? 'Facilities' : 'সুবিধা ও ভাতা'}
            </a>

            <Link href="/tools" className="text-sm font-medium text-gray-600 hover:text-gray-900 px-3.5 py-2 rounded-xl hover:bg-black/5 transition-all duration-150">
              {language === 'en' ? 'Quick Access' : 'দ্রুত অ্যাক্সেস'}
            </Link>

            <div className="relative" onMouseEnter={openDropdown} onMouseLeave={scheduleClose}>
              <button className={`flex items-center gap-1.5 text-sm font-medium px-3.5 py-2 rounded-xl transition-all duration-150 ${
                dropdownOpen ? 'bg-black/5 text-gray-900' : 'text-gray-600 hover:text-gray-900 hover:bg-black/5'
              }`}>
                {language === 'en' ? 'Browse services' : 'সেবাগুলো দেখুন'}
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {dropdownOpen && (
                <div
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[540px] bg-white rounded-2xl ring-1 ring-black/8 shadow-xl shadow-black/10 py-4 z-50 animate-in fade-in slide-in-from-top-1 duration-150"
                  onMouseEnter={openDropdown}
                  onMouseLeave={scheduleClose}
                >
                  <div className="grid grid-cols-2 gap-x-2 gap-y-0.5 px-3">
                    {categories.map((cat, idx) => (
                      <Link key={idx} href="/services" onClick={() => setDropdownOpen(false)}
                        className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-all duration-100 group">
                        {cat.title}
                        <ChevronRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-gray-500 shrink-0" />
                      </Link>
                    ))}
                  </div>
                  <div className="mt-3 mx-3 pt-3 border-t border-gray-100">
                    <Link href="/services" onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-1.5 px-3 py-2 text-sm font-semibold text-primary hover:bg-primary/5 rounded-xl transition-all duration-100">
                      {language === 'en' ? 'View full directory' : 'সব সেবা দেখুন'}
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* Desktop right actions */}
          <div className="hidden md:flex items-center gap-2">
            <button onClick={() => {
                const next = language === 'en' ? 'bn' : 'en'
                setLanguage(next)
                trackEvent('language_switch', { language: next })
              }}
              className="flex items-center gap-1.5 text-sm font-medium px-3.5 py-2 rounded-xl bg-white/60 backdrop-blur-sm ring-1 ring-black/10 hover:bg-white/90 hover:ring-black/20 hover:shadow-md hover:scale-[1.02] text-gray-600 transition-all duration-200">
              <Globe className="w-3.5 h-3.5" />
              {language === 'en' ? 'বাংলা' : 'EN'}
            </button>
            {user ? (
              <>
                <Link href="/vault">
                  <button className="flex items-center gap-1.5 text-sm font-semibold px-4 py-2 rounded-xl bg-white/60 backdrop-blur-sm ring-1 ring-black/10 hover:bg-white/90 hover:ring-black/20 hover:shadow-md hover:scale-[1.02] text-gray-700 transition-all duration-200">
                    <UserIcon className="w-3.5 h-3.5" />
                    {language === 'en' ? 'My Vault' : 'আমার ভল্ট'}
                  </button>
                </Link>
                <button onClick={handleSignOut} className="text-sm font-semibold text-red-500 hover:text-red-600 px-3 py-2 rounded-xl hover:bg-red-50 transition-all duration-150">
                  {language === 'en' ? 'Sign out' : 'সাইন আউট'}
                </button>
              </>
            ) : (
              <Link href="/auth" onClick={() => trackEvent('click_sign_in', { location: 'header' })}>
                <button className="text-sm font-semibold px-4 py-2 rounded-xl bg-gray-900/90 backdrop-blur-sm hover:bg-gray-900 hover:shadow-lg hover:shadow-black/25 hover:scale-[1.03] text-white transition-all duration-200 shadow-sm border border-white/10">
                  {language === 'en' ? 'Sign in' : 'সাইন ইন'}
                </button>
              </Link>
            )}
          </div>

          {/* Mobile: language + hamburger */}
          <div className="flex items-center gap-2 md:hidden">
            <button onClick={() => {
                const next = language === 'en' ? 'bn' : 'en'
                setLanguage(next)
                trackEvent('language_switch', { language: next })
              }}
              className="flex items-center gap-1 text-xs font-semibold px-3 py-2 rounded-xl bg-white/60 backdrop-blur-sm ring-1 ring-black/10 text-gray-600 hover:bg-white/90 hover:ring-black/20 hover:shadow-sm hover:scale-[1.02] transition-all duration-200">
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
      </header>

      {/* ── Full-screen mobile menu (rendered outside header, no z-index/transform conflict) ── */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black flex flex-col md:hidden animate-in fade-in duration-200">

          {/* Top bar */}
          <div className="flex items-center justify-between px-6 h-16 shrink-0 border-b border-white/10">
            <Link href="/" onClick={close}>
              <span className="font-bold text-xl tracking-tight text-white">docket</span>
            </Link>
            <button
              onClick={close}
              aria-label="Close menu"
              className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Nav links — vertically centered */}
          <nav className="flex-1 flex flex-col justify-center px-6 gap-0">
            {navLinks.map((item, idx) => (
              <Link
                key={idx}
                href={item.href}
                onClick={close}
                className="group flex items-center justify-between py-5 border-b border-white/10"
              >
                <span className="text-4xl font-bold tracking-tight text-white">
                  {item.label}
                </span>
                <ArrowRight className="w-6 h-6 text-[#ff0000] shrink-0" />
              </Link>
            ))}
          </nav>

          {/* Bottom bar */}
          <div className="shrink-0 px-6 pb-10 pt-5 border-t border-white/10 flex items-center justify-between">
            <button
              onClick={() => setLanguage(language === 'en' ? 'bn' : 'en')}
              className="flex items-center gap-2 text-sm font-medium text-white/40"
            >
              <Globe className="w-4 h-4" />
              {language === 'en' ? 'বাংলা' : 'English'}
            </button>

            {user ? (
              <div className="flex items-center gap-5">
                <Link href="/vault" onClick={close} className="text-sm font-semibold text-white/60">
                  {language === 'en' ? 'My Vault' : 'আমার ভল্ট'}
                </Link>
                <button onClick={() => { handleSignOut(); close() }} className="text-sm font-bold text-[#ff0000]">
                  {language === 'en' ? 'Sign out' : 'সাইন আউট'}
                </button>
              </div>
            ) : (
              <Link href="/auth" onClick={close} className="flex items-center gap-1.5 text-sm font-bold text-[#ff0000]">
                {language === 'en' ? 'Sign in' : 'সাইন ইন'}
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            )}
          </div>

        </div>
      )}
    </>
  )
}
