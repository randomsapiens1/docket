'use client'

import { useState } from 'react'
import { auth } from '@/lib/firebase'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth'
import { useLanguage } from '@/lib/language-context'
import {
  ArrowRight, Loader2, CheckCircle2,
  ShieldCheck, FileText, CloudUpload, Zap, Construction,
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

const FIREBASE_ERRORS: Record<string, { en: string; bn: string }> = {
  'auth/invalid-email':        { en: 'Enter a valid email address.',              bn: 'একটি বৈধ ইমেইল দিন।' },
  'auth/user-not-found':       { en: 'No account found with this email.',         bn: 'এই ইমেইলে কোনো অ্যাকাউন্ট নেই।' },
  'auth/wrong-password':       { en: 'Incorrect password. Please try again.',     bn: 'ভুল পাসওয়ার্ড। আবার চেষ্টা করুন।' },
  'auth/invalid-credential':   { en: 'Incorrect email or password.',              bn: 'ইমেইল বা পাসওয়ার্ড ভুল।' },
  'auth/email-already-in-use': { en: 'An account with this email already exists.',bn: 'এই ইমেইলে আগেই অ্যাকাউন্ট আছে।' },
  'auth/weak-password':        { en: 'Password must be at least 6 characters.',   bn: 'পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে।' },
  'auth/too-many-requests':    { en: 'Too many attempts. Please wait and retry.', bn: 'অনেকবার চেষ্টা হয়েছে। একটু অপেক্ষা করুন।' },
  'auth/network-request-failed':{ en: 'Network error. Check your connection.',    bn: 'নেটওয়ার্ক সমস্যা। সংযোগ পরীক্ষা করুন।' },
}

function parseFirebaseError(message: string, lang: 'en' | 'bn'): string {
  const match = message.match(/\(([^)]+)\)/)
  if (match && FIREBASE_ERRORS[match[1]]) return FIREBASE_ERRORS[match[1]][lang]
  return message
}

const VAULT_FEATURES = {
  en: [
    {
      icon: Construction,
      title: 'Feature in development',
      desc: 'Document Vault is actively being built. Early access is available. Expect improvements soon.',
      highlight: true,
    },
    {
      icon: FileText,
      title: 'All your government documents',
      desc: 'Store your NID, TIN certificate, trade license, passport, MoA, and more in one place.',
    },
    {
      icon: CloudUpload,
      title: 'Upload in seconds',
      desc: 'Drag and drop PDFs, JPGs, or PNGs up to 5 MB. Access them any time from any device.',
    },
    {
      icon: Zap,
      title: 'Instant access when you need it',
      desc: 'Documents load instantly from local cache. No waiting, even on slow connections.',
    },
  ],
  bn: [
    {
      icon: Construction,
      title: 'ফিচারটি তৈরি হচ্ছে',
      desc: 'ডকুমেন্ট ভল্ট এখনও নির্মাণাধীন। আর্লি অ্যাক্সেস চালু আছে। শীঘ্রই আরো উন্নতি আসবে।',
      highlight: true,
    },
    {
      icon: FileText,
      title: 'সব সরকারি কাগজপত্র এক জায়গায়',
      desc: 'NID, TIN সার্টিফিকেট, ট্রেড লাইসেন্স, পাসপোর্ট, MoA সহ সব কিছু এক জায়গায় রাখুন।',
    },
    {
      icon: CloudUpload,
      title: 'মুহূর্তেই আপলোড করুন',
      desc: 'PDF, JPG বা PNG ড্র্যাগ করে ছেড়ে দিন, সর্বোচ্চ ৫ MB। যেকোনো ডিভাইস থেকে অ্যাক্সেস করুন।',
    },
    {
      icon: Zap,
      title: 'প্রয়োজনে তাৎক্ষণিক অ্যাক্সেস',
      desc: 'স্থানীয় ক্যাশ থেকে তাৎক্ষণিকভাবে লোড হয়। ধীর সংযোগেও অপেক্ষা নেই।',
    },
  ],
}

export default function AuthPage() {
  const { language, setLanguage } = useLanguage()
  const lang = language as 'en' | 'bn'

  const [email, setEmail]       = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading]   = useState(false)
  const [isSignUp, setIsSignUp] = useState(false)
  const [error, setError]       = useState<string | null>(null)
  const [success, setSuccess]   = useState(false)
  const router = useRouter()

  const copy = {
    en: {
      signIn: 'Sign in',
      signUp: 'Create account',
      email: 'Email address',
      username: 'Username',
      password: 'Password',
      toggleSignUp: "Don't have an account?",
      toggleSignIn: 'Already have an account?',
      toggleSignUpLink: 'Sign up',
      toggleSignInLink: 'Sign in',
      successTitle: 'Account created!',
      successHint: 'You can now sign in with your credentials.',
      signInDesc: 'Welcome back. Sign in to access your vault.',
      signUpDesc: 'Create your Docket account to get started.',
      secured: 'Secured with Firebase Authentication',
      hero: 'Your official documents, always within reach.',
      heroSub: 'Docket Vault is a secure, private store for your Bangladeshi government documents: NID, TIN, trade license, passport, and more. Upload once, access anywhere, instantly.',
    },
    bn: {
      signIn: 'সাইন ইন',
      signUp: 'অ্যাকাউন্ট তৈরি করুন',
      email: 'ইমেইল অ্যাড্রেস',
      username: 'ব্যবহারকারীর নাম',
      password: 'পাসওয়ার্ড',
      toggleSignUp: 'অ্যাকাউন্ট নেই?',
      toggleSignIn: 'অ্যাকাউন্ট আছে?',
      toggleSignUpLink: 'সাইন আপ',
      toggleSignInLink: 'সাইন ইন',
      successTitle: 'অ্যাকাউন্ট তৈরি হয়েছে!',
      successHint: 'এখন আপনার ক্রেডেনশিয়াল দিয়ে সাইন ইন করুন।',
      signInDesc: 'স্বাগতম। আপনার ভল্ট অ্যাক্সেস করতে সাইন ইন করুন।',
      signUpDesc: 'শুরু করতে আপনার Docket অ্যাকাউন্ট তৈরি করুন।',
      secured: 'Firebase Authentication দ্বারা সুরক্ষিত',
      hero: 'আপনার সরকারি কাগজপত্র, সবসময় হাতের কাছে।',
      heroSub: 'Docket Vault হলো আপনার বাংলাদেশী সরকারি নথির একটি সুরক্ষিত ভান্ডার: NID, TIN, ট্রেড লাইসেন্স, পাসপোর্ট ও আরো অনেক কিছু। একবার আপলোড করুন, যেকোনো জায়গা থেকে অ্যাক্সেস করুন।',
    },
  }[lang]

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      if (isSignUp) {
        const credential = await createUserWithEmailAndPassword(auth, email, password)
        if (username.trim()) {
          await updateProfile(credential.user, { displayName: username.trim() })
        }
        setSuccess(true)
        setIsSignUp(false)
        setEmail('')
        setUsername('')
        setPassword('')
      } else {
        await signInWithEmailAndPassword(auth, email, password)
        router.push('/vault')
      }
    } catch (err) {
      setError(parseFirebaseError(err instanceof Error ? err.message : 'An unexpected error occurred', lang))
    } finally {
      setLoading(false)
    }
  }

  const switchMode = () => {
    setIsSignUp(!isSignUp)
    setError(null)
    setSuccess(false)
  }

  const features = VAULT_FEATURES[lang]

  return (
    <div className="h-screen overflow-hidden flex flex-col lg:flex-row">

      {/* ── Left panel ── */}
      <div className="relative lg:w-[55%] bg-black flex flex-col px-10 py-10 lg:px-16 lg:py-14 overflow-hidden h-full">

        {/* Fine dot grid */}
        <div className="absolute inset-0 opacity-[0.06]"
          style={{ backgroundImage: 'radial-gradient(circle, #ff2222 1px, transparent 1px)', backgroundSize: '28px 28px' }} />

        {/* Logo + lang toggle */}
        <div className="relative flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 w-fit">
            <Image src="/1.Docket-logo.svg" alt="Docket" width={30} height={30} unoptimized className="w-7 h-7 object-contain brightness-0 invert" />
            <span className="font-bold text-xl tracking-tighter text-white">docket</span>
          </Link>
          <button
            onClick={() => setLanguage(lang === 'en' ? 'bn' : 'en')}
            className="text-xs font-semibold text-red-400 hover:text-white transition-colors border border-red-500/30 hover:border-red-400/60 rounded-lg px-3 py-1.5"
          >
            {lang === 'en' ? 'বাংলা' : 'English'}
          </button>
        </div>

        {/* Hero copy */}
        <div className="relative mt-16 lg:mt-24 max-w-md">
          <h1 className="text-3xl lg:text-4xl font-bold text-white leading-snug">
            {copy.hero}
          </h1>
          {/* Red accent underline */}
          <div className="mt-4 w-12 h-0.5 bg-red-500" />
          <p className="mt-5 text-base text-zinc-400 leading-relaxed">
            {copy.heroSub}
          </p>
        </div>

        {/* Feature list */}
        <ul className="relative mt-10 lg:mt-14 space-y-5 max-w-md">
          {features.map(({ icon: Icon, title, desc, highlight }) => (
            <li key={title} className={`flex items-start gap-4 rounded-2xl p-4 ${
              highlight
                ? 'bg-red-600/10 border border-red-500/25'
                : 'bg-white/[0.03] border border-white/6'
            }`}>
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                highlight ? 'bg-red-600/20' : 'bg-red-600/10'
              }`}>
                <Icon className="w-4.5 h-4.5 text-red-400" />
              </div>
              <div>
                <p className={`text-sm font-semibold ${highlight ? 'text-red-300' : 'text-white'}`}>{title}</p>
                <p className="text-sm text-zinc-500 mt-0.5 leading-relaxed">{desc}</p>
              </div>
            </li>
          ))}
        </ul>

        <p className="relative mt-auto pt-16 text-xs text-zinc-700">
          © {new Date().getFullYear()} Docket · Government made easy · Bangladesh
        </p>
      </div>

      {/* ── Right panel — form ── */}
      <div className="lg:w-[45%] flex items-center justify-center bg-gray-50 px-8 py-16 h-full overflow-hidden">
        <div className="w-full max-w-sm space-y-6">

          {/* Heading */}
          <div className="space-y-1">
            <h2 className="text-2xl font-bold text-gray-900">
              {isSignUp ? copy.signUp : copy.signIn}
            </h2>
            <p className="text-sm text-gray-500">
              {isSignUp ? copy.signUpDesc : copy.signInDesc}
            </p>
          </div>

          {/* Success banner */}
          {success && (
            <div className="flex items-start gap-3 p-3.5 bg-emerald-50 ring-1 ring-emerald-200 rounded-xl">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-semibold text-emerald-800">{copy.successTitle}</p>
                <p className="text-xs text-emerald-600 mt-0.5">{copy.successHint}</p>
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleAuth} className="space-y-4">

            {/* Username — sign up only */}
            {isSignUp && (
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-gray-500">{copy.username}</label>
                <input
                  type="text"
                  placeholder="e.g. rahim123"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  autoComplete="username"
                  className="w-full h-10 px-3 rounded-xl ring-1 ring-black/10 bg-white text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900/20 transition-shadow"
                />
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-gray-500">{copy.email}</label>
              <input
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                className="w-full h-10 px-3 rounded-xl ring-1 ring-black/10 bg-white text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900/20 transition-shadow"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-gray-500">{copy.password}</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete={isSignUp ? 'new-password' : 'current-password'}
                className="w-full h-10 px-3 rounded-xl ring-1 ring-black/10 bg-white text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900/20 transition-shadow"
              />
            </div>

            {error && (
              <div className="flex items-start gap-2.5 p-3.5 bg-red-50 ring-1 ring-red-200 rounded-xl">
                <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 shrink-0" />
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full h-10 rounded-xl bg-gray-900 hover:bg-gray-700 text-white text-sm font-semibold flex items-center justify-center gap-2 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  {isSignUp ? copy.signUp : copy.signIn}
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Toggle mode */}
          <p className="text-center text-sm text-gray-500">
            {isSignUp ? copy.toggleSignIn : copy.toggleSignUp}{' '}
            <button
              onClick={switchMode}
              className="font-semibold text-gray-900 hover:text-red-600 transition-colors"
            >
              {isSignUp ? copy.toggleSignInLink : copy.toggleSignUpLink}
            </button>
          </p>

          <div className="flex items-center justify-center gap-2 text-xs text-gray-400 pt-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{copy.secured}</span>
          </div>
        </div>
      </div>

    </div>
  )
}
