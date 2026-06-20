'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Header } from '@/components/landing/header'
import { Footer } from '@/components/landing/footer'
import { useLanguage } from '@/lib/language-context'
import { ShieldCheck, ArrowRight, Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default function AuthPage() {
  const { language } = useLanguage()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [isSignUp, setIsSignUp] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const supabase = createClient()
  const router = useRouter()

  const t = {
    en: {
      signIn: "Sign In",
      signUp: "Create Account",
      email: "Email Address",
      password: "Password",
      description: "Access your secure Document Vault and track your government applications.",
      toggleSignUp: "Don't have an account? Sign up",
      toggleSignIn: "Already have an account? Sign in",
      successSignUp: "Check your email for the confirmation link!",
      errorHeader: "Authentication Error"
    },
    bn: {
      signIn: "সাইন ইন",
      signUp: "অ্যাকাউন্ট তৈরি করুন",
      email: "ইমেইল অ্যাড্রেস",
      password: "পাসওয়ার্ড",
      description: "আপনার সুরক্ষিত ডকুমেন্ট ভল্ট অ্যাক্সেস করুন এবং সরকারি আবেদন ট্র্যাক করুন।",
      toggleSignUp: "অ্যাকাউন্ট নেই? সাইন আপ করুন",
      toggleSignIn: "অ্যাকাউন্ট আছে? সাইন ইন করুন",
      successSignUp: "নিশ্চিতকরণের জন্য আপনার ইমেইল চেক করুন!",
      errorHeader: "অথেন্টিকেশন ত্রুটি"
    }
  }[language]

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/auth/callback`,
          },
        })
        if (error) throw error
        alert(t.successSignUp)
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })
        if (error) throw error
        router.push('/vault')
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('An unexpected error occurred')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-[#f3f2f1] pt-16 flex flex-col">
      <Header />
      
      <div className="flex-grow flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white border-[3px] border-black p-8 space-y-8">
          <div className="space-y-2">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-[#ff0000] border-2 border-black mb-2">
              <ShieldCheck className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-black text-black">
              {isSignUp ? t.signUp : t.signIn}
            </h1>
            <p className="text-sm font-medium text-gray-600">
              {t.description}
            </p>
          </div>

          <form onSubmit={handleAuth} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-black uppercase text-gray-500">{t.email}</label>
              <Input 
                type="email" 
                placeholder="name@example.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black uppercase text-gray-500">{t.password}</label>
              <Input 
                type="password" 
                placeholder="••••••••" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && (
              <div className="p-4 bg-red-50 border-2 border-red-600 text-red-700 text-xs font-bold">
                <p className="uppercase mb-1">{t.errorHeader}:</p>
                {error}
              </div>
            )}

            <Button 
              type="submit" 
              disabled={loading}
              className="w-full bg-[#ff0000] hover:bg-[#cc0000] text-white font-black h-12 rounded-none border-b-4 border-black active:border-b-0 active:translate-y-1 transition-all flex items-center justify-center gap-2"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  {isSignUp ? t.signUp : t.signIn}
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </Button>
          </form>

          <div className="text-center pt-2">
            <button 
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-sm font-bold text-[#ff0000] hover:underline"
            >
              {isSignUp ? t.toggleSignIn : t.toggleSignUp}
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
