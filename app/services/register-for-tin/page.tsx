'use client'

import { useState, useEffect } from 'react'
import { Header } from '@/components/landing/header'
import { Footer } from '@/components/landing/footer'
import { useLanguage } from '@/lib/language-context'
import { CheckCircle2, Circle, Clock, CreditCard, FileText, Layout as LayoutIcon, ArrowLeft, ArrowRight, Smartphone, ShieldCheck, ChevronDown } from 'lucide-react'
import Link from 'next/link'
import { auth, db } from '@/lib/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { collection, query, where, getDocs } from 'firebase/firestore'

const content = {
  en: {
    title: "e-TIN Registration Guide",
    subtitleBefore: "Register your 12-digit Bangladesh e-TIN online for free through the official ",
    subtitleLink: "NBR portal",
    subtitleAfter: ". Verify your identity, submit your application, and download your e-TIN certificate instantly.",
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
        action: "Trade License Guide",
        link: "/services/trade-license"
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
    whyTitle: "Why do you need a TIN?",
    extraTitle: "When do you need a TIN?",
    extraSteps: [
      { name: "Trade License", desc: "Mandatory for obtaining or renewing any trade license in Bangladesh.", link: "/services/trade-license" },
      { name: "Bank Account", desc: "Required for opening corporate or high-value personal bank accounts." },
      { name: "Property Transfer", desc: "Necessary for buying or selling land, buildings, or flats.", link: "/services/land-mutation" },
      { name: "Credit Cards", desc: "Banks require a TIN to issue credit cards to individuals." },
      { name: "Import/Export", desc: "Essential for obtaining IRC/ERC and performing customs clearance.", link: "/services/incorporate-a-private-company" }
    ],
    postTitle: "Taxpayer Responsibilities",
    postSteps: [
      { name: "Annual Return Filing", desc: "Submit your income tax return annually, usually between July and November." },
      { name: "Record Keeping", desc: "Maintain all financial documents, bank statements, and investment proofs." },
      { name: "Address Updates", desc: "Update your TIN profile if your permanent or business address changes." },
      { name: "Withholding Tax", desc: "If applicable, ensure proper deduction and deposit of tax at source (TDS)." }
    ],
    faqTitle: "Frequently Asked Questions",
    faqs: [
      {
        q: "How to register e-TIN Bangladesh?",
        a: "Visit secure.incometax.gov.bd, create an account using your NID number and active mobile, select your taxpayer type, fill in your personal or business details, and download your TIN certificate immediately after automatic NID verification."
      },
      {
        q: "How to register for TIN online?",
        a: "Go to the NBR e-TIN portal at secure.incometax.gov.bd and register with a unique username and password. Verify your identity via a mobile OTP, then select your taxpayer category, enter your information, and your TIN certificate is issued instantly — no physical form or office visit required."
      },
      {
        q: "What is my e-TIN number?",
        a: "Your e-TIN is a 12-digit Tax Identification Number assigned by the National Board of Revenue (NBR) to identify you as a registered taxpayer in Bangladesh. It is printed on your TIN certificate, which you can download or reprint at any time by logging into the NBR e-TIN portal."
      },
      {
        q: "How to verify TIN number?",
        a: "TIN certificates can be verified online through the NBR portal. Visit secure.incometax.gov.bd, navigate to the certificate verification section, and enter the TIN number along with the certificate issue date. The system will display the registered taxpayer's information to confirm authenticity."
      }
    ]
  },
  bn: {
    title: "ই-টিন (e-TIN) নিবন্ধন নির্দেশিকা",
    subtitleBefore: "বাংলাদেশের ১২ সংখ্যার ই-টিন সম্পূর্ণ বিনামূল্যে অনলাইনে নিবন্ধন করুন — সরকারি ",
    subtitleLink: "এনবিআর পোর্টালের",
    subtitleAfter: " মাধ্যমে। পরিচয় যাচাই করুন, আবেদন জমা দিন এবং সাথে সাথে ই-টিন সার্টিফিকেট ডাউনলোড করুন।",
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
        action: "ট্রেড লাইসেন্স গাইড",
        link: "/services/trade-license"
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
    whyTitle: "কেন টিন (TIN) প্রয়োজন?",
    extraTitle: "কখন আপনার টিন (TIN) প্রয়োজন?",
    extraSteps: [
      { name: "ট্রেড লাইসেন্স", desc: "বাংলাদেশে যেকোনো ট্রেড লাইসেন্স গ্রহণ বা নবায়নের জন্য এটি বাধ্যতামূলক।", link: "/services/trade-license" },
      { name: "ব্যাংক অ্যাকাউন্ট", desc: "কর্পোরেট বা উচ্চ-মূল্যের ব্যক্তিগত ব্যাংক অ্যাকাউন্ট খোলার জন্য প্রয়োজন।" },
      { name: "সম্পত্তি হস্তান্তর", desc: "জমি, ভবন বা ফ্ল্যাট কেনা বা বিক্রির জন্য এটি আবশ্যক।", link: "/services/land-mutation" },
      { name: "ক্রেডিট কার্ড", desc: "ব্যক্তিগত ক্রেডিট কার্ড ইস্যু করার জন্য ব্যাংকগুলো টিন (TIN) চেয়ে থাকে।" },
      { name: "আমদানি/রপ্তানি", desc: "IRC/ERC গ্রহণ এবং কাস্টমস ক্লিয়ারেন্সের জন্য এটি অপরিহার্য।", link: "/services/incorporate-a-private-company" }
    ],
    postTitle: "করদাতার দায়িত্বসমূহ",
    postSteps: [
      { name: "বার্ষিক রিটার্ন দাখিল", desc: "প্রতি বছর (সাধারণত জুলাই-নভেম্বর) আপনার আয়কর রিটার্ন জমা দিন।" },
      { name: "রেকর্ড সংরক্ষণ", desc: "আপনার সকল আর্থিক দলিল, ব্যাংক স্টেটমেন্ট এবং বিনিয়োগের প্রমাণ সংরক্ষণ করুন।" },
      { name: "ঠিকানা হালনাগাদ", desc: "স্থায়ী বা ব্যবসায়িক ঠিকানা পরিবর্তন হলে আপনার টিন প্রোফাইল আপডেট করুন।" },
      { name: "উৎস কর (TDS)", desc: "প্রযোজ্য ক্ষেত্রে, সঠিকভাবে উৎস কর কর্তন এবং জমা নিশ্চিত করুন।" }
    ],
    faqTitle: "সাধারণ জিজ্ঞাসা",
    faqs: [
      {
        q: "বাংলাদেশে ই-টিন নিবন্ধন কীভাবে করবো?",
        a: "secure.incometax.gov.bd-তে যান, আপনার এনআইডি নম্বর ও মোবাইল দিয়ে অ্যাকাউন্ট তৈরি করুন, করদাতার ধরন নির্বাচন করুন, তথ্য পূরণ করুন এবং স্বয়ংক্রিয় এনআইডি যাচাইয়ের পরপরই সার্টিফিকেট ডাউনলোড করুন।"
      },
      {
        q: "অনলাইনে টিন রেজিস্ট্রেশন কীভাবে করবো?",
        a: "এনবিআর ই-টিন পোর্টালে (secure.incometax.gov.bd) গিয়ে ইউজারনেম ও পাসওয়ার্ড দিয়ে নিবন্ধন করুন। মোবাইল ওটিপি দিয়ে যাচাই করুন, করদাতার বিভাগ বেছে নিন, তথ্য দিন — কোনো ফি বা অফিস ভিজিট ছাড়াই সাথে সাথে সার্টিফিকেট পাবেন।"
      },
      {
        q: "আমার ই-টিন নম্বর কী?",
        a: "ই-টিন হলো জাতীয় রাজস্ব বোর্ড (NBR) প্রদত্ত একটি ১২ সংখ্যার করদাতা শনাক্তকরণ নম্বর। এটি আপনার টিন সার্টিফিকেটে লেখা থাকে, যা যেকোনো সময় এনবিআর পোর্টালে লগইন করে ডাউনলোড করা যায়।"
      },
      {
        q: "টিন নম্বর যাচাই কীভাবে করবো?",
        a: "এনবিআর পোর্টালের মাধ্যমে অনলাইনে টিন সার্টিফিকেট যাচাই করা যায়। secure.incometax.gov.bd-তে গিয়ে সার্টিফিকেট ভেরিফিকেশন অপশনে টিন নম্বর ও সার্টিফিকেট ইস্যুর তারিখ দিলে নিবন্ধিত করদাতার তথ্য প্রদর্শিত হবে।"
      }
    ]
  }
}


export default function TINRegistrationPage() {
  const { language } = useLanguage()
  const s = content[language]
  const [checkedDocs, setCheckedDocs] = useState<number[]>([])
  const [vaultDocs, setVaultDocs] = useState<string[]>([])
  const [openFaq, setOpenFaq] = useState<number | null>(null)
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
    <main className="min-h-screen bg-gray-50 pt-16">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Link href="/" className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-400 hover:text-gray-900 transition-colors group">
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
              <div className="space-y-2">
                <p className="text-xs font-medium text-gray-400">{s.dept}</p>
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">{s.title}</h1>
                <p className="text-sm text-gray-500 leading-relaxed pt-1">
                  {s.subtitleBefore}
                  <a href="https://secure.incometax.gov.bd" target="_blank" rel="noopener noreferrer" className="text-primary font-medium hover:underline">{s.subtitleLink}</a>
                  {s.subtitleAfter}
                </p>
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
                      {step.link !== "#" && (
                        step.link.startsWith('/') ? (
                          <Link
                            href={step.link}
                            className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:gap-1.5 transition-all duration-150"
                          >
                            {step.action}
                            <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                        ) : (
                          <a
                            href={step.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:gap-1.5 transition-all duration-150"
                          >
                            {step.action}
                            <ArrowRight className="w-3.5 h-3.5" />
                          </a>
                        )
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Taxpayer Responsibilities */}
            <div className="bg-white rounded-2xl ring-1 ring-black/8 shadow-sm p-6 sm:p-8 space-y-5">
              <h2 className="text-xl font-semibold text-gray-900">{s.postTitle}</h2>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                {s.postSteps.map((step, i) => (
                  <div key={i} className="group bg-white rounded-xl ring-1 ring-black/8 p-4 space-y-2 hover:shadow-lg hover:ring-primary/30 hover:-translate-y-1 transition-all duration-200 cursor-default">
                    <h4 className="font-semibold text-xs text-gray-900 leading-snug">{step.name}</h4>
                    <p className="text-[11px] text-gray-400 leading-relaxed">{step.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQ */}
            <div className="bg-white rounded-2xl ring-1 ring-black/8 shadow-sm p-6 sm:p-8 space-y-5">
              <h2 className="text-xl font-semibold text-gray-900">{s.faqTitle}</h2>
              <div className="divide-y divide-gray-100">
                {s.faqs.map((faq, i) => (
                  <div key={i}>
                    <button
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="w-full flex items-center justify-between gap-4 py-4 text-left group"
                    >
                      <h3 className="font-semibold text-sm text-gray-900 group-hover:text-primary transition-colors duration-150">{faq.q}</h3>
                      <ChevronDown className={`w-4 h-4 text-gray-400 shrink-0 transition-transform duration-200 ${openFaq === i ? 'rotate-180 text-primary' : ''}`} />
                    </button>
                    {openFaq === i && (
                      <p className="text-sm text-gray-500 leading-relaxed pb-4">{faq.a}</p>
                    )}
                  </div>
                ))}
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
                  href="https://secure.incometax.gov.bd/Registration"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <button className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-primary hover:bg-primary/90 text-white font-semibold text-sm transition-all shadow-sm">
                    {s.ctaButton}
                  </button>
                </a>
                <div className="p-4 bg-amber-50 rounded-xl ring-1 ring-amber-200 space-y-1.5">
                  <div className="flex items-center gap-2">
                    <Smartphone className="w-4 h-4 text-amber-600 shrink-0" />
                    <span className="text-xs font-semibold text-amber-700">Mobile OTP Required</span>
                  </div>
                  <p className="text-xs text-amber-600 leading-relaxed">
                    You must have access to the mobile number registered with your NID to receive the activation code.
                  </p>
                </div>
                <div className="flex items-center gap-1.5 pt-1">
                  <span className="text-[10px] text-gray-400">Source:</span>
                  <a href="https://secure.incometax.gov.bd/" target="_blank" rel="noopener noreferrer" className="text-[10px] font-medium text-primary hover:underline">incometax.gov.bd</a>
                </div>
              </div>
            </div>

            {/* Why do you need a TIN */}
            <div className="bg-white rounded-2xl ring-1 ring-black/8 shadow-sm p-6 space-y-4">
              <h2 className="text-base font-semibold text-gray-900">{s.whyTitle}</h2>
              <div className="space-y-2.5">
                {s.extraSteps.map((step, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                    <div>
                      {step.link ? (
                        <Link href={step.link} className="text-sm font-semibold text-primary hover:underline">{step.name}</Link>
                      ) : (
                        <span className="text-sm font-semibold text-gray-800">{step.name}</span>
                      )}
                      <span className="text-sm text-gray-500"> — {step.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>

      <Footer />
    </main>
  )
}
