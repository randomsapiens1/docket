'use client'

import React, { useState, useRef, useEffect } from 'react'
import { useLanguage } from '@/lib/language-context'
import { ScrollReveal } from '@/components/ui/scroll-reveal'
import { 
  Search, 
  Baby, 
  Heart, 
  FileText, 
  ArrowRight, 
  CheckCircle2, 
  ShieldAlert, 
  Circle, 
  RotateCcw, 
  X,
  Briefcase
} from 'lucide-react'
import { cn } from '@/lib/utils'
import Link from 'next/link'

type EventType = 'birth' | 'marriage' | 'death' | 'business'

interface ActionStep {
  title: string
  desc: string
  status: 'Live' | 'Soon'
  href: string
}

interface EventData {
  title: string
  subtitle: string
  icon: React.ComponentType<{ className?: string }>
  actions: ActionStep[]
}

export function LifeEventsSection() {
  const { language } = useLanguage()
  const [searchQuery, setSearchQuery] = useState('')
  const [activeEvent, setActiveEvent] = useState<EventType | null>(null)
  const [noMatch, setNoMatch] = useState(false)
  const [completedTasks, setCompletedTasks] = useState<Record<string, boolean>>({})
  const [isMounted, setIsMounted] = useState(false)
  const resultsRef = useRef<HTMLDivElement>(null)

  // Load completed tasks from localStorage on client side mount
  useEffect(() => {
    setIsMounted(true)
    const stored = localStorage.getItem('docket_completed_life_events')
    if (stored) {
      try {
        setCompletedTasks(JSON.parse(stored))
      } catch (e) {
        console.error('Failed to parse completed tasks from localStorage', e)
      }
    }
  }, [])

  const t = {
    en: {
      heading: "Find Guides by Life Events",
      subheading: "What major event happened in your life? Search or choose below to see a checklist of everything you need.",
      placeholder: "e.g., 'register my business', 'my father died', or 'just had a baby'",
      searchBtn: "Find Guide",
      quickAccess: "Or select a life event:",
      noMatchTitle: "No direct match found",
      noMatchDesc: "We couldn't match your query directly. Please select one of the major events below or try terms like 'register', 'born', 'marriage', or 'death'.",
      actionHeader: "Your Action Plan",
      live: "Live Guide",
      soon: "Soon",
      progressTitle: "Your Progress",
      tasksCompleted: "tasks completed",
      historyTitle: "Completed Tasks Log (All Events)",
      historySubtitle: "A persistent log of everything you have checked off across all life events.",
      historyEmpty: "You haven't checked off any tasks yet. Select an event above and tick tasks to populate this history log.",
      resetBtn: "Reset Progress",
      eventLabel: "Event",
      completedBadge: "Completed",
      events: {
        birth: {
          title: "Welcoming a Child",
          subtitle: "Registering birth, passports, and school documents.",
          icon: Baby,
          actions: [
            {
              title: "Birth Registration (Birth Certificate)",
              desc: "Apply online within 45 days to obtain the child's official Birth Registration Certificate. This is mandatory for school admission, NID, and passports.",
              status: "Soon",
              href: "#"
            },
            {
              title: "Update Parent's TIN Profile",
              desc: "Ensure the parent's NID and TIN profiles are updated and verified, as these are required for parent authentication in birth registry and school admissions.",
              status: "Live",
              href: "/services/register-for-tin"
            },
            {
              title: "Apply for Child's Passport",
              desc: "Apply for a machine-readable or e-passport for the child. Requires both parents' NIDs and the child's digital birth certificate.",
              status: "Soon",
              href: "#"
            },
            {
              title: "School Admission Documents",
              desc: "Prepare the verified birth registration, parent NIDs, vaccination records, and utility bills for primary school admission forms.",
              status: "Soon",
              href: "#"
            }
          ]
        },
        marriage: {
          title: "Getting Married",
          subtitle: "Marriage deeds, spouse visas, and name changes.",
          icon: Heart,
          actions: [
            {
              title: "Register the Marriage (Kabin-nama)",
              desc: "Obtain the registered marriage contract (Kabin-nama) from a government-authorized Kazi/Registrar. This serves as the primary legal proof of marriage.",
              status: "Soon",
              href: "#"
            },
            {
              title: "NID Name & Address Correction",
              desc: "If changing names or updating addresses after marriage, submit an NID correction form along with the registered Kabin-nama.",
              status: "Soon",
              href: "#"
            },
            {
              title: "Spouse Visa & Family Travel Documents",
              desc: "Prepare family/spouse sponsorship visa applications. Requires attestation of the marriage certificate by the Ministry of Foreign Affairs (MoFA).",
              status: "Soon",
              href: "#"
            },
            {
              title: "TIN Registration for Joint Asset Buying",
              desc: "Register for a Taxpayer Identification Number (TIN) to buy joint properties, open joint bank accounts, or declare spouse tax allowances.",
              status: "Live",
              href: "/services/register-for-tin"
            }
          ]
        },
        death: {
          title: "Loss of a Loved One",
          subtitle: "Death certificate, inheritance khatian, and bank settlements.",
          icon: FileText,
          actions: [
            {
              title: "Register the Death & Get Certificate",
              desc: "Submit a death registration form at the local City Corporation ward office or Union Parishad. Requires a hospital death slip or councilor's proof.",
              status: "Soon",
              href: "#"
            },
            {
              title: "Apply for Warisan (Succession) Certificate",
              desc: "Obtain the Warisan Certificate listing all legal heirs of the deceased from the ward commissioner or Union Parishad chairman.",
              status: "Soon",
              href: "#"
            },
            {
              title: "Land Mutation (Namjari) for Inherited Land",
              desc: "Update the ownership ledger (Khatian) for any inherited properties. You must complete a mutation (namjari) in your name to sell, gift, or pay land taxes.",
              status: "Live",
              href: "/services/land-mutation"
            },
            {
              title: "Bank Account Nominee Claim / Settlement",
              desc: "Withdraw funds or transfer accounts belonging to the deceased. Requires the Warisan certificate, death certificate, and NID of all legal heirs.",
              status: "Soon",
              href: "#"
            }
          ]
        },
        business: {
          title: "Starting a Business",
          subtitle: "Trade licenses, company registration, and tax credentials.",
          icon: Briefcase,
          actions: [
            {
              title: "Incorporate a Private Company",
              desc: "Register your company with RJSC (Registrar of Joint Stock Companies and Firms) to obtain your official Incorporation Certificate.",
              status: "Live",
              href: "/services/incorporate-a-private-company"
            },
            {
              title: "Register for e-TIN",
              desc: "Obtain a Taxpayer Identification Number (TIN) in your company or personal name from the National Board of Revenue (NBR).",
              status: "Live",
              href: "/services/register-for-tin"
            },
            {
              title: "Obtain a Trade License",
              desc: "Apply at your local City Corporation, Municipality, or Union Parishad to get the legal authorization to run your business.",
              status: "Soon",
              href: "#"
            },
            {
              title: "VAT Registration (BIN Certificate)",
              desc: "Apply for a Business Identification Number (BIN) from NBR, which is mandatory for importing, exporting, and charging VAT.",
              status: "Soon",
              href: "#"
            }
          ]
        }
      }
    },
    bn: {
      heading: "জীবনভিত্তিক ঘটনা অনুযায়ী নির্দেশিকা",
      subheading: "আপনার জীবনে সম্প্রতি কোন বড় ঘটনাটি ঘটেছে? নিচে খুঁজুন বা নির্বাচন করুন এবং আপনার প্রয়োজনীয় কাজের সম্পূর্ণ তালিকাটি দেখে নিন।",
      placeholder: "যেমন: 'ব্যবসা শুরু করা', 'আমার বাবা মারা গেছেন', বা 'নতুন বাচ্চার জন্ম'",
      searchBtn: "নির্দেশিকা খুঁজুন",
      quickAccess: "অথবা একটি ঘটনা নির্বাচন করুন:",
      noMatchTitle: "সরাসরি কোনো মিল পাওয়া যায়নি",
      noMatchDesc: "আপনার অনুসন্ধান অনুযায়ী আমরা কোনো সরাসরি মিল পাইনি। দয়া করে নিচের মূল ঘটনাগুলোর একটি নির্বাচন করুন অথবা 'নিবন্ধন', 'জন্ম', 'বিয়ে' বা 'মৃত্যু' লিখে আবার খুঁজুন।",
      actionHeader: "আপনার কর্মপরিকল্পনা তালিকা",
      live: "লাইভ নির্দেশিকা",
      soon: "শীঘ্রই",
      progressTitle: "আপনার অগ্রগতি",
      tasksCompleted: "টি কাজ সম্পন্ন হয়েছে",
      historyTitle: "সম্পন্নকৃত কাজের লগ (সব ঘটনা)",
      historySubtitle: "আপনার সম্পন্ন করা সব কাজের একটি স্থায়ী রেকর্ড।",
      historyEmpty: "আপনার সম্পন্নকৃত কাজগুলো এখানে দেখা যাবে। ওপরের যেকোনো ঘটনা নির্বাচন করে কাজগুলো সম্পন্ন করুন!",
      resetBtn: "অগ্রগতি রিসেট করুন",
      eventLabel: "ঘটনা",
      completedBadge: "সম্পন্ন",
      events: {
        birth: {
          title: "নতুন শিশুর জন্ম",
          subtitle: "জন্ম নিবন্ধন, পাসপোর্ট এবং স্কুলের ভর্তি নথিপত্র।",
          icon: Baby,
          actions: [
            {
              title: "জন্ম নিবন্ধন (জন্ম সনদ)",
              desc: "শিশুর জন্মের ৪৫ দিনের মধ্যে অনলাইনে জন্ম নিবন্ধনের আবেদন করুন। স্কুলের ভর্তি, পাসপোর্ট এবং পরবর্তীতে এনআইডি কার্ডের জন্য এটি বাধ্যতামূলক।",
              status: "Soon",
              href: "#"
            },
            {
              title: "অভিভাবকের টিন (TIN) তথ্য আপডেট",
              desc: "নিশ্চিত করুন যে বাবা/মায়ের এনআইডি এবং টিন প্রোফাইল আপডেট করা আছে, কারণ শিশুর জন্ম নিবন্ধন এবং স্কুলে ভর্তির সময় অভিভাবক যাচাইয়ে এটি প্রয়োজন হয়।",
              status: "Live",
              href: "/services/register-for-tin"
            },
            {
              title: "শিশুর পাসপোর্টের জন্য আবেদন",
              desc: "শিশুর জন্য ই-পাসপোর্ট বা মেশিন রিডেবল পাসপোর্টের আবেদন করুন। এর জন্য শিশুর ডিজিটাল জন্ম সনদ এবং বাবা-মায়ের এনআইডি কার্ডের প্রয়োজন হবে।",
              status: "Soon",
              href: "#"
            },
            {
              title: "স্কুলে ভর্তির প্রয়োজনীয় কাগজপত্র",
              desc: "প্রাথমিক স্কুলে ভর্তির জন্য শিশুর ডিজিটাল জন্ম নিবন্ধন সনদ, টিকা কার্ড এবং অভিভাবকের কর নিবন্ধনের তথ্য ফাইল প্রস্তুত করুন।",
              status: "Soon",
              href: "#"
            }
          ]
        },
        marriage: {
          title: "বিবাহ বন্ধন",
          subtitle: "বিবাহ নিবন্ধন (কাবিননামা), স্পাউস ভিসা এবং নাম সংশোধন।",
          icon: Heart,
          actions: [
            {
              title: "বিবাহ নিবন্ধন (কাবিননামা)",
              desc: "সরকারি লাইসেন্সধারী কাজী বা বিবাহ নিবন্ধকের কাছ থেকে নিবন্ধিত কাবিননামা সংগ্রহ করুন। এটি বিবাহের প্রাথমিক আইনি প্রমাণ।",
              status: "Soon",
              href: "#"
            },
            {
              title: "এনআইডিতে নাম ও ঠিকানা পরিবর্তন",
              desc: "বিবাহের পর এনআইডি কার্ড ও পাসপোর্টে নাম বা ঠিকানা পরিবর্তন করতে চাইলে কাবিননামার কপি সংযুক্ত করে সংশোধনের আবেদন দাখিল করুন।",
              status: "Soon",
              href: "#"
            },
            {
              title: "স্পাউস ভিসা ও ফ্যামিলি ইমিগ্রেশন",
              desc: "পারিবারিক ইমিগ্রেশন বা স্পাউস ভিসার আবেদন প্রস্তুত করুন। এর জন্য পররাষ্ট্র মন্ত্রণালয় (MoFA) দ্বারা কাবিননামা বা ম্যারেজ সার্টিফিকেট সত্যায়িত করা বাধ্যতামুলক।",
              status: "Soon",
              href: "#"
            },
            {
              title: "যৌথ সম্পত্তি ক্রয়ের জন্য টিন (TIN) রেজিস্ট্রেশন",
              desc: "স্বামী-স্ত্রী যৌথ নামে সম্পত্তি ক্রয়ের জন্য, যৌথ ব্যাংক হিসাব খোলার জন্য বা আয়করে স্পাউস ছাড় পাওয়ার জন্য টিন (TIN) নিবন্ধন সম্পন্ন করুন।",
              status: "Live",
              href: "/services/register-for-tin"
            }
          ]
        },
        death: {
          title: "স্বজন হারানো (মৃত্যু)",
          subtitle: "মৃত্যু সনদ, ওয়ারিশন/উত্তরাধিকার সনদ এবং ব্যাংক হিসাব নিষ্পত্তি।",
          icon: FileText,
          actions: [
            {
              title: "মৃত্যু নিবন্ধন ও সনদপত্র সংগ্রহ",
              desc: "স্থানীয় সিটি কর্পোরেশনের ওয়ার্ড কাউন্সিলর অফিস বা ইউনিয়ন পরিষদ থেকে অফিশিয়াল মৃত্যু সনদ সংগ্রহ করুন। হাসপাতাল বা স্থানীয় গন্যমান্য ব্যক্তির প্রত্যয়ন প্রয়োজন হবে।",
              status: "Soon",
              href: "#"
            },
            {
              title: "ওয়ারিশন (উত্তরাধিকার) সনদপত্র সংগ্রহ",
              desc: "মৃত ব্যক্তির বৈধ উত্তরাধিকারীদের তালিকা সংবলিত ওয়ারিশন সনদ সংগ্রহ করুন। এটি কাউন্সিলর বা ইউনিয়ন পরিষদ চেয়ারম্যান ইস্যু করে থাকেন।",
              status: "Soon",
              href: "#"
            },
            {
              title: "উত্তরাধিকার সূত্রে প্রাপ্ত জমির নামজারি (মিউটেশন)",
              desc: "মৃত ব্যক্তির রেখে যাওয়া জমি বা সম্পত্তির মালিকানা খতিয়ান আপনার নামে আপডেট করুন। এটি ছাড়া জমি বিক্রয়, হেবা/দান করা বা খাজনা প্রদান সম্ভব নয়।",
              status: "Live",
              href: "/services/land-mutation"
            },
            {
              title: "ব্যাংক অ্যাকাউন্ট ও নমিনি সংক্রান্ত দাবি নিষ্পত্তি",
              desc: "মৃত ব্যক্তির ব্যাংক অ্যাকাউন্ট বন্ধ করতে বা জমাকৃত টাকা উত্তোলন করতে ব্যাংক বরাবর আবেদন করুন। এর জন্য মৃত্যু সনদ, ওয়ারিশ সনদ ও উত্তরাধিকারীদের এনআইডি প্রয়োজন হবে।",
              status: "Soon",
              href: "#"
            }
          ]
        },
        business: {
          title: "নতুন ব্যবসা শুরু করা",
          subtitle: "ট্রেড লাইসেন্স, কোম্পানি নিবন্ধন এবং ট্যাক্স নথিপত্র।",
          icon: Briefcase,
          actions: [
            {
              title: "প্রাইভেট লিমিটেড কোম্পানি ইনকরপোরেশন",
              desc: "অফিশিয়াল ইনকরপোরেশন সার্টিফিকেট পেতে আরজেএসসি (RJSC) এর মাধ্যমে আপনার কোম্পানি রেজিস্টার করুন।",
              status: "Live",
              href: "/services/incorporate-a-private-company"
            },
            {
              title: "ই-টিন (e-TIN) রেজিস্ট্রেশন",
              desc: "জাতীয় রাজস্ব বোর্ড (NBR) থেকে কোম্পানি বা ব্যক্তিগত নামে করদাতা সনাক্তকরণ নম্বর (TIN) সংগ্রহ করুন।",
              status: "Live",
              href: "/services/register-for-tin"
            },
            {
              title: "ট্রেড লাইসেন্স সংগ্রহ",
              desc: "আপনার ব্যবসা পরিচালনা করার আইনি অনুমতি পেতে স্থানীয় সিটি কর্পোরেশন, পৌরসভা বা ইউনিয়ন পরিষদে আবেদন করুন।",
              status: "Soon",
              href: "#"
            },
            {
              title: "ভ্যাট রেজিস্ট্রেশন (BIN সনদ)",
              desc: "জাতীয় রাজস্ব বোর্ড থেকে ব্যবসায়িক সনাক্তকরণ নম্বর (BIN) সংগ্রহ করুন, যা আমদানি, রপ্তানি ও ভ্যাট চালানের জন্য বাধ্যতামূলক।",
              status: "Soon",
              href: "#"
            }
          ]
        }
      }
    }
  }[language]

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const q = searchQuery.toLowerCase().trim()
    if (!q) return

    setNoMatch(false)
    
    // Core keyword maps for initial boost
    const directKeywords: Record<EventType, string[]> = {
      death: ['die', 'dead', 'death', 'passed away', 'father', 'mother', 'parent', 'inherit', 'warisan', 'succession', 'loss', 'loved one', 'মারা', 'মৃত্যু', 'উত্তরাধিকার', 'বাবা', 'মা', 'ওয়ারিশ', 'ওয়ারিশন', 'সনদ'],
      birth: ['baby', 'child', 'born', 'birth', 'kid', 'son', 'daughter', 'school', 'admission', 'জন্ম', 'সন্তান', 'বাচ্চা', 'শিশু', 'স্কুল', 'ভর্তি', 'ছেলে', 'মেয়ে'],
      marriage: ['marry', 'married', 'marriage', 'wedding', 'spouse', 'wife', 'husband', 'visa', 'name change', 'বিয়ে', 'বিবাহ', 'স্বামী', 'স্ত্রী', 'কাবিন', 'নাম পরিবর্তন'],
      business: ['business', 'company', 'register', 'trade license', 'vat', 'bin', 'tin', 'rjsc', 'incorporate', 'entrepreneur', 'corporate', 'firm', 'partnership', 'ব্যবসা', 'উদ্যোক্তা', 'কোম্পানি', 'ট্রেড লাইসেন্স', 'নিবন্ধন', 'ভ্যাট', 'বিন', 'উদ্যোগ']
    }

    const eventScores: Record<EventType, number> = { birth: 0, marriage: 0, death: 0, business: 0 }

    // 1. Direct keyword scores
    const eventIds: EventType[] = ['birth', 'marriage', 'death', 'business']
    eventIds.forEach(id => {
      directKeywords[id].forEach(kw => {
        if (q.includes(kw)) {
          eventScores[id] += 15 // High boost for matching core keywords
        }
      })
    })

    // 2. Tokenized search across all titles, subtitles and actions
    const queryWords = q.split(/\s+/).filter(word => word.length > 1)
    
    eventIds.forEach(id => {
      const eventConfig = t.events[id]
      queryWords.forEach(word => {
        // Event title & subtitle matches
        if (eventConfig.title.toLowerCase().includes(word)) eventScores[id] += 5
        if (eventConfig.subtitle.toLowerCase().includes(word)) eventScores[id] += 3

        // Checklist Action matches
        eventConfig.actions.forEach(action => {
          if (action.title.toLowerCase().includes(word)) eventScores[id] += 4
          if (action.desc.toLowerCase().includes(word)) eventScores[id] += 2
        })
      })
    })

    // 3. Find the best match
    let highestScore = 0
    let bestMatch: EventType | null = null

    Object.entries(eventScores).forEach(([id, score]) => {
      if (score > highestScore) {
        highestScore = score
        bestMatch = id as EventType
      }
    })

    if (bestMatch && highestScore > 0) {
      setActiveEvent(bestMatch)
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 100)
    } else {
      setNoMatch(true)
      setActiveEvent(null)
    }
  }

  const selectEvent = (type: EventType) => {
    setNoMatch(false)
    setActiveEvent(type)
    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 100)
  }

  const toggleTask = (eventId: EventType, index: number) => {
    const key = `${eventId}_${index}`
    setCompletedTasks(prev => {
      const updated = { ...prev, [key]: !prev[key] }
      localStorage.setItem('docket_completed_life_events', JSON.stringify(updated))
      return updated
    })
  }

  const handleResetProgress = () => {
    const confirmMsg = language === 'en' 
      ? "Are you sure you want to reset all your life event progress?" 
      : "আপনি কি আপনার সব অগ্রগতি মুছে ফেলতে চান?"
    if (confirm(confirmMsg)) {
      setCompletedTasks({})
      localStorage.removeItem('docket_completed_life_events')
    }
  }

  // Calculate progress stats for the active guide
  const getActiveProgressStats = () => {
    if (!activeEvent) return { completed: 0, total: 0, pct: 0 }
    const actions = t.events[activeEvent].actions
    const completed = actions.filter((_, idx) => !!completedTasks[`${activeEvent}_${idx}`]).length
    const total = actions.length
    const pct = total > 0 ? Math.round((completed / total) * 100) : 0
    return { completed, total, pct }
  }

  // Generate dynamic list of completed tasks across all guides
  const getCompletedTasksList = () => {
    const list: { 
      eventId: EventType
      eventTitle: string
      taskTitle: string
      taskIndex: number
      isLive: boolean
      href: string
    }[] = []

    const eventIds: EventType[] = ['birth', 'marriage', 'death', 'business']
    eventIds.forEach(id => {
      const eventConfig = t.events[id]
      eventConfig.actions.forEach((action, idx) => {
        if (completedTasks[`${id}_${idx}`]) {
          list.push({
            eventId: id,
            eventTitle: eventConfig.title,
            taskTitle: action.title,
            taskIndex: idx,
            isLive: action.status === 'Live',
            href: action.href
          })
        }
      })
    })

    return list
  }

  const activeProgress = getActiveProgressStats()
  const completedList = getCompletedTasksList()

  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 border-t border-b border-border relative z-10">
      <ScrollReveal animation="slide-up">
        <div className="max-w-7xl mx-auto space-y-8 sm:space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
            {t.heading}
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            {t.subheading}
          </p>
        </div>

        {/* Search Box Container */}
        <div className="bg-white border-[3px] sm:border-[4px] border-black p-6 sm:p-8 space-y-6">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.placeholder}
                className="w-full pl-12 pr-4 py-4 bg-white border-[3px] border-black text-black font-bold focus:ring-0 focus:outline-none placeholder-gray-400"
              />
            </div>
            <button
              type="submit"
              className="bg-black hover:bg-gray-800 text-white font-black px-8 py-4 border-[3px] border-black active:translate-y-0.5 active:translate-x-0.5 transition-all text-center shrink-0 uppercase tracking-wider text-sm"
            >
              {t.searchBtn}
            </button>
          </form>

          {/* Quick Access Grid */}
          <div className="space-y-3">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">
              {t.quickAccess}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {(['birth', 'marriage', 'death', 'business'] as EventType[]).map((type) => {
                const eventConfig = t.events[type]
                const Icon = eventConfig.icon
                const isSelected = activeEvent === type

                return (
                  <button
                    key={type}
                    onClick={() => selectEvent(type)}
                    className={cn(
                      "flex items-start gap-4 p-5 border-[3px] border-black text-left transition-all hover:bg-gray-50",
                      isSelected 
                        ? "bg-white border-[#ff0000] ring-2 ring-offset-2 ring-black" 
                        : "bg-white"
                    )}
                  >
                    <div className={cn(
                      "p-3 border-2 border-black shrink-0",
                      type === 'death' ? "bg-red-100" : 
                      type === 'marriage' ? "bg-pink-100" : 
                      type === 'birth' ? "bg-blue-100" : 
                      "bg-emerald-100"
                    )}>
                      <Icon className="w-6 h-6 text-black" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-extrabold text-sm uppercase text-black">{eventConfig.title}</h4>
                      <p className="text-xs text-gray-500 leading-snug">{eventConfig.subtitle}</p>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Search Error Message */}
        {noMatch && (
          <div className="bg-red-50 border-[3px] border-black p-6 flex gap-4 items-start animate-in fade-in slide-in-from-top-2 duration-300">
            <ShieldAlert className="w-6 h-6 text-[#ff0000] shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h4 className="font-black text-black text-lg">{t.noMatchTitle}</h4>
              <p className="text-sm text-gray-700 leading-relaxed">{t.noMatchDesc}</p>
            </div>
          </div>
        )}

        {/* Actions Checklist Result Box */}
        {activeEvent && (
          <div 
            ref={resultsRef}
            className="bg-white border-[3px] sm:border-[4px] border-black p-6 sm:p-10 space-y-6 sm:space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300"
          >
            {/* Guide Title Section */}
            <div className="border-b-[3px] border-dashed border-gray-200 pb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="space-y-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-[#ff0000] px-2 py-1 border border-black bg-red-50">
                  {t.actionHeader}
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-black">
                  {t.events[activeEvent].title}
                </h3>
              </div>
              <p className="text-sm text-gray-500 font-medium max-w-md">
                {t.events[activeEvent].subtitle}
              </p>
            </div>

            {/* Guide Progress Tracker */}
            {isMounted && (
              <div className="p-4 bg-gray-50 border-2 border-black space-y-2">
                <div className="flex justify-between items-center text-xs font-black uppercase text-black">
                  <span>{t.progressTitle}</span>
                  <span>{activeProgress.completed} / {activeProgress.total} {t.tasksCompleted} ({activeProgress.pct}%)</span>
                </div>
                <div className="w-full bg-gray-200 border-2 border-black h-4 overflow-hidden">
                  <div 
                    className="bg-[#ff0000] h-full transition-all duration-500 ease-out"
                    style={{ width: `${activeProgress.pct}%` }}
                  />
                </div>
              </div>
            )}

            {/* Interactive Checklist Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {t.events[activeEvent].actions.map((action, index) => {
                const isLive = action.status === 'Live'
                const isChecked = !!completedTasks[`${activeEvent}_${index}`]

                return (
                  <div 
                    key={index}
                    className={cn(
                      "border-2 border-black p-5 flex flex-col justify-between transition-all relative select-none",
                      isChecked ? "bg-gray-50" : "bg-white hover:bg-gray-50"
                    )}
                  >
                    <div className="space-y-3">
                      {/* Checkbox + Title Row */}
                      <div className="flex justify-between items-start gap-4">
                        <div className="flex items-start gap-3 flex-1 min-w-0">
                          {isMounted ? (
                            <button
                              onClick={() => toggleTask(activeEvent, index)}
                              className="shrink-0 mt-1 cursor-pointer transition-transform duration-100 hover:scale-110 active:scale-95"
                              title={isChecked ? "Mark Incomplete" : "Mark Completed"}
                              aria-label={isChecked ? "Mark incomplete" : "Mark completed"}
                            >
                              {isChecked ? (
                                <CheckCircle2 className="w-5 h-5 text-green-600 stroke-[3px]" />
                              ) : (
                                <Circle className="w-5 h-5 text-black hover:text-[#ff0000] stroke-[3px]" />
                              )}
                            </button>
                          ) : (
                            <div className="w-5 h-5 border-2 border-black rounded-full shrink-0 mt-1" />
                          )}
                          
                          <h4 className={cn(
                            "font-extrabold text-base text-black leading-snug",
                            isChecked && "text-gray-400 line-through"
                          )}>
                            {action.title}
                          </h4>
                        </div>

                        <span className={cn(
                          "text-[8px] sm:text-[9px] font-black uppercase px-2 py-0.5 border border-black shrink-0",
                          isLive ? "bg-[#ff0000] text-white border-[#ff0000]" : "bg-white text-gray-400 border-gray-200"
                        )}>
                          {isLive ? t.live : t.soon}
                        </span>
                      </div>
                      
                      <p className={cn(
                        "text-xs text-gray-600 leading-relaxed pl-8",
                        isChecked && "text-gray-400"
                      )}>
                        {action.desc}
                      </p>
                    </div>

                    {isLive && (
                      <div className="pt-4 pl-8">
                        <Link 
                          href={action.href}
                          className="inline-flex items-center gap-2 text-xs font-black text-[#ff0000] hover:underline"
                        >
                          Explore Live Guide
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Global Progress History Log ("What I Have Done") */}
        {isMounted && completedList.length > 0 && (
          <div className="bg-white border-[3px] border-black overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
            {/* Retro Windows Terminal Bar */}
            <div className="bg-black text-white px-4 py-2.5 font-bold uppercase tracking-wider text-xs flex justify-between items-center select-none">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse shrink-0" />
                <span>{t.historyTitle}</span>
              </div>
              <span className="text-[9px] font-mono opacity-75">STATE: PERSISTENT_LOG</span>
            </div>

            {/* Log Body */}
            <div className="p-6 sm:p-8 space-y-6">
              <p className="text-xs sm:text-sm text-gray-500 font-bold uppercase tracking-wide">
                {t.historySubtitle}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {completedList.map((item) => (
                  <div 
                    key={`${item.eventId}_${item.taskIndex}`}
                    className="border-2 border-black bg-gray-50 p-4 flex items-start justify-between gap-4 transition-all hover:bg-gray-100"
                  >
                    <div className="space-y-2 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        {/* Event Source Tag */}
                        <span className={cn(
                          "text-[8px] font-black uppercase px-1.5 py-0.5 border border-black",
                          item.eventId === 'death' ? "bg-red-100 text-red-800" : 
                          item.eventId === 'marriage' ? "bg-pink-100 text-pink-800" : 
                          item.eventId === 'birth' ? "bg-blue-100 text-blue-800" :
                          "bg-emerald-100 text-emerald-800"
                        )}>
                          {item.eventTitle}
                        </span>
                        
                        {/* Done Tag */}
                        <span className="text-[8px] font-black uppercase px-1.5 py-0.5 border border-black bg-green-100 text-green-800">
                          {t.completedBadge}
                        </span>
                      </div>
                      
                      <p className="text-sm font-bold text-black leading-snug truncate-2-lines pr-2" title={item.taskTitle}>
                        {item.taskTitle}
                      </p>
                      
                      {item.isLive && (
                        <Link 
                          href={item.href}
                          className="inline-flex items-center gap-1 text-[11px] font-black text-[#ff0000] hover:underline"
                        >
                          {t.live} &rarr;
                        </Link>
                      )}
                    </div>

                    <button 
                      onClick={() => toggleTask(item.eventId, item.taskIndex)}
                      className="p-1 hover:bg-gray-200 border border-black bg-white transition-all text-black hover:text-[#ff0000] shrink-0 active:translate-y-0.5"
                      title="Undo completed state"
                      aria-label="Undo completed state"
                    >
                      <X className="w-4 h-4 stroke-[3px]" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Reset Progress Panel */}
              <div className="pt-4 border-t-2 border-dashed border-gray-200 flex justify-end">
                <button
                  onClick={handleResetProgress}
                  className="inline-flex items-center gap-2 px-4 py-2 border-2 border-black bg-white hover:bg-red-50 text-[#ff0000] font-black text-xs uppercase transition-all active:translate-y-0.5 active:translate-x-0.5"
                >
                  <RotateCcw className="w-3.5 h-3.5 stroke-[3px]" />
                  {t.resetBtn}
                </button>
              </div>
            </div>
          </div>
        )}
        </div>
      </ScrollReveal>
    </section>
  )
}
