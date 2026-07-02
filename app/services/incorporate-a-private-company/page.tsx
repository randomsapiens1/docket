'use client'

import { useState, useEffect } from 'react'
import { Header } from '@/components/landing/header'
import { Footer } from '@/components/landing/footer'
import { useLanguage } from '@/lib/language-context'
import { CheckCircle2, Circle, Clock, CreditCard, FileText, Layout as LayoutIcon, ArrowLeft, ArrowRight, ShieldCheck, Calculator } from 'lucide-react'
import Link from 'next/link'
import { auth, db } from '@/lib/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { collection, query, where, getDocs } from 'firebase/firestore'
import { TemplateLibrary } from '@/components/resources/template-library'
import { templates } from '@/lib/templates'

const content = {
  en: {
    title: "Business Setup & Company Registration",
    dept: "Registrar of Joint Stock Companies & Firms (RJSC)",
    stats: [
      { label: "Estimated Time", value: "20-30 Days", icon: Clock },
      { label: "Government Fee", value: "Starts from ৳11,000", icon: CreditCard },
      { label: "Complexity", value: "High", icon: LayoutIcon }
    ],
    prepTitle: "Preparation Checklist",
    prepDesc: "Gather these documents and forms before you start the registration process.",
    docs: [
      { label: "Proposed Company Name (for Clearance)", docType: null },
      { label: "NID / Passport of all Directors & Shareholders", docType: "NID" },
      { label: "Passport sized photo of all Directors", docType: "PHOTO" },
      { label: "TIN Certificate of all Directors", docType: "TIN" },
      { label: "Registered Office Address & Lease Agreement", docType: "LEASE_AGREEMENT" },
      { label: "Draft Memorandum & Articles of Association (MoA/AoA)", docType: "MOA" },
      { label: "Encashment Certificate (for foreign shareholders)", docType: null },
      { label: "Form I: Declaration on Registration of Company", docType: null },
      { label: "Form VI: Notice of Registered Office Situation", docType: null },
      { label: "Form IX: Consent of Director to Act", docType: null },
      { label: "Form X: List of Persons Consenting to be Directors", docType: null },
      { label: "Form XII: Particulars of Directors & Managers", docType: null }
    ],
    foundInVault: "Found in Vault",
    stepsTitle: "Step-by-Step Pathway",
    steps: [
      {
        title: "Search Entity Name",
        desc: "Before applying, use the 'Search Entity Names' tool on the RJSC portal to ensure your proposed name isn't already in use.",
        action: "Check Availability",
        link: "https://app.roc.gov.bd/rjsc-portal/search-entity-name.html"
      },
      {
        title: "Name Clearance Certificate",
        desc: "Go to 'Pre-Registration Activities' and select 'Apply for Name Clearance'. This is a pre-requisite valid for 30 days.",
        action: "Apply Online",
        link: "https://app.roc.gov.bd/"
      },
      {
        title: "Pay Stamp Duty",
        desc: "Pay stamp duty at a designated bank (e.g., BRAC Bank). Fees depend on authorized share capital.",
        action: "Calculate Stamp Duty",
        link: "/calculators/fee-calculator"
      },
      {
        title: "Registration at RJSC",
        desc: "Under 'Registration', select 'Apply for Registration'. Upload your MoA, AoA, and required forms (I, VI, IX, X, XII).",
        action: "Submit Application",
        link: "https://app.roc.gov.bd/"
      },
      {
        title: "Make a Company Seal",
        desc: "Once incorporated, procure an official company seal from any seal-making shop.",
        action: null,
        link: "#"
      },
      {
        title: "Open a Bank Account",
        desc: "Open a corporate bank account. Note: Foreign-owned companies must open a temporary 'Capital Remittance' account before registration.",
        action: null,
        link: "#"
      },
      {
        title: "Obtain a Trade License",
        desc: "Apply to the respective City Corporation or Municipal Corporation for a trade license.",
        action: "Trade License Guide",
        link: "/services/trade-license"
      },
      {
        title: "TIN Certificate",
        desc: "Register with the National Board of Revenue (NBR) to receive the company's Tax Identification Number.",
        action: "NBR Portal",
        link: "https://secure.incometax.gov.bd/"
      },
      {
        title: "VAT Registration",
        desc: "Apply for a Business Identification Number (BIN) via the Customs, Excise, and VAT Commission.",
        action: "VAT Portal",
        link: "https://www.vat.gov.bd/"
      },
      {
        title: "BIDA Registration",
        desc: "Mandatory for industrial enterprises and foreign investors to access various licenses and incentives.",
        action: "BIDA Website",
        link: "https://bida.gov.bd/"
      }
    ],
    ctaButton: "Go to RJSC Portal",
    back: "Back to Directory",
    extraTitle: "Additional Formalities & Licenses",
    extraSteps: [
      { name: "Directors Tax", desc: "Personal TIN registration is required for all foreign directors." },
      { name: "Bank Regularization", desc: "Regularizing bank accounts and setting up online banking portals." },
      { name: "Chamber Membership", desc: "Membership in a Chamber of Commerce (e.g., DCCI, FBCCI) is required for certain permits." },
      { name: "IRC & ERC", desc: "Import and Export Registration Certificates are mandatory for trading businesses." },
      { name: "Industrial Clearances", desc: "Fire Certificate, Factory Registration (DIFE), and Environmental Clearance for industrial projects." }
    ],
    postTitle: "Ongoing Compliance",
    postSteps: [
      { name: "Annual Returns", desc: "Submit annual summary of share capital and list of shareholders to RJSC." },
      { name: "Tax Filings", desc: "Ensure monthly VAT returns and annual income tax filings are completed." },
      { name: "License Renewal", desc: "Trade licenses must be renewed annually before June 30th." },
      { name: "Audit Reports", desc: "Maintain audited financial statements as per the Companies Act 1994." }
    ],
    templatesTitle: "Essential Templates",
    templatesLink: "View Full Library"
  },
  bn: {
    title: "ব্যবসায়িক সেটআপ এবং কোম্পানি নিবন্ধন",
    dept: "যৌথ মূলধন কোম্পানি ও ফার্মসমূহের পরিদপ্তর (RJSC)",
    stats: [
      { label: "আনুমানিক সময়", value: "২০-৩০ দিন", icon: Clock },
      { label: "সরকারি ফি", value: "৳১১,০০০ থেকে শুরু", icon: CreditCard },
      { label: "জটিলতা", value: "উচ্চ", icon: LayoutIcon }
    ],
    prepTitle: "প্রস্তুতিমূলক চেকলিস্ট",
    prepDesc: "নিবন্ধন প্রক্রিয়া শুরু করার আগে এই নথি এবং ফর্মগুলো সংগ্রহ করুন।",
    docs: [
      { label: "প্রস্তাবিত কোম্পানির নাম (ছাড়পত্রের জন্য)", docType: null },
      { label: "সকল পরিচালক ও শেয়ারহোল্ডারদের এনআইডি / পাসপোর্ট", docType: "NID" },
      { label: "সকল পরিচালকের পাসপোর্ট সাইজ ছবি", docType: "PHOTO" },
      { label: "সকল পরিচালকের টিন (TIN) সার্টিফিকেট", docType: "TIN" },
      { label: "নিবন্ধিত অফিসের ঠিকানা ও ভাড়ার চুক্তিপত্র", docType: "LEASE_AGREEMENT" },
      { label: "খসড়া মেমোরেন্ডাম ও আর্টিকেলস অফ অ্যাসোসিয়েশন (MoA/AoA)", docType: "MOA" },
      { label: "এনক্যাশমেন্ট সার্টিফিকেট (বিদেশী শেয়ারহোল্ডারদের জন্য)", docType: null },
      { label: "ফর্ম I: কোম্পানি নিবন্ধনের ঘোষণা", docType: null },
      { label: "ফর্ম VI: নিবন্ধিত অফিসের অবস্থানের নোটিশ", docType: null },
      { label: "ফর্ম IX: পরিচালক হিসেবে কাজ করার সম্মতি", docType: null },
      { label: "ফর্ম X: পরিচালক হতে ইচ্ছুক ব্যক্তিদের তালিকা", docType: null },
      { label: "ফর্ম XII: পরিচালক ও ব্যবস্থাপকদের বিবরণ", docType: null }
    ],
    foundInVault: "ভল্টে পাওয়া গেছে",
    stepsTitle: "ধাপে ধাপে নির্দেশিকা",
    steps: [
      {
        title: "কোম্পানির নাম অনুসন্ধান",
        desc: "আবেদন করার আগে, আপনার প্রস্তাবিত নামটি আগে থেকেই ব্যবহার করা হচ্ছে কিনা তা নিশ্চিত করতে RJSC পোর্টালের 'Search Entity Names' টুলটি ব্যবহার করুন।",
        action: "উপলব্ধতা যাচাই করুন",
        link: "https://app.roc.gov.bd/rjsc-portal/search-entity-name.html"
      },
      {
        title: "নামের ছাড়পত্র (Name Clearance)",
        desc: "RJSC পোর্টালে 'Pre-Registration Activities' থেকে 'Apply for Name Clearance' সিলেক্ট করুন। এটি নিবন্ধনের পূর্বশর্ত এবং ৩০ দিন পর্যন্ত কার্যকর থাকে।",
        action: "অনলাইন আবেদন",
        link: "https://app.roc.gov.bd/"
      },
      {
        title: "স্ট্যাম্প ডিউটি প্রদান",
        desc: "নির্ধারিত ব্যাংকে (যেমন: ব্র্যাক ব্যাংক) স্ট্যাম্প ডিউটি জমা দিন। ফি অনুমোদিত মূলধনের ওপর নির্ভর করে।",
        action: "ফি ক্যালকুলেট করুন",
        link: "/calculators/fee-calculator"
      },
      {
        title: "RJSC-তে নিবন্ধন",
        desc: "'Registration' বিভাগ থেকে 'Apply for Registration' সিলেক্ট করুন। আপনার MoA, AoA এবং প্রয়োজনীয় ফর্মসমূহ (I, VI, IX, X, XII) আপলোড করুন।",
        action: "আবেদন জমা দিন",
        link: "https://app.roc.gov.bd/"
      },
      {
        title: "কোম্পানির সিল তৈরি",
        desc: "নিবন্ধন সম্পন্ন হলে যেকোনো সিল তৈরির দোকান থেকে কোম্পানির দাপ্তরিক সিল তৈরি করে নিন।",
        action: null,
        link: "#"
      },
      {
        title: "ব্যাংক অ্যাকাউন্ট খোলা",
        desc: "কোম্পানির নামে একটি ব্যাংক অ্যাকাউন্ট খুলুন। দ্রষ্টব্য: বিদেশী মালিকানাধীন কোম্পানির ক্ষেত্রে নিবন্ধনের আগে একটি সাময়িক 'মূলধন রেমিট্যান্স' অ্যাকাউন্ট খুলতে হয়।",
        action: null,
        link: "#"
      },
      {
        title: "ট্রেড লাইসেন্স সংগ্রহ",
        desc: "সংশ্লিষ্ট সিটি কর্পোরেশন বা পৌরসভা থেকে ট্রেড লাইসেন্সের জন্য আবেদন করুন।",
        action: "ট্রেড লাইসেন্স গাইড",
        link: "/services/trade-license"
      },
      {
        title: "টিন (TIN) সার্টিফিকেট",
        desc: "কোম্পানির ট্যাক্স আইডেন্টিফিকেশন নম্বর পেতে এনবিআর (NBR)-এ নিবন্ধন করুন।",
        action: "এনবিআর পোর্টাল",
        link: "https://secure.incometax.gov.bd/"
      },
      {
        title: "ভ্যাট (VAT) নিবন্ধন",
        desc: "কাস্টমস, এক্সাইজ ও ভ্যাট কমিশনের মাধ্যমে বিজনেস আইডেন্টিফিকেশন নম্বর (BIN) সংগ্রহ করুন।",
        action: "ভ্যাট পোর্টাল",
        link: "https://www.vat.gov.bd/"
      },
      {
        title: "বিডা (BIDA) নিবন্ধন",
        desc: "শিল্প প্রতিষ্ঠান এবং বিদেশী বিনিয়োগকারীদের জন্য বিভিন্ন লাইসেন্স ও সুবিধা পেতে বিডা-তে নিবন্ধন বাধ্যতামূলক।",
        action: "বিডা ওয়েবসাইট",
        link: "https://bida.gov.bd/"
      }
    ],
    ctaButton: "RJSC পোর্টালে যান",
    back: "ডিরেক্টরিতে ফিরে যান",
    extraTitle: "অতিরিক্ত আনুষ্ঠানিকতা ও লাইসেন্স",
    extraSteps: [
      { name: "পরিচালকদের ট্যাক্স", desc: "সকল বিদেশী পরিচালকদের জন্য ব্যক্তিগত টিন (TIN) নিবন্ধন আবশ্যক।" },
      { name: "ব্যাংক নিয়মিতকরণ", desc: "ব্যাংক অ্যাকাউন্ট নিয়মিতকরণ এবং অনলাইন ব্যাংকিং পোর্টাল সেটআপ করা।" },
      { name: "চেম্বার মেম্বারশিপ", desc: "নির্দিষ্ট পারমিটের জন্য চেম্বার অফ কমার্স (যেমন: DCCI, FBCCI) মেম্বারশিপ প্রয়োজন।" },
      { name: "IRC ও ERC", desc: "ট্রেডিং ব্যবসার জন্য আমদানি ও রপ্তানি নিবন্ধন সনদ (IRC ও ERC) বাধ্যতামূলক।" },
      { name: "শিল্প সংক্রান্ত ছাড়পত্র", desc: "শিল্প প্রকল্পের জন্য ফায়ার সার্টিফিকেট, ফ্যাক্টরি রেজিস্ট্রেশন এবং পরিবেশগত ছাড়পত্র।" }
    ],
    postTitle: "চলমান কমপ্লায়েন্স",
    postSteps: [
      { name: "বার্ষিক রিটার্ন", desc: "শেয়ার মূলধনের সারাংশ এবং শেয়ারহোল্ডারদের তালিকা প্রতি বছর RJSC-তে জমা দিন।" },
      { name: "ট্যাক্স ফাইলিং", desc: "মাসিক ভ্যাট রিটার্ন এবং বার্ষিক আয়কর রিটার্ন জমা নিশ্চিত করুন।" },
      { name: "লাইসেন্স নবায়ন", desc: "ট্রেড লাইসেন্স প্রতি বছর ৩০ জুনের আগে নবায়ন করতে হবে।" },
      { name: "অডিট রিপোর্ট", desc: "কোম্পানি আইন ১৯৯৪ অনুযায়ী অডিট করা আর্থিক বিবরণী সংরক্ষণ করুন।" }
    ],
    templatesTitle: "প্রয়োজনীয় টেমপ্লেট",
    templatesLink: "সম্পূর্ণ লাইব্রেরি দেখুন"
  }
}

export const dynamic = 'force-dynamic'

export default function ServiceDetailPage() {
  const { language } = useLanguage()
  const s = content[language]
  const [checkedDocs, setCheckedDocs] = useState<number[]>([])
  const [vaultDocs, setVaultDocs] = useState<string[]>([])
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const q = query(collection(db, 'documents'), where('user_id', '==', firebaseUser.uid))
        const snapshot = await getDocs(q)
        setVaultDocs(snapshot.docs.map(d => d.data().doc_type as string))
      }
      unsubscribe()
    })
    return unsubscribe
  }, [])

  useEffect(() => {
    const vaultIndices = s.docs
      .map((doc, idx) => (doc.docType && vaultDocs.includes(doc.docType) ? idx : -1))
      .filter(idx => idx !== -1)

    if (vaultIndices.length > 0) {
      setTimeout(() => {
        setCheckedDocs(prev => {
          const hasNew = vaultIndices.some(idx => !prev.includes(idx))
          if (!hasNew) return prev
          return Array.from(new Set([...prev, ...vaultIndices]))
        })
      }, 0)
    }
  }, [vaultDocs, s.docs])

  const toggleDoc = (index: number) => {
    setCheckedDocs(prev =>
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    )
  }

  return (
    <main className="min-h-screen bg-gray-50 pt-16">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Link
          href="/services"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-400 hover:text-gray-900 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform duration-150" />
          {s.back}
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid lg:grid-cols-3 gap-8">

          {/* Main Content */}
          <div className="order-last lg:order-first space-y-6 lg:col-span-2">

            {/* Hero Card */}
            <div className="bg-white rounded-2xl ring-1 ring-black/8 shadow-sm p-6 sm:p-8 space-y-6">
              <div className="space-y-1">
                <p className="text-xs font-medium text-gray-400">{s.dept}</p>
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">{s.title}</h1>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-gray-100">
                {s.stats.map((stat, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gray-50 ring-1 ring-black/8 flex items-center justify-center shrink-0">
                      <stat.icon className="w-4 h-4 text-gray-500" />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-400">{stat.label}</p>
                      <p className="text-sm font-semibold text-gray-900">{stat.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Steps Timeline */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900">{s.stepsTitle}</h2>
              <div className="space-y-0">
                {s.steps.map((step, i) => (
                  <div key={i} className="relative pl-9 pb-5">
                    {i !== s.steps.length - 1 && (
                      <div className="absolute left-[17px] top-8 bottom-0 w-px bg-gray-200" />
                    )}
                    <div className="absolute left-0 top-1.5 w-[34px] h-[34px] rounded-full bg-white ring-1 ring-black/10 flex items-center justify-center z-10 shadow-sm">
                      <span className="text-xs font-semibold text-gray-500">{i + 1}</span>
                    </div>
                    <div className="bg-white rounded-2xl ring-1 ring-black/8 shadow-sm p-5 space-y-3">
                      <h3 className="font-semibold text-gray-900">{step.title}</h3>
                      <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
                      {step.action && step.link !== "#" && (
                        <a
                          href={step.link}
                          target={step.link.startsWith('http') ? '_blank' : undefined}
                          rel={step.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                          className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:gap-1.5 transition-all duration-150"
                        >
                          {step.action}
                          <ArrowRight className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Ongoing Compliance */}
            <div className="bg-white rounded-2xl ring-1 ring-black/8 shadow-sm p-6 sm:p-8 space-y-5">
              <h2 className="text-xl font-semibold text-gray-900">{s.postTitle}</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {s.postSteps.map((step, i) => (
                  <div key={i} className="bg-gray-50 rounded-xl p-4 border-l-2 border-primary space-y-1">
                    <h4 className="font-semibold text-sm text-gray-900">{step.name}</h4>
                    <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Additional Formalities */}
            <div className="bg-white rounded-2xl ring-1 ring-black/8 shadow-sm p-6 sm:p-8 space-y-5">
              <h2 className="text-xl font-semibold text-gray-900">{s.extraTitle}</h2>
              <div className="space-y-3">
                {s.extraSteps.map((step, i) => (
                  <div key={i} className="flex items-start gap-4 p-4 rounded-xl ring-1 ring-black/8 hover:ring-primary/20 transition-all duration-150">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <ShieldCheck className="w-4 h-4 text-primary" />
                    </div>
                    <div className="space-y-0.5">
                      <h4 className="font-semibold text-sm text-gray-900">{step.name}</h4>
                      <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Template Library */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">{s.templatesTitle}</h2>
                <Link
                  href="/resources/templates"
                  className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:gap-1.5 transition-all duration-150"
                >
                  {s.templatesLink}
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
              <div className="bg-white rounded-2xl ring-1 ring-black/8 shadow-sm p-6 sm:p-8">
                <TemplateLibrary items={templates[language]} />
              </div>
            </div>

          </div>

          {/* Sidebar */}
          <div className="order-first lg:order-last space-y-6">
            <div className="bg-white rounded-2xl ring-1 ring-black/8 shadow-sm p-6 space-y-5 lg:sticky lg:top-24">
              <div className="space-y-1.5">
                <h2 className="text-base font-semibold text-gray-900 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-primary" />
                  {s.prepTitle}
                </h2>
                <p className="text-xs text-gray-400 leading-relaxed">{s.prepDesc}</p>
              </div>

              <div className="space-y-2.5">
                {s.docs.map((doc, i) => {
                  const isInVault = doc.docType && vaultDocs.includes(doc.docType)
                  return (
                    <div key={i} className="flex flex-col gap-1">
                      <button
                        onClick={() => toggleDoc(i)}
                        className="flex items-start gap-2.5 w-full text-left group"
                      >
                        <div className="mt-0.5 shrink-0">
                          {checkedDocs.includes(i) ? (
                            <CheckCircle2 className="w-4 h-4 text-green-500" />
                          ) : (
                            <Circle className="w-4 h-4 text-gray-300 group-hover:text-primary transition-colors" />
                          )}
                        </div>
                        <span className={`text-sm leading-snug ${checkedDocs.includes(i) ? 'text-gray-400 line-through' : 'text-gray-700'}`}>
                          {doc.label}
                        </span>
                      </button>
                      {isInVault && (
                        <div className="ml-7 flex items-center gap-1">
                          <ShieldCheck className="w-3 h-3 text-green-500" />
                          <span className="text-[10px] font-semibold text-green-600">{s.foundInVault}</span>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>

              <div className="pt-3 border-t border-gray-100 space-y-2">
                <div className="flex justify-between text-xs font-medium text-gray-500">
                  <span>Progress</span>
                  <span>{checkedDocs.length} / {s.docs.length}</span>
                </div>
                <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all duration-500"
                    style={{ width: `${(checkedDocs.length / s.docs.length) * 100}%` }}
                  />
                </div>
              </div>

              <div className="pt-1 space-y-3">
                <a
                  href="https://app.roc.gov.bd/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-primary hover:bg-primary/90 text-white font-semibold text-sm transition-all shadow-sm"
                >
                  {s.ctaButton}
                </a>
                <Link
                  href="/calculators/fee-calculator"
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl ring-1 ring-black/10 bg-white hover:bg-gray-50 text-gray-700 font-semibold text-sm transition-all"
                >
                  <Calculator className="w-4 h-4 text-primary" />
                  {language === 'en' ? 'Calculate Fees' : 'ফি ক্যালকুলেট করুন'}
                </Link>
                <div className="flex items-center gap-1.5 pt-1">
                  <span className="text-[10px] text-gray-400">Source:</span>
                  <a href="https://app.roc.gov.bd/" target="_blank" rel="noopener noreferrer" className="text-[10px] font-medium text-primary hover:underline">roc.gov.bd</a>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <Footer />
    </main>
  )
}
