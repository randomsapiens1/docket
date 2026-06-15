'use client'

import React, { useState } from 'react'
import { useLanguage } from '@/lib/language-context'
import { HelpCircle, ArrowRight, RotateCcw, Building2, User, Users, ShieldCheck, Zap } from 'lucide-react'
import Link from 'next/link'

type Step = 'owners' | 'goal' | 'liability' | 'result'

interface Answers {
  owners: 'single' | 'multiple' | null
  goal: 'lifestyle' | 'scale' | null
  liability: 'low' | 'high' | null
}

export function BusinessMatchmaker() {
  const { language } = useLanguage()
  const [step, setStep] = useState<Step>('owners')
  const [answers, setAnswers] = useState<Answers>({
    owners: null,
    goal: null,
    liability: null
  })

  const t = {
    en: {
      title: "Business Type Matchmaker",
      subtitle: "Find the right legal structure in 30 seconds",
      restart: "Start Over",
      next: "Next Question",
      questions: {
        owners: {
          q: "How many people are starting this business?",
          options: [
            { id: 'single', label: "Just Me", icon: User, desc: "I am the sole founder and owner." },
            { id: 'multiple', label: "2 or More", icon: Users, desc: "I have partners or co-founders." }
          ]
        },
        goal: {
          q: "What is your primary long-term goal?",
          options: [
            { id: 'lifestyle', label: "Steady Income", icon: Zap, desc: "Keep it simple and manage it myself/locally." },
            { id: 'scale', label: "Scale & Invest", icon: Building2, desc: "Raise funding, issue shares, and grow big." }
          ]
        },
        liability: {
          q: "How important is personal asset protection?",
          options: [
            { id: 'high', label: "Critical", icon: ShieldCheck, desc: "Personal assets must be separate from business debts." },
            { id: 'low', label: "Not Priority", icon: HelpCircle, desc: "I'm okay with shared liability to save on setup costs." }
          ]
        }
      },
      results: {
        proprietorship: {
          title: "Sole Proprietorship",
          desc: "Best for individuals starting small with minimal compliance. Cheap to start, but you are personally liable for all business debts.",
          action: "Learn about Trade License",
          href: "#"
        },
        partnership: {
          title: "Partnership Firm",
          desc: "Perfect for 2+ partners who want to share profits and responsibilities without the complexity of a company.",
          action: "Partnership Guide",
          href: "#"
        },
        privateltd: {
          title: "Private Limited Company",
          desc: "The gold standard for serious businesses. Offers limited liability, professional image, and is required for raising investment.",
          action: "Start Registration",
          href: "/services/incorporate-a-private-company"
        }
      }
    },
    bn: {
      title: "ব্যবসায়িক ধরণ ম্যাচমেকার",
      subtitle: "৩০ সেকেন্ডে আপনার জন্য সঠিক আইনি কাঠামো খুঁজুন",
      restart: "আবার শুরু করুন",
      next: "পরবর্তী প্রশ্ন",
      questions: {
        owners: {
          q: "কতজন মিলে এই ব্যবসা শুরু করছেন?",
          options: [
            { id: 'single', label: "শুধু আমি", icon: User, desc: "আমিই একমাত্র প্রতিষ্ঠাতা এবং মালিক।" },
            { id: 'multiple', label: "২ বা ততোধিক", icon: Users, desc: "আমার পার্টনার বা কো-ফাউন্ডার আছে।" }
          ]
        },
        goal: {
          q: "আপনার প্রাথমিক দীর্ঘমেয়াদী লক্ষ্য কী?",
          options: [
            { id: 'lifestyle', label: "স্থায়ী আয়", icon: Zap, desc: "সহজভাবে এবং নিজে/স্থানীয়ভাবে পরিচালনা করা।" },
            { id: 'scale', label: "স্কেল এবং ইনভেস্ট", icon: Building2, desc: "ফান্ডিং তোলা, শেয়ার ইস্যু করা এবং বড় হওয়া।" }
          ]
        },
        liability: {
          q: "ব্যক্তিগত সম্পদ সুরক্ষা কতটা গুরুত্বপূর্ণ?",
          options: [
            { id: 'high', label: "অত্যন্ত গুরুত্বপূর্ণ", icon: ShieldCheck, desc: "ব্যক্তিগত সম্পদ ব্যবসার ঋণ থেকে আলাদা থাকতে হবে।" },
            { id: 'low', label: "অগ্রাধিকার নয়", icon: HelpCircle, desc: "খরচ কমাতে আমি শেয়ারড লায়াবিলিটিতে রাজি।" }
          ]
        }
      },
      results: {
        proprietorship: {
          title: "সোল প্রোপাইটরশিপ",
          desc: "স্বল্প খরচে এবং কম ঝক্কিতে ব্যবসা শুরু করতে চাওয়া ব্যক্তিদের জন্য সেরা। তবে ব্যবসার ঋণের জন্য আপনি ব্যক্তিগতভাবে দায়ী থাকবেন।",
          action: "ট্রেড লাইসেন্স সম্পর্কে জানুন",
          href: "#"
        },
        partnership: {
          title: "পার্টনারশিপ ফার্ম",
          desc: "২ বা ততোধিক পার্টনারদের জন্য উপযুক্ত যারা কোম্পানির জটিলতা ছাড়াই লভ্যাংশ এবং দায়িত্ব ভাগ করে নিতে চান।",
          action: "পার্টনারশিপ নির্দেশিকা",
          href: "#"
        },
        privateltd: {
          title: "প্রাইভেট লিমিটেড কোম্পানি",
          desc: "সিরিয়াস ব্যবসার জন্য সেরা পছন্দ। এটি লিমিটেড লায়াবিলিটি এবং প্রফেশনাল ইমেজ প্রদান করে, যা ইনভেস্টমেন্ট পাওয়ার জন্য আবশ্যক।",
          action: "নিবন্ধন শুরু করুন",
          href: "/services/incorporate-a-private-company"
        }
      }
    }
  }[language]

  const handleAnswer = (val: string) => {
    const newAnswers = { ...answers, [step]: val }
    setAnswers(newAnswers as Answers)
    
    if (step === 'owners') setStep('goal')
    else if (step === 'goal') setStep('liability')
    else if (step === 'liability') setStep('result')
  }

  const getResult = () => {
    if (answers.owners === 'single' && answers.goal === 'lifestyle') return t.results.proprietorship
    if (answers.owners === 'multiple' && answers.goal === 'lifestyle') return t.results.partnership
    return t.results.privateltd
  }

  const result = getResult()

  return (
    <div className="bg-white border-[3px] border-black p-6 sm:p-10 space-y-8 min-h-[450px] flex flex-col justify-center relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-yellow-400 rounded-full opacity-10" />
      
      <div className="relative z-10 space-y-8">
        {step !== 'result' ? (
          <>
            <div className="space-y-2">
              <h3 className="text-3xl font-black text-black">{t.title}</h3>
              <p className="text-gray-500 font-bold uppercase text-xs tracking-widest">{t.subtitle}</p>
              
              {/* Progress Bar */}
              <div className="flex gap-2 pt-4">
                {['owners', 'goal', 'liability'].map((s, i) => (
                  <div 
                    key={s} 
                    className={`h-2 flex-1 border-2 border-black transition-colors ${
                      step === s ? 'bg-[#ff0000]' : 
                      (['owners', 'goal', 'liability'].indexOf(step) > i ? 'bg-black' : 'bg-gray-100')
                    }`} 
                  />
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <h4 className="text-xl font-bold text-black">{t.questions[step as keyof typeof t.questions].q}</h4>
              <div className="grid sm:grid-cols-2 gap-4">
                {t.questions[step as keyof typeof t.questions].options.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => handleAnswer(opt.id)}
                    className="flex flex-col items-start p-6 border-[3px] border-black hover:bg-gray-50 hover:translate-x-1 hover:-translate-y-1 transition-all text-left bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1"
                  >
                    <opt.icon className="w-8 h-8 text-[#ff0000] mb-4" />
                    <span className="font-black text-lg block">{opt.label}</span>
                    <span className="text-sm text-gray-600 font-medium leading-tight mt-1">{opt.desc}</span>
                  </button>
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="space-y-8 text-center sm:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-50 border-2 border-green-600 text-green-700 text-xs font-black uppercase mb-2">
              <ShieldCheck className="w-4 h-4" />
              Recommended Structure
            </div>
            
            <div className="space-y-4">
              <h3 className="text-4xl sm:text-5xl font-black text-black">{result.title}</h3>
              <p className="text-lg text-gray-700 font-medium max-w-2xl leading-relaxed">
                {result.desc}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link 
                href={result.href}
                className="flex-1 sm:flex-none px-8 py-4 bg-[#ff0000] text-white font-black text-lg border-[3px] border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all flex items-center justify-center gap-2"
              >
                {result.action}
                <ArrowRight className="w-6 h-6" />
              </Link>
              <button
                onClick={() => {
                  setStep('owners')
                  setAnswers({ owners: null, goal: null, liability: null })
                }}
                className="px-8 py-4 bg-white text-black font-black text-lg border-[3px] border-black flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors"
              >
                <RotateCcw className="w-5 h-5" />
                {t.restart}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
