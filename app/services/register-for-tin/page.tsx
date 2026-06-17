'use client'

import { useState, useEffect } from 'react'
import { Header } from '@/components/landing/header'
import { Footer } from '@/components/landing/footer'
import { useLanguage } from '@/lib/language-context'
import { CheckCircle2, Circle, Clock, CreditCard, FileText, Layout as LayoutIcon, ArrowLeft, Smartphone, ShieldCheck } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { createClient } from '@/lib/supabase'

const content = {
  en: {
    title: "e-TIN Registration Guide",
    dept: "National Board of Revenue (NBR)",
    stats: [
      { label: "Estimated Time", value: "10-15 Minutes", icon: Clock },
      { label: "Government Fee", value: "Free (৳0)", icon: CreditCard },
      { label: "Complexity", value: "Low", icon: LayoutIcon }
    ],
    prepTitle: "Requirements",
    prepDesc: "Ensure you have these details ready before starting your online application.",
    docs: [
      { label: "Valid NID Number (for Individuals)", docType: "NID" },
      { label: "Passport Number (for Foreigners)", docType: "PASSPORT" },
      { label: "Active Bangladeshi Mobile Number", docType: null },
      { label: "Correct Permanent & Present Address", docType: null },
      { label: "Company Incorporation Number (for Businesses)", docType: null },
      { label: "Partnership Registration Number (for Firms)", docType: null },
      { label: "NID of Managing Director (for Company TIN)", docType: "NID" }
    ],
    foundInVault: "Found in Vault",
    stepsTitle: "Registration Pathway",
    steps: [
      {
        title: "Create e-TIN Account",
        desc: "Visit the NBR e-TIN portal and register with a unique username, password, and security question.",
        action: "Go to Portal",
        link: "https://secure.incometax.gov.bd/Registration"
      },
      {
        title: "User Activation",
        desc: "An OTP will be sent to your mobile. Enter the code to activate your account for the first time.",
        action: "How to activate",
        link: "#"
      },
      {
        title: "Taxpayer Purpose",
        desc: "Select the purpose (e.g., individual, company, firm) and the reason for obtaining a TIN (e.g., getting a trade license).",
        action: "View Categories",
        link: "#"
      },
      {
        title: "Fill Application Form",
        desc: "Enter your personal/business details exactly as they appear on your NID or Incorporation Certificate.",
        action: "Data Requirements",
        link: "#"
      },
      {
        title: "Verify & Submit",
        desc: "The system will verify your NID details with the National Election Commission database instantly.",
        action: "Verification Info",
        link: "#"
      },
      {
        title: "Download Certificate",
        desc: "Once verified, your TIN will be generated. You can download and print the certificate immediately.",
        action: "Sample TIN",
        link: "#"
      }
    ],
    ctaTitle: "Ready to register?",
    ctaDesc: "Most applications are processed instantly. Have your NID and mobile ready.",
    ctaButton: "Start e-TIN Registration",
    back: "Back to Directory",
    extraTitle: "When do you need a TIN?",
    extraSteps: [
      { name: "Trade License", desc: "Mandatory for obtaining or renewing any trade license in Bangladesh." },
      { name: "Bank Account", desc: "Required for opening corporate or high-value personal bank accounts." },
      { name: "Property Transfer", desc: "Necessary for buying or selling land, buildings, or flats." },
      { name: "Credit Cards", desc: "Banks require a TIN to issue credit cards to individuals." },
      { name: "Import/Export", desc: "Essential for obtaining IRC/ERC and performing customs clearance." }
    ],
    postTitle: "Taxpayer Responsibilities",
    postSteps: [
      { name: "Annual Return Filing", desc: "Submit your income tax return annually, usually between July and November." },
      { name: "Record Keeping", desc: "Maintain all financial documents, bank statements, and investment proofs." },
      { name: "Address Updates", desc: "Update your TIN profile if your permanent or business address changes." },
      { name: "Withholding Tax", desc: "If applicable, ensure proper deduction and deposit of tax at source (TDS)." }
    ]
  },
  bn: {
    title: "ই-টিন (e-TIN) নিবন্ধন নির্দেশিকা",
    dept: "জাতীয় রাজস্ব বোর্ড (NBR)",
    stats: [
      { label: "আনুমানিক সময়", value: "১০-১৫ মিনিট", icon: Clock },
      { label: "সরকারি ফি", value: "ফ্রি (৳০)", icon: CreditCard },
      { label: "জটিলতা", value: "সহজ", icon: LayoutIcon }
    ],
    prepTitle: "প্রয়োজনীয় তথ্য ও নথিপত্র",
    prepDesc: "অনলাইন আবেদন শুরু করার আগে এই তথ্যগুলো সাথে রাখুন।",
    docs: [
      { label: "সঠিক এনআইডি (NID) নম্বর (ব্যক্তিগত ক্ষেত্রে)", docType: "NID" },
      { label: "পাসপোর্ট নম্বর (বিদেশীদের ক্ষেত্রে)", docType: "PASSPORT" },
      { label: "সক্রিয় বাংলাদেশী মোবাইল নম্বর", docType: null },
      { label: "সঠিক স্থায়ী ও বর্তমান ঠিকানা", docType: null },
      { label: "কোম্পানি ইনকরপোরেশন নম্বর (ব্যবসার ক্ষেত্রে)", docType: null },
      { label: "পার্টনারশিপ রেজিস্ট্রেশন নম্বর (ফার্মের ক্ষেত্রে)", docType: null },
      { label: "ব্যবস্থাপনা পরিচালকের এনআইডি (কোম্পানি টিনের ক্ষেত্রে)", docType: "NID" }
    ],
    foundInVault: "ভল্টে পাওয়া গেছে",
    stepsTitle: "নিবন্ধন প্রক্রিয়া",
    steps: [
      {
        title: "ই-টিন অ্যাকাউন্ট তৈরি",
        desc: "এনবিআর-এর ই-টিন পোর্টালে যান এবং একটি ইউনিক ইউজারনেম, পাসওয়ার্ড এবং সিকিউরিটি প্রশ্নের মাধ্যমে রেজিস্ট্রেশন করুন।",
        action: "পোর্টালে যান",
        link: "https://secure.incometax.gov.bd/Registration"
      },
      {
        title: "অ্যাকাউন্ট অ্যাক্টিভেশন",
        desc: "আপনার মোবাইলে একটি ওটিপি (OTP) পাঠানো হবে। কোডটি দিয়ে আপনার অ্যাকাউন্টটি অ্যাক্টিভ করুন।",
        action: "অ্যাক্টিভেশন পদ্ধতি",
        link: "#"
      },
      {
        title: "করদাতার ধরণ নির্বাচন",
        desc: "আপনার করদাতার ধরণ (যেমন: ব্যক্তি, কোম্পানি, ফার্ম) এবং টিন গ্রহণের কারণ (যেমন: ট্রেড লাইসেন্স সংগ্রহ) সিলেক্ট করুন।",
        action: "ক্যাটাগরি দেখুন",
        link: "#"
      },
      {
        title: "আবেদন ফর্ম পূরণ",
        desc: "আপনার ব্যক্তিগত বা ব্যবসায়িক তথ্য এনআইডি বা ইনকরপোরেশন সার্টিফিকেট অনুযায়ী সঠিকভাবে ইনপুট দিন।",
        action: "প্রয়োজনীয় তথ্য",
        link: "#"
      },
      {
        title: "যাচাই ও জমা দান",
        desc: "সিস্টেমটি তাৎক্ষণিকভাবে নির্বাচন কমিশনের ডাটাবেস থেকে আপনার এনআইডি তথ্য যাচাই করবে।",
        action: "ভেরিফিকেশন তথ্য",
        link: "#"
      },
      {
        title: "সার্টিফিকেট ডাউনলোড",
        desc: "ভেরিফিকেশন সফল হলে আপনার টিন (TIN) তৈরি হবে। আপনি তাৎক্ষণিকভাবে সার্টিফিকেটটি ডাউনলোড ও প্রিন্ট করতে পারবেন।",
        action: "নমুনা টিন দেখুন",
        link: "#"
      }
    ],
    ctaTitle: "আপনি কি প্রস্তুত?",
    ctaDesc: "অধিকাংশ আবেদন তাৎক্ষণিকভাবে সম্পন্ন হয়। আপনার এনআইডি এবং মোবাইল সাথে রাখুন।",
    ctaButton: "ই-টিন নিবন্ধন শুরু করুন",
    back: "ডিরেক্টরিতে ফিরে যান",
    extraTitle: "কখন আপনার টিন (TIN) প্রয়োজন?",
    extraSteps: [
      { name: "ট্রেড লাইসেন্স", desc: "বাংলাদেশে যেকোনো ট্রেড লাইসেন্স গ্রহণ বা নবায়নের জন্য এটি বাধ্যতামূলক।" },
      { name: "ব্যাংক অ্যাকাউন্ট", desc: "কর্পোরেট বা উচ্চ-মূল্যের ব্যক্তিগত ব্যাংক অ্যাকাউন্ট খোলার জন্য প্রয়োজন।" },
      { name: "সম্পত্তি হস্তান্তর", desc: "জমি, ভবন বা ফ্ল্যাট কেনা বা বিক্রির জন্য এটি আবশ্যক।" },
      { name: "ক্রেডিট কার্ড", desc: "ব্যক্তিগত ক্রেডিট কার্ড ইস্যু করার জন্য ব্যাংকগুলো টিন (TIN) চেয়ে থাকে।" },
      { name: "আমদানি/রপ্তানি", desc: "IRC/ERC গ্রহণ এবং কাস্টমস ক্লিয়ারেন্সের জন্য এটি অপরিহার্য।" }
    ],
    postTitle: "করদাতার দায়িত্বসমূহ",
    postSteps: [
      { name: "বার্ষিক রিটার্ন দাখিল", desc: "প্রতি বছর (সাধারণত জুলাই-নভেম্বর) আপনার আয়কর রিটার্ন জমা দিন।" },
      { name: "রেকর্ড সংরক্ষণ", desc: "আপনার সকল আর্থিক দলিল, ব্যাংক স্টেটমেন্ট এবং বিনিয়োগের প্রমাণ সংরক্ষণ করুন।" },
      { name: "ঠিকানা হালনাগাদ", desc: "স্থায়ী বা ব্যবসায়িক ঠিকানা পরিবর্তন হলে আপনার টিন প্রোফাইল আপডেট করুন।" },
      { name: "উৎস কর (TDS)", desc: "প্রযোজ্য ক্ষেত্রে, সঠিকভাবে উৎস কর কর্তন এবং জমা নিশ্চিত করুন।" }
    ]
  }
}

export const dynamic = 'force-dynamic'

export default function TINRegistrationPage() {
  const { language } = useLanguage()
  const s = content[language]
  const [checkedDocs, setCheckedDocs] = useState<number[]>([])
  const [vaultDocs, setVaultDocs] = useState<string[]>([])
  const supabase = createClient()

  useEffect(() => {
    const fetchVault = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (session) {
        const { data } = await supabase
          .from('documents')
          .select('doc_type')
        if (data) {
          setVaultDocs(data.map(d => d.doc_type))
        }
      }
    }
    fetchVault()
  }, [supabase])

  // Auto-check docs found in vault
  useEffect(() => {
    const vaultIndices = s.docs
      .map((doc, idx) => (doc.docType && vaultDocs.includes(doc.docType) ? idx : -1))
      .filter(idx => idx !== -1)

    if (vaultIndices.length > 0) {
      setTimeout(() => {
        setCheckedDocs(prev => {
          const hasNew = vaultIndices.some(idx => !prev.includes(idx))
          if (!hasNew) return prev
          const combined = Array.from(new Set([...prev, ...vaultIndices]))
          return combined
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
    <main className="min-h-screen bg-[#f3f2f1] pt-16">
      <Header />
      
      {/* Breadcrumbs & Back */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Link href="/" className="flex items-center gap-2 text-sm font-bold text-[#ff0000] hover:underline">
          <ArrowLeft className="w-4 h-4" />
          {s.back}
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid lg:grid-cols-3 gap-8">

          {/* Main Content */}
          <div className="order-last lg:order-first space-y-8 lg:col-span-2">
            {/* Hero Card */}
            <div className="bg-white border-2 border-black p-8 space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-widest text-[#ff0000]">{s.dept}</span>
                <h1 className="text-3xl sm:text-4xl font-black text-black leading-tight">
                  {s.title}
                </h1>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t-2 border-gray-100">
                {s.stats.map((stat, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="p-2 bg-gray-50 border border-black">
                      <stat.icon className="w-5 h-5 text-black" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase text-gray-500">{stat.label}</p>
                      <p className="text-sm font-bold text-black">{stat.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Steps Timeline */}
            <div className="space-y-6">
              <h2 className="text-2xl font-black text-black">{s.stepsTitle}</h2>
              <div className="space-y-0">
                {s.steps.map((step, i) => (
                  <div key={i} className="relative pl-8 pb-10 group">
                    {/* Vertical Line */}
                    {i !== s.steps.length - 1 && (
                      <div className="absolute left-[11px] top-6 bottom-0 w-1 bg-black" />
                    )}
                    {/* Dot */}
                    <div className="absolute left-0 top-1 w-6 h-6 bg-white border-4 border-black rounded-full z-10 group-hover:bg-[#ff0000] transition-colors" />
                    
                    <div className="bg-white border-2 border-black p-6 space-y-4 transition-all">
                      <h3 className="text-xl font-bold flex items-center gap-3">
                        <span className="bg-black text-white px-2 py-0.5 text-xs">{i + 1}</span>
                        {step.title}
                      </h3>
                      <p className="text-gray-700 leading-relaxed">
                        {step.desc}
                      </p>
                      {step.link !== "#" && (
                        <a 
                          href={step.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-sm font-bold text-[#ff0000] hover:underline"
                        >
                          {step.action} &rarr;
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Taxpayer Responsibilities */}
            <div className="bg-white border-2 border-black p-8 space-y-6">
              <h2 className="text-2xl font-black text-black">{s.postTitle}</h2>
              <div className="grid sm:grid-cols-2 gap-6">
                {s.postSteps.map((step, i) => (
                  <div key={i} className="p-4 bg-gray-50 border-l-4 border-[#ff0000] space-y-1">
                    <h4 className="font-bold text-black">{step.name}</h4>
                    <p className="text-sm text-gray-600 leading-relaxed">{step.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Extra Info */}
            <div className="bg-white border-2 border-black p-8 space-y-6">
              <h2 className="text-2xl font-black text-black">{s.extraTitle}</h2>
              <div className="space-y-4">
                {s.extraSteps.map((step, i) => (
                  <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border-2 border-gray-100 hover:border-black transition-colors gap-4">
                    <div className="flex items-center gap-4">
                      <div className="hidden sm:block">
                        <ShieldCheck className="w-6 h-6 text-gray-300" />
                      </div>
                      <div>
                        <h4 className="font-black text-black">{step.name}</h4>
                        <p className="text-sm text-gray-600">{step.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="order-first lg:order-last space-y-8">
            {/* Checklist Card */}
            <div className="bg-white border-2 border-black p-6 space-y-6 lg:sticky lg:top-24">
              <div className="space-y-2">
                <h2 className="text-xl font-black flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  {s.prepTitle}
                </h2>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {s.prepDesc}
                </p>
              </div>

              <div className="space-y-3">
                {s.docs.map((doc, i) => {
                  const isInVault = doc.docType && vaultDocs.includes(doc.docType)
                  return (
                    <div key={i} className="flex flex-col gap-1">
                      <button 
                        key={i} 
                        onClick={() => toggleDoc(i)}
                        className="flex items-start gap-3 w-full text-left group"
                      >
                        <div className="mt-0.5 shrink-0">
                          {checkedDocs.includes(i) ? (
                            <CheckCircle2 className="w-5 h-5 text-green-600" />
                          ) : (
                            <Circle className="w-5 h-5 text-gray-300 group-hover:text-black" />
                          )}
                        </div>
                        <span className={`text-sm font-medium ${checkedDocs.includes(i) ? 'text-gray-400 line-through' : 'text-black'}`}>
                          {doc.label}
                        </span>
                      </button>
                      {isInVault && (
                        <div className="ml-8 flex items-center gap-1.5">
                          <ShieldCheck className="w-3 h-3 text-green-600" />
                          <span className="text-[10px] font-black uppercase text-green-600">
                            {s.foundInVault}
                          </span>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>

              <div className="pt-4 border-t border-gray-100">
                <div className="bg-gray-50 p-4 border border-dashed border-gray-300">
                  <p className="text-xs font-bold text-gray-500 uppercase mb-1">Status</p>
                  <p className="text-sm font-bold text-black">
                    {checkedDocs.length} of {s.docs.length} requirements met
                  </p>
                  <div className="w-full h-2 bg-gray-200 mt-2">
                    <div 
                      className="h-full bg-[#ff0000] transition-all duration-500" 
                      style={{ width: `${(checkedDocs.length / s.docs.length) * 100}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* CTA Section */}
              <div className="pt-2 space-y-4">
                <a 
                  href="https://secure.incometax.gov.bd/Registration" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Button className="w-full bg-[#ff0000] hover:bg-[#cc0000] text-white font-black h-12 rounded-none border-b-4 border-black active:border-b-0 active:translate-y-1 transition-all">
                    {s.ctaButton}
                  </Button>
                </a>
                <div className="p-4 bg-yellow-50 border-2 border-black space-y-2">
                  <div className="flex items-center gap-2">
                    <Smartphone className="w-4 h-4 text-black" />
                    <span className="text-xs font-black uppercase">Mobile OTP Required</span>
                  </div>
                  <p className="text-[10px] text-gray-600 font-bold leading-tight">
                    You must have access to the mobile number registered with your NID to receive the activation code.
                  </p>
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
