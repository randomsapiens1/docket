'use client'

import { useState, useEffect } from 'react'
import { Header } from '@/components/landing/header'
import { Footer } from '@/components/landing/footer'
import { useLanguage } from '@/lib/language-context'
import { 
  Clock, 
  CreditCard, 
  Layout as LayoutIcon, 
  ArrowLeft, 
  CheckCircle2, 
  Circle, 
  ShieldCheck, 
  AlertCircle, 
  Trash2, 
  Plus, 
  Save, 
  Award, 
  Sparkles, 
  Globe, 
  GraduationCap, 
  Calendar, 
  User
} from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { createClient } from '@/lib/supabase'

interface ProfileData {
  name: string
  targetDegree: string
  targetCountry: string
  gpa: string
  englishTest: string
  englishScore: string
  funds: string
}

interface CustomTask {
  id: string
  title: string
  deadline: string
  completed: boolean
}

// Destination Visa Guide Interface
interface VisaGuide {
  visaType: string
  fee: string
  processingTime: string
  requiredFunds: string
  requirements: { text: string; docType: string | null }[]
  steps: { title: string; desc: string }[]
  postArrival: string[]
}

// Scholarship Interface
interface Scholarship {
  name: string
  provider: string
  gpaReq: number
  ieltsReq: number
  benefits: string
  deadline: string
}

const countryVisaGuides: Record<'en' | 'bn', Record<string, VisaGuide>> = {
  en: {
    "USA": {
      visaType: "F-1 Student Visa",
      fee: "$185 USD + $350 SEVIS I-901 Fee",
      processingTime: "3-5 Weeks",
      requiredFunds: "Tuition + approx. $20,000 USD/year living expenses (Form I-20 amount)",
      requirements: [
        { text: "Valid Passport (must be valid 6 months beyond stay)", docType: "PASSPORT" },
        { text: "Form I-20 (Certificate of Eligibility from US School)", docType: null },
        { text: "SEVIS I-901 Fee Payment Receipt", docType: null },
        { text: "DS-160 Nonimmigrant Visa Application confirmation page", docType: null },
        { text: "Visa Interview Appointment Confirmation Letter", docType: null },
        { text: "Recent Passport-size Photograph (meeting US visa requirements)", docType: "PHOTO" },
        { text: "Financial Solvency proof (bank statements, tax returns of sponsor)", docType: "TIN" },
        { text: "Academic Documents (transcripts, certificates, test scores like IELTS/TOEFL)", docType: null }
      ],
      steps: [
        { title: "Receive I-20 Form", desc: "Gain admission to a SEVP-approved school and receive your official Form I-20." },
        { title: "Pay SEVIS Fee", desc: "Pay the SEVIS I-901 fee online ($350) and keep the printed receipt." },
        { title: "Complete DS-160", desc: "Fill out the online DS-160 application form and print the barcode confirmation page." },
        { title: "Schedule Interview", desc: "Create an account on the visa appointment portal, pay the $185 visa fee, and book your slots." },
        { title: "Attend Visa Interview", desc: "Bring all required documents to the US Embassy in Dhaka and answer interview questions honestly." }
      ],
      postArrival: [
        "Report to your Designated School Official (DSO) within 30 days of program start.",
        "Maintain full-time student status (minimum 12 credits for undergraduates).",
        "Work is restricted to on-campus (up to 20 hours/week during sessions)."
      ]
    },
    "UK": {
      visaType: "Student Visa (formerly Tier 4)",
      fee: "£490 GBP + Immigration Health Surcharge (£776/year)",
      processingTime: "3 Weeks",
      requiredFunds: "Tuition fee + £1,334/month (inside London) or £1,023/month (outside London) for 9 months",
      requirements: [
        { text: "Valid Passport", docType: "PASSPORT" },
        { text: "Confirmation of Acceptance for Studies (CAS) from licensed sponsor", docType: null },
        { text: "Tuberculosis (TB) test certificate from approved clinic", docType: null },
        { text: "Financial Solvency proof (funds must be held for 28 consecutive days)", docType: "TIN" },
        { text: "IELTS for UKVI Certificate (or university English waiver letter)", docType: null },
        { text: "ATAS Certificate (if required for technical/science courses)", docType: null }
      ],
      steps: [
        { title: "Secure CAS Number", desc: "Accept your offer, pay university deposit, and receive your CAS statement." },
        { title: "Prepare Financials", desc: "Ensure required funds are held in a personal/sponsor bank account for at least 28 days." },
        { title: "TB Screening", desc: "Get screened for TB at the IOM clinic in Dhaka and obtain your certificate." },
        { title: "Apply Online", desc: "Submit the visa application online, pay fees, and purchase NHS healthcare surcharge." },
        { title: "Biometric Appointment", desc: "Book and attend an appointment at the VFS Global center in Dhaka for biometrics." }
      ],
      postArrival: [
        "Collect your Biometric Residence Permit (BRP) within 10 days of arriving in the UK.",
        "Register with local police if stated on your visa/vignette.",
        "Work is limited to 20 hours per week during term time (degree level)."
      ]
    },
    "Canada": {
      visaType: "Study Permit",
      fee: "$150 CAD + Biometrics Fee ($85 CAD)",
      processingTime: "6-8 Weeks",
      requiredFunds: "Tuition + $20,635 CAD/year living expenses (or GIC certificate from a Canadian bank)",
      requirements: [
        { text: "Valid Passport", docType: "PASSPORT" },
        { text: "Letter of Acceptance (LOA) from Designated Learning Institution (DLI)", docType: null },
        { text: "Guaranteed Investment Certificate (GIC) of $20,635 CAD", docType: null },
        { text: "Proof of tuition fee payment for the first academic year", docType: null },
        { text: "Upfront Medical Exam Certificate from approved panel physician", docType: null },
        { text: "Police Clearance Certificate from Bangladesh Police", docType: null },
        { text: "Study Plan (SOP) explaining purpose of travel and return plans", docType: null }
      ],
      steps: [
        { title: "Obtain LOA", desc: "Apply and get admitted to a DLI-listed Canadian college or university." },
        { title: "Purchase GIC & Medicals", desc: "Open a student GIC account in Canada, deposit living expenses, and undergo medical checkup." },
        { title: "Police Clearance", desc: "Obtain a certified police clearance certificate showing no criminal record." },
        { title: "Submit SDS/Regular Visa", desc: "File your application online via the IRCC portal. Submit biometric details at VFS Dhaka." },
        { title: "Passport Submission", desc: "Upon approval, submit your passport to VFS to get the visa counterfoil." }
      ],
      postArrival: [
        "Verify your Study Permit printout at the Canadian port of entry (border control).",
        "Obtain a Social Insurance Number (SIN) to work part-time (up to 20 hours/week off-campus).",
        "Ensure you remain enrolled and make progress in your study program."
      ]
    },
    "Germany": {
      visaType: "National Visa (Subclass D - Study)",
      fee: "€75 EUR (approx. ৳9,500 BDT)",
      processingTime: "4-12 Weeks",
      requiredFunds: "Blocked Account (Sperrkonto) with €11,908 EUR",
      requirements: [
        { text: "Valid Passport", docType: "PASSPORT" },
        { text: "Admission Letter (Zulassungsbescheid) from a German University", docType: null },
        { text: "Blocked Account confirmation (€11,908 EUR for 1 year)", docType: null },
        { text: "Travel Health Insurance valid for Germany before enrollment", docType: null },
        { text: "Academic certificates, transcripts, and proof of language (German/English)", docType: null },
        { text: "Declaration of Accuracy of Information", docType: null }
      ],
      steps: [
        { title: "University Admission", desc: "Get an unconditional or conditional admission letter from a German public/private institution." },
        { title: "Open Blocked Account", desc: "Set up a blocked account online (e.g. Fintiba, Expatrio) and deposit €11,908 EUR." },
        { title: "Book Embassy Appointment", desc: "Book an appointment at the German Embassy in Dhaka. (Note: Waitlists can be long)." },
        { title: "Submit Application", desc: "Attend appointment, submit printed application forms, block account proof, and passport." },
        { title: "Receive Visa", desc: "Embassy issues a D-visa. Travel to Germany and convert it into a Residence Permit." }
      ],
      postArrival: [
        "Find accommodation and register your address (Anmeldung) at the local City Hall (Bürgeramt).",
        "Take out German statutory health insurance (Krankenkasse).",
        "Apply for a residence permit (Aufenthaltstitel) at the Foreigners Authority (Ausländerbehörde)."
      ]
    },
    "Australia": {
      visaType: "Student Visa (Subclass 500)",
      fee: "$1,600 AUD (approx. ৳125,000 BDT)",
      processingTime: "4-6 Weeks",
      requiredFunds: "Tuition fees + $29,710 AUD/year living expenses + travel costs",
      requirements: [
        { text: "Valid Passport", docType: "PASSPORT" },
        { text: "Confirmation of Enrolment (CoE) from Australian education provider", docType: null },
        { text: "Overseas Student Health Cover (OSHC) for entire duration of visa", docType: null },
        { text: "Genuine Student (GS) requirement statement and proof", docType: null },
        { text: "English Proficiency test certificate (IELTS/PTE Academic)", docType: null },
        { text: "Financial solvency proofs (Bank balance held for 3+ months, or annual income declaration)", docType: "TIN" },
        { text: "Medical Health Check confirmation from Bupa/panel clinic", docType: null }
      ],
      steps: [
        { title: "Obtain CoE", desc: "Accept your offer, pay the first semester tuition fee & OSHC premium, and receive your CoE." },
        { title: "Prepare Financials", desc: "Secure funding proof (bank statements, education loan) matching Australian guidelines." },
        { title: "Draft GS Statement", desc: "Prepare a comprehensive Genuine Student statement describing goals, ties, and study choice." },
        { title: "Submit Visa Online", desc: "Apply via ImmiAccount online portal, attach documents, and pay the visa fee." },
        { title: "Biometrics & Medical", desc: "Attend biometrics at VFS Dhaka and complete the medical exam at the designated clinic." }
      ],
      postArrival: [
        "Notify your provider of your residential address within 7 days of arrival.",
        "Maintain satisfactory course attendance and academic progress.",
        "Part-time work permitted up to 48 hours per fortnight during studies."
      ]
    },
    "Japan": {
      visaType: "Student Visa (College Student status)",
      fee: "3,000 JPY (approx. ৳2,400 BDT)",
      processingTime: "4-8 Weeks",
      requiredFunds: "Tuition + approx. 1,500,000 to 2,000,000 JPY/year (Sponsor bank solvency)",
      requirements: [
        { text: "Valid Passport", docType: "PASSPORT" },
        { text: "Certificate of Eligibility (COE) issued by Japanese Immigration", docType: null },
        { text: "Visa Application Form with photo attached", docType: null },
        { text: "Academic Transcripts & Graduation Certificates", docType: null },
        { text: "Sponsor's Bank Solvency Certificate & Employment/Tax Documents", docType: "TIN" },
        { text: "Japanese language test certificate (NAT-TEST/JLPT) or English proof", docType: null }
      ],
      steps: [
        { title: "Obtain COE", desc: "Your Japanese school submits your documents to Japanese Immigration to obtain your COE." },
        { title: "Receive COE", desc: "The school sends you the original COE physical copy once approved." },
        { title: "Submit Visa Application", desc: "Submit the visa form, original COE, photo, and passport to the Japanese Embassy in Dhaka." },
        { title: "Embassy Interview", desc: "Attend a basic Japanese or English language interview at the Embassy if requested." },
        { title: "Receive Stamp", desc: "Collect your stamped passport containing the college student entry visa." }
      ],
      postArrival: [
        "Receive your Residence Card (Zairyu Card) at the airport customs counter.",
        "Register your address at the local Ward Office (Kuyakusho) within 14 days.",
        "Apply for permission to work part-time (Shikakugai-katsudo-kyoka) to work up to 28 hours/week."
      ]
    }
  },
  bn: {
    "USA": {
      visaType: "এফ-১ স্টুডেন্ট ভিসা (F-1 Student Visa)",
      fee: "$১৮৫ ইউএসডি + $৩৫০ সেভিস (SEVIS) ফি",
      processingTime: "৩-৫ সপ্তাহ",
      requiredFunds: "টিউশন ফি + আনুমানিক $২০,০০০ ইউএসডি/বছর লিভিং কস্ট (I-20 ফর্ম অনুযায়ী)",
      requirements: [
        { text: "বৈধ পাসপোর্ট (ন্যূনতম ৬ মাসের মেয়াদ থাকতে হবে)", docType: "PASSPORT" },
        { text: "আই-২০ (I-20) ফর্ম (যুক্তরাষ্ট্রের শিক্ষাপ্রতিষ্ঠান কর্তৃক ইস্যুকৃত)", docType: null },
        { text: "সেভিস (SEVIS) ফি পরিশোধের রসিদ", docType: null },
        { text: "ডিএস-১৬০ (DS-160) অনলাইন ফর্মের কনফার্মেশন পেজ", docType: null },
        { text: "ভিসা ইন্টারভিউ অ্যাপয়েন্টমেন্ট কনফার্মেশন লেটার", docType: null },
        { text: "পাসপোর্ট সাইজের ছবি (যুক্তরাষ্ট্রের ভিসা মানদণ্ড অনুযায়ী)", docType: "PHOTO" },
        { text: "আর্থিক সচ্ছলতার প্রমাণ (স্পন্সরের ব্যাংক স্টেটমেন্ট এবং কর রিটার্ন)", docType: "TIN" },
        { text: "শিক্ষাগত যোগ্যতার সনদ, ট্রান্সক্রিপ্ট এবং ইংরেজি টেস্ট স্কোর (IELTS/TOEFL)", docType: null }
      ],
      steps: [
        { title: "আই-২০ (I-20) সংগ্রহ", desc: "SEVP-অনুমোদিত শিক্ষাপ্রতিষ্ঠানে ভর্তি নিশ্চিত করে অফিসিয়াল আই-২০ সংগ্রহ করুন।" },
        { title: "সেভিস (SEVIS) ফি প্রদান", desc: "অনলাইনে $৩৫০ সেভিস ফি পরিশোধ করুন এবং রসিদটি প্রিন্ট করে সাথে রাখুন।" },
        { title: "ডিএস-১৬০ পূরণ", desc: "অনলাইনে ডিএস-১৬০ ফরম পূরণ করে বারকোডসহ কনফার্মেশন পৃষ্ঠা প্রিন্ট করুন।" },
        { title: "ইন্টারভিউ বুকিং", desc: "ভিসা আবেদন পোর্টালে নিবন্ধন করে $১৮৫ ফি প্রদানপূর্বক ইন্টারভিউ এর তারিখ নির্বাচন করুন।" },
        { title: "ইন্টারভিউতে অংশগ্রহণ", desc: "ঢাকায় অবস্থিত মার্কিন দূতাবাসে প্রয়োজনীয় নথিপত্রসহ উপস্থিত হয়ে ইন্টারভিউ দিন।" }
      ],
      postArrival: [
        "ক্লাস শুরুর ৩০ দিনের মধ্যে আপনার প্রতিষ্ঠানের ডিএসও (DSO) এর সাথে যোগাযোগ করুন।",
        "পূর্ণকালীন শিক্ষার্থীর মর্যাদা বজায় রাখুন (স্নাতক পর্যায়ে সেমিস্টারে ন্যূনতম ১২ ক্রেডিট)।",
        "শুধুমাত্র ক্যাম্পাস ভিত্তিক কাজ করার অনুমতি আছে (সপ্তাহে সর্বোচ্চ ২০ ঘণ্টা)।"
      ]
    },
    "UK": {
      visaType: "স্টুডেন্ট ভিসা (Student Visa)",
      fee: "£৪৯০ জিবিপি + ইমিগ্রেশন হেলথ সারচার্জ (£৭৭৬/বছর)",
      processingTime: "৩ সপ্তাহ",
      requiredFunds: "টিউশন ফি + £১,৩৩৪/মাস (লন্ডনের ভিতরে) অথবা £১,০২৩/মাস (লন্ডনের বাইরে) ৯ মাসের জন্য",
      requirements: [
        { text: "বৈধ পাসপোর্ট", docType: "PASSPORT" },
        { text: "সিএএস (CAS - Confirmation of Acceptance for Studies) নম্বর", docType: null },
        { text: "অনুমোদিত হাসপাতাল থেকে যক্ষ্মা (TB) টেস্ট সার্টিফিকেট", docType: null },
        { text: "আর্থিক সচ্ছলতার প্রমাণ (টাকা অবশ্যই টানা ২৮ দিন ব্যাংক অ্যাকাউন্টে থাকতে হবে)", docType: "TIN" },
        { text: "ইউকেভিআই আইইএলটিএস (IELTS for UKVI) সার্টিফিকেট", docType: null },
        { text: "এটিএএস (ATAS) সার্টিফিকেট (কারিগরি ও বিজ্ঞান বিষয়ের ক্ষেত্রে প্রযোজ্য)", docType: null }
      ],
      steps: [
        { title: "সিএএস (CAS) সংগ্রহ", desc: "বিশ্ববিদ্যালয়ের অফার গ্রহণ করুন, ডিপোজিট জমা দিন এবং সিএএস স্টেটমেন্ট সংগ্রহ করুন।" },
        { title: "ফান্ড প্রস্তুতকরণ", desc: "প্রয়োজনীয় টাকা টানা ২৮ দিন অ্যাকাউন্ট হোল্ড করা নিশ্চিত করুন।" },
        { title: "যক্ষ্মা (TB) পরীক্ষা", desc: "ঢাকায় আইওএম (IOM) ক্লিনিকে যক্ষ্মা পরীক্ষা করিয়ে সার্টিফিকেট সংগ্রহ করুন।" },
        { title: "অনলাইন আবেদন", desc: "অনলাইনে ফর্ম পূরণ করে ভিসা ফি এবং ন্যাশনাল হেলথ সার্ভিস (NHS) ফি প্রদান করুন।" },
        { title: "বায়োমেট্রিক প্রদান", desc: "ঢাকার ভিএফএস গ্লোবাল (VFS Global) সেন্টারে বায়োমেট্রিক ও নথিপত্র জমা দিন।" }
      ],
      postArrival: [
        "যুক্তরাজ্যে পৌঁছানোর ১০ দিনের মধ্যে আপনার বায়োমেট্রিক রেসিডেন্স পারমিট (BRP) সংগ্রহ করুন।",
        "ভিসার শর্তে বলা থাকলে স্থানীয় থানায় নিবন্ধন (Police Registration) করুন।",
        "ক্লাস চলাকালীন সপ্তাহে সর্বোচ্চ ২০ ঘণ্টা কাজের অনুমতি পাবেন।"
      ]
    },
    "Canada": {
      visaType: "স্টাডি পারমিট (Study Permit)",
      fee: "$১৫০ ক্যাড + বায়োমেট্রিক্স ফি ($৮৫ ক্যাড)",
      processingTime: "৬-৮ সপ্তাহ",
      requiredFunds: "টিউশন ফি + $২০,৬৩৫ ক্যাড/বছর লিভিং কস্ট (অথবা জিআইসি সার্টিফিকেট)",
      requirements: [
        { text: "বৈধ পাসপোর্ট", docType: "PASSPORT" },
        { text: "অনুমোদিত শিক্ষাপ্রতিষ্ঠান (DLI) থেকে অফার লেটার (LOA)", docType: null },
        { text: "$২০,৬৩৫ ক্যাড সমমূল্যের জিআইসি (GIC) সার্টিফিকেট", docType: null },
        { text: "প্রথম বছরের টিউশন ফি প্রদানের রসিদ", docType: null },
        { text: "অনুমোদিত প্যানেল ডাক্তার থেকে আপফ্রন্ট মেডিকেল সার্টিফিকেট", docType: null },
        { text: "বাংলাদেশ পুলিশ কর্তৃক ইস্যুকৃত পুলিশ ক্লিয়ারেন্স সনদ", docType: null },
        { text: "ডিটেইলড স্টাডি প্ল্যান বা এসওপি (SOP)", docType: null }
      ],
      steps: [
        { title: "অফার লেটার সংগ্রহ", desc: "কানাডার যেকোনো ডিএলআই তালিকাভুক্ত প্রতিষ্ঠানে আবেদন করে অফার লেটার সংগ্রহ করুন।" },
        { title: "জিআইসি ও মেডিকেল সম্পন্নকরণ", desc: "কানাডিয়ান ব্যাংকে জিআইসি অ্যাকাউন্ট খুলে টাকা জমা করুন এবং মেডিকেল টেস্ট দিন।" },
        { title: "পুলিশ ক্লিয়ারেন্স", desc: "থানা থেকে কোনো ফৌজদারি রেকর্ড না থাকার সার্টিফিকেট বা পুলিশ ক্লিয়ারেন্স নিন।" },
        { title: "ভিসা ফাইল জমা দান", desc: "আইআরসিসির পোর্টালে অনলাইন আবেদন জমা দিন এবং ভিএফএস-এ বায়োমেট্রিক দিন।" },
        { title: "পাসপোর্ট জমা", desc: "ভিসা অনুমোদিত হলে পাসপোর্ট স্ট্যাম্পিংয়ের জন্য ভিএফএস-এ পাসপোর্ট দিন।" }
      ],
      postArrival: [
        "কানাডায় পৌঁছালে এয়ারপোর্টে বর্ডার কন্ট্রোল থেকে আপনার ফিজিক্যাল স্টাডি পারমিট সংগ্রহ করুন।",
        "পার্টটাইম কাজ শুরু করতে একটি সোশ্যাল ইন্স্যুরেন্স নম্বর (SIN) সংগ্রহ করুন।",
        "নিয়মিত ক্লাসে উপস্থিতি এবং পড়াশোনায় অগ্রগতি নিশ্চিত করুন।"
      ]
    },
    "Germany": {
      visaType: "জার্মান ন্যাশনাল ভিসা (National Visa - Category D)",
      fee: "€৭৫ ইউরো (প্রায় ৳৯,৫০০ টাকা)",
      processingTime: "৪-১২ সপ্তাহ",
      requiredFunds: "ব্লকড অ্যাকাউন্ট (Sperrkonto) এ €১১,৯০৮ ইউরো জমা",
      requirements: [
        { text: "বৈধ পাসপোর্ট", docType: "PASSPORT" },
        { text: "জার্মান বিশ্ববিদ্যালয় থেকে অফার লেটার (Zulassungsbescheid)", docType: null },
        { text: "ব্লকড অ্যাকাউন্ট কনফার্মেশন (€১১,৯০৮ ইউরো)", docType: null },
        { text: "ভ্রমণ ও জার্মান স্বাস্থ্য বীমা (Health Insurance)", docType: null },
        { text: "শিক্ষাগত সার্টিফিকেট, ট্রান্সক্রিপ্ট এবং ভাষা দক্ষতার প্রমাণ", docType: null },
        { text: "সঠিক তথ্যের ঘোষণা সংক্রান্ত ফর্ম", docType: null }
      ],
      steps: [
        { title: "বিশ্ববিদ্যালয়ে ভর্তি", desc: "জার্মানির সরকারি বা বেসরকারি বিশ্ববিদ্যালয় থেকে অফার লেটার সংগ্রহ করুন।" },
        { title: "ব্লকড অ্যাকাউন্ট খোলা", desc: "অনলাইনে ব্লকড অ্যাকাউন্ট খুলে সেখানে €১১,৯০৮ ইউরো জমা করুন।" },
        { title: "অ্যাপয়েন্টমেন্ট বুকিং", desc: "ঢাকার জার্মান দূতাবাসে ভিসা ইন্টারভিউ এর জন্য অ্যাপয়েন্টমেন্ট বুক করুন।" },
        { title: "আবেদন জমা দান", desc: "অ্যাপয়েন্টমেন্টের দিনে প্রয়োজনীয় সকল নথিপত্রসহ সশরীরে আবেদনপত্র জমা দিন।" },
        { title: "ভিসা সংগ্রহ", desc: "দূতাবাস থেকে ডি-ভিসা সংগ্রহ করে জার্মানিতে গিয়ে তা রেসিডেন্স পারমিটে রূপান্তর করুন।" }
      ],
      postArrival: [
        "পৌঁছানোর পর দ্রুত বাসা খুঁজে নিয়ে স্থানীয় সিটি অফিসে ঠিকানা নিবন্ধন (Anmeldung) করুন।",
        "জার্মান সরকারি বা বেসরকারি স্বাস্থ্য বীমা গ্রহণ করুন।",
        "বিদেশী নিবন্ধন অফিস (Ausländerbehörde) থেকে রেসিডেন্স পারমিট সংগ্রহ করুন।"
      ]
    },
    "Australia": {
      visaType: "স্টুডেন্ট ভিসা (Subclass 500)",
      fee: "$১,৬০০ অজি ডলার (প্রায় ৳১,২৫,০০০ টাকা)",
      processingTime: "৪-৬ সপ্তাহ",
      requiredFunds: "টিউশন ফি + $২৯,৭১০ অজি ডলার/বছর লিভিং কস্ট + যাতায়াত খরচ",
      requirements: [
        { text: "বৈধ পাসপোর্ট", docType: "PASSPORT" },
        { text: "অফিসিয়াল ভর্তি নিশ্চিতকরণ রসিদ বা সিওই (CoE)", docType: null },
        { text: "ভিসার পুরো মেয়াদের জন্য ওএসএইচসি (OSHC) হেলথ কাভার", docType: null },
        { text: "জেনুইন স্টুডেন্ট (GS) লিখিত স্টেটমেন্ট ও প্রমাণাদি", docType: null },
        { text: "আইইএলটিএস বা পিটিই (IELTS/PTE) পরীক্ষার সার্টিফিকেট", docType: null },
        { text: "আর্থিক সক্ষমতার প্রমাণ (ব্যাংক স্টেটমেন্ট অথবা স্পন্সরের বার্ষিক আয়ের ট্যাক্স সার্টিফিকেট)", docType: "TIN" },
        { text: "অনুমোদিত হাসপাতাল থেকে মেডিকেল চেকআপ কনফার্মেশন", docType: null }
      ],
      steps: [
        { title: "সিওই (CoE) সংগ্রহ", desc: "বিশ্ববিদ্যালয়ের অফার গ্রহণ করে প্রথম সেমিস্টারের ফি এবং ওএসএইচসি ফি প্রদান করে সিওই নিন।" },
        { title: "আর্থিক প্রমাণ তৈরি", desc: "অস্ট্রেলিয়ার নিয়ম অনুযায়ী প্রয়োজনীয় টাকা বা লোন সলভেন্সি ব্যাংক সার্টিফিকেট প্রস্তুত রাখুন।" },
        { title: "জিএস (GS) স্টেটমেন্ট লিখন", desc: "অস্ট্রেলিয়ায় পড়াশোনার উদ্দেশ্য এবং ভবিষ্যৎ পরিকল্পনা ব্যাখ্যা করে জিএস স্টেটমেন্ট লিখুন।" },
        { title: "অনলাইন ভিসা আবেদন", desc: "অনলাইনে ইমিঅ্যাকাউন্ট (ImmiAccount) খুলে ফর্ম পূরণ করুন ও ফি দিয়ে সাবমিট করুন।" },
        { title: "বায়োমেট্রিক ও মেডিকেল", desc: "ঢাকার ভিএফএস-এ বায়োমেট্রিক দিন ও অনুমোদিত ক্লিনিকে গিয়ে মেডিকেল সম্পন্ন করুন।" }
      ],
      postArrival: [
        "পৌঁছানোর ৭ দিনের মধ্যে শিক্ষাপ্রতিষ্ঠানকে আপনার ঠিকানা অবহিত করুন।",
        "Satisfactory উপস্থিতি এবং পড়াশোনায় ভালো ফলাফল বজায় রাখুন।",
        "পড়াশোনা চলাকালীন প্রতি দুই সপ্তাহে সর্বোচ্চ ৪৮ ঘণ্টা কাজ করার সুযোগ পাবেন।"
      ]
    },
    "Japan": {
      visaType: "স্টুডেন্ট ভিসা (College Student)",
      fee: "৩,০০০ ইয়েন (প্রায় ৳২,৪০০ টাকা)",
      processingTime: "৪-৮ সপ্তাহ",
      requiredFunds: "টিউশন ফি + আনুমানিক ১,৫০০,০০০ থেকে ২,০০০,০০০ ইয়েন/বছর (স্পন্সর সলভেন্সি)",
      requirements: [
        { text: "বৈধ পাসপোর্ট", docType: "PASSPORT" },
        { text: "জাপানি ইমিগ্রেশন কর্তৃক ইস্যুকৃত সিওই (COE - Certificate of Eligibility)", docType: null },
        { text: "ছবিসহ পূরণকৃত ভিসা অ্যাপ্লিকেশন ফরম", docType: null },
        { text: "শিক্ষাগত যোগ্যতার সনদ ও মার্কশিটসমূহ", docType: null },
        { text: "স্পন্সরের ব্যাংক সলভেন্সি ও চাকরি/কর ফাইলপত্র", docType: "TIN" },
        { text: "জাপানি ভাষা পরীক্ষার সার্টিফিকেট (NAT-TEST/JLPT) অথবা ইংরেজি দক্ষতা", docType: null }
      ],
      steps: [
        { title: "সিওই (COE) এর আবেদন", desc: "জাপানি শিক্ষাপ্রতিষ্ঠান আপনার পক্ষ থেকে জাপানে ইমিগ্রেশন অফিসে সিওই-এর আবেদন করবে।" },
        { title: "সিওই (COE) প্রাপ্তি", desc: "অনুমোদন পাওয়ার পর আপনার প্রতিষ্ঠান আসল সিওই কপিটি কুরিয়ারে আপনাকে পাঠাবে।" },
        { title: "ভিসা ফাইল জমা দান", desc: "আসল সিওই, পাসপোর্ট, ছবি ও ফরমসহ ঢাকার জাপানি দূতাবাসে আবেদন জমা দিন।" },
        { title: " embassy সাক্ষাৎকার", desc: "দূতাবাস যদি প্রয়োজন মনে করে তবে সাধারণ ভাষা দক্ষতা যাচাইয়ের জন্য ইন্টারভিউ নেবে।" },
        { title: "ভিসা সংগ্রহ", desc: "ভিসা স্ট্যাম্পসহ আপনার পাসপোর্ট দূতাবাস থেকে সংগ্রহ করুন।" }
      ],
      postArrival: [
        "জাপানের বিমানবন্দরে পৌঁছানোর পর আপনার রেসিডেন্স কার্ড (Zairyu Card) সংগ্রহ করুন।",
        "১৪ দিনের মধ্যে স্থানীয় ওয়ার্ড অফিস বা ওয়ার্ড কাউন্সিলে গিয়ে ঠিকানা নিবন্ধন করুন।",
        "সপ্তাহে সর্বোচ্চ ২৮ ঘণ্টা পার্ট-টাইম কাজ করতে অনুমতিপত্র (Shikakugai-katsudo) সংগ্রহ করুন।"
      ]
    }
  }
}

const internationalScholarships: Record<'en' | 'bn', Scholarship[]> = {
  en: [
    {
      name: "Fulbright Graduate Student Program",
      provider: "Government of the United States",
      gpaReq: 3.0,
      ieltsReq: 6.5,
      benefits: "Fully Funded: Covers tuition fees, living allowance, health insurance, roundtrip flights.",
      deadline: "May - June (Annual)"
    },
    {
      name: "Chevening Scholarship",
      provider: "Government of the United Kingdom",
      gpaReq: 3.0,
      ieltsReq: 6.5,
      benefits: "Fully Funded: University tuition fees, monthly living allowance, return economy flights, visa cost.",
      deadline: "November (Annual)"
    },
    {
      name: "Commonwealth Master's & PhD Scholarships",
      provider: "UK Commonwealth Scholarship Commission",
      gpaReq: 3.5,
      ieltsReq: 6.5,
      benefits: "Fully Funded: Approved tuition fees, monthly stipend, travel grants, warm clothing allowance.",
      deadline: "October - December (Annual)"
    },
    {
      name: "DAAD EPOS Development Scholarships",
      provider: "Government of Germany",
      gpaReq: 3.0,
      ieltsReq: 6.0,
      benefits: "Fully Funded: Monthly payment of €934 - €1,200, health insurance, travel subsidies.",
      deadline: "August - October (Annual)"
    },
    {
      name: "MEXT Japanese Government Scholarships",
      provider: "Government of Japan (MEXT)",
      gpaReq: 3.2,
      ieltsReq: 6.0,
      benefits: "Fully Funded: Full tuition exemption, monthly stipend (approx. 143,000 JPY), flight tickets.",
      deadline: "May (Annual)"
    }
  ],
  bn: [
    {
      name: "ফুলব্রাইট গ্র্যাজুয়েট স্টুডেন্ট প্রোগ্রাম",
      provider: "মার্কিন যুক্তরাষ্ট্র সরকার",
      gpaReq: 3.0,
      ieltsReq: 6.5,
      benefits: "সম্পূর্ণ অর্থায়িত: টিউশন ফি, মাসিক ভাতা, স্বাস্থ্য বীমা এবং রিটার্ন বিমান টিকিট অন্তর্ভুক্ত।",
      deadline: "মে - জুন (বার্ষিক)"
    },
    {
      name: "শেভনিং স্কলারশিপ (Chevening)",
      provider: "যুক্তরাজ্য সরকার",
      gpaReq: 3.0,
      ieltsReq: 6.5,
      benefits: "সম্পূর্ণ অর্থায়িত: বিশ্ববিদ্যালয়ের সম্পূর্ণ টিউশন ফি, মাসিক লিভিং এলাউন্স, বিমান ভাড়া এবং ভিসা ফি প্রদান করে।",
      deadline: "নভেম্বর (বার্ষিক)"
    },
    {
      name: "কমনওয়েলথ মাস্টার্স ও পিএইচডি স্কলারশিপ",
      provider: "ইউকে কমনওয়েলথ স্কলারশিপ কমিশন",
      gpaReq: 3.5,
      ieltsReq: 6.5,
      benefits: "সম্পূর্ণ অর্থায়িত: টিউশন ফি, মাসিক স্টাইপেন্ড, বিমান টিকিট এবং শীতের পোশাক কেনার ভাতা দেয়।",
      deadline: "অক্টোবর - ডিসেম্বর (বার্ষিক)"
    },
    {
      name: "ডাড (DAAD) ডেভেলপমেন্ট স্কলারশিপ",
      provider: "জার্মানি সরকার",
      gpaReq: 3.0,
      ieltsReq: 6.0,
      benefits: "সম্পূর্ণ অর্থায়িত: প্রতি মাসে €৯৩৪ - €১,২০০ ইউরো ভাতা, মেডিকেল ইন্স্যুরেন্স ও যাতায়াত অনুদান।",
      deadline: "আগস্ট - অক্টোবর (বার্ষিক)"
    },
    {
      name: "মেক্সট (MEXT) জাপান সরকারি স্কলারশিপ",
      provider: "জাপান সরকার (MEXT)",
      gpaReq: 3.2,
      ieltsReq: 6.0,
      benefits: "সম্পূর্ণ অর্থায়িত: সম্পূর্ণ টিউশন ফি মওকুফ, মাসিক ভাতা (প্রায় ১৪৩,০০০ ইয়েন) এবং বিমান টিকিট।",
      deadline: "মে (বার্ষিক)"
    }
  ]
}

const DEFAULT_PROFILE: ProfileData = {
  name: "",
  targetDegree: "Master's Degree",
  targetCountry: "USA",
  gpa: "",
  englishTest: "IELTS",
  englishScore: "",
  funds: ""
}

export default function ScholarshipAndVisaPage() {
  const { language } = useLanguage()
  const s = {
    en: {
      title: "Scholarships & Student Visas Guide",
      subtitle: "Education & Travel Portal",
      dept: "Ministry of Education & Overseas Immigration Support",
      stats: [
        { label: "Processing Time", value: "3-8 Weeks", icon: Clock },
        { label: "Visa Cost", value: "Varies by Country", icon: CreditCard },
        { label: "Complexity", value: "Medium to High", icon: LayoutIcon }
      ],
      back: "Back to Directory",
      profileTitle: "My Study Abroad Profile",
      profileDesc: "Save your academic profile to match with visas, requirements, and find matching scholarships.",
      saveBtn: "Save Profile Data",
      profileSaved: "Profile stored successfully in local workspace!",
      
      fullName: "Full Name",
      targetDegree: "Target Degree",
      targetCountry: "Preferred Country",
      gpa: "GPA / CGPA (e.g. 3.75)",
      englishTest: "English Test Type",
      englishScore: "Test Score (e.g. 7.0)",
      fundAmount: "Bank Balance Solvency (BDT equivalent)",
      
      matchingTitle: "AI Matching & Pathway Analysis",
      matchingDesc: "Based on your stored data, here is your customized guidance checklist:",
      visaInfoTitle: "Detailed Student Visa Guides",
      selectCountryPrompt: "Choose a destination to view full requirements, costs, timelines, and post-study compliance guidelines.",
      
      checklistTitle: "Document Requirements Tracker",
      checklistDesc: "Syncs automatically with your Document Vault if uploaded (NID/Passport/TIN/Photo). Feel free to check off others manually.",
      foundInVault: "Linked from Document Vault",
      notInVault: "Not in Vault (Click upload in Vault page)",
      vaultLinked: "Vault integration active",
      
      trackerTitle: "My Application Task & Deadline Tracker",
      trackerDesc: "Store deadlines and customized application steps. These persist locally in your browser workspace.",
      addTaskBtn: "Add Task",
      taskPlaceholder: "e.g., Get recommendation letters from professors",
      taskDeadline: "Deadline Date",
      noTasks: "No application tasks added yet. Create a task above to track your progress!",
      
      fees: "Government & Security Fees",
      funds: "Required Proof of Financial Solvency",
      workRights: "Part-Time & Post-Study Work Rights",
      timeline: "Step-by-Step Application Timeline",
      complianceTitle: "Post-Arrival Compliance & Rules",
      
      scholarshipsTitle: "Prestigious International Scholarships",
      scholarshipsDesc: "Fully-funded and prestigious awards open to Bangladeshi students.",
      meetReqs: "Eligible (Meets GPA & IELTS requirements)",
      missReqs: "Does not meet GPA or IELTS requirement",
      gpaRequired: "GPA Required",
      ieltsRequired: "Language Score Required",
      deadlineLabel: "Application Period"
    },
    bn: {
      title: "স্কলারশিপ ও স্টুডেন্ট ভিসা পোর্টাল",
      subtitle: "শিক্ষা ও ভ্রমণ কার্যক্রম",
      dept: "শিক্ষা মন্ত্রণালয় ও বৈদেশিক ইমিগ্রেশন সাপোর্ট",
      stats: [
        { label: "প্রক্রিয়াকরণ সময়", value: "৩-৮ সপ্তাহ", icon: Clock },
        { label: "ভিসা ফি", value: "দেশ ভেদে ভিন্ন", icon: CreditCard },
        { label: "জতিলাত", value: "মাঝারি থেকে কঠিন", icon: LayoutIcon }
      ],
      back: "ডিরেক্টরিতে ফিরে যান",
      profileTitle: "আমার স্টাডি অ্যাব্রড প্রোফাইল",
      profileDesc: "ভিসার প্রয়োজনীয়তা মেলাতে এবং উপযুক্ত স্কলারশিপ খুঁজতে আপনার শিক্ষাগত প্রোফাইল তথ্য সংরক্ষণ করুন।",
      saveBtn: "প্রোফাইল তথ্য সংরক্ষণ করুন",
      profileSaved: "প্রোফাইল তথ্য আপনার লোকাল ওয়ার্কস্পেসে সফলভাবে সংরক্ষিত হয়েছে!",
      
      fullName: "পূর্ণ নাম",
      targetDegree: "কাঙ্ক্ষিত ডিগ্রি",
      targetCountry: "পছন্দের গন্তব্য",
      gpa: "জিপিএ / সিজিপিএ (যেমন: ৩.৭৫)",
      englishTest: "ইংরেজি দক্ষতা পরীক্ষা",
      englishScore: "স্কোর (যেমন: ৭.০)",
      fundAmount: "উপলব্ধ ব্যাংক ব্যালেন্স (টাকায়)",
      
      matchingTitle: "প্রোফাইল ম্যাচিং ও পথ বিশ্লেষণ",
      matchingDesc: "আপনার সংরক্ষিত তথ্যের ভিত্তিতে কাস্টমাইজড গাইড ও চেকলিস্ট নিচে দেওয়া হলো:",
      visaInfoTitle: "বিস্তারিত স্টুডেন্ট ভিসা নির্দেশিকা",
      selectCountryPrompt: "বিস্তারিত ভিসা প্রয়োজনীয়তা, ফি, সময়সীমা এবং পরবর্তী নিয়মাবলী দেখতে একটি দেশ সিলেক্ট করুন।",
      
      checklistTitle: "ভিসা নথিপত্র চেকলিস্ট ট্র্যাকার",
      checklistDesc: "ডকুমেন্ট ভল্টে আপলোড করা ফাইল (NID/পাসপোর্ট/টিন/ছবি) স্বয়ংক্রিয়ভাবে সিঙ্ক হবে। বাকিগুলো ম্যানুয়ালি চেক করতে পারেন।",
      foundInVault: "ভল্ট থেকে লিঙ্ক করা হয়েছে",
      notInVault: "ভল্টে পাওয়া যায়নি (ভল্ট পেজে আপলোড করুন)",
      vaultLinked: "ভল্ট ইন্টিগ্রেশন সক্রিয়",
      
      trackerTitle: "আবেদন ও ডেডলাইন ট্র্যাকার",
      trackerDesc: "আবেদনের গুরুত্বপূর্ণ ডেডলাইন এবং কাজগুলো সংরক্ষণ করুন। তথ্য আপনার ব্রাউজার লোকাল স্পেসে সংরক্ষিত থাকবে।",
      addTaskBtn: "কাজ যোগ করুন",
      taskPlaceholder: "যেমন: প্রফেসরদের কাছ থেকে সুপারিশপত্র সংগ্রহ করা",
      taskDeadline: "ডেডলাইন সময়",
      noTasks: "কোনো কাজ যোগ করা হয়নি। অগ্রগতি ট্র্যাক করতে উপরে একটি কাজ যোগ করুন!",
      
      fees: "সরকারি ও নিরাপত্তা ফি",
      funds: "আর্থিক সচ্ছলতার প্রয়োজনীয় প্রমাণ",
      workRights: "খণ্ডকালীন কাজ ও পড়াশোনা পরবর্তী সুবিধা",
      timeline: "ধাপে ধাপে ভিসা আবেদন প্রক্রিয়া",
      complianceTitle: "পৌঁছানোর পরবর্তী নিয়ম ও কমপ্লায়েন্স",
      
      scholarshipsTitle: "আন্তর্জাতিক স্কলারশিপসমূহ",
      scholarshipsDesc: "বাংলাদেশী শিক্ষার্থীদের জন্য উন্মুক্ত বিশ্বখ্যাত এবং সম্পূর্ণ অর্থায়িত স্কলারশিপসমূহ।",
      meetReqs: "যোগ্য (জিপিএ এবং ইংরেজি স্কোর ঠিক আছে)",
      missReqs: "যোগ্য নয় (জিপিএ বা ইংরেজি স্কোর কম)",
      gpaRequired: "প্রয়োজনীয় জিপিএ",
      ieltsRequired: "প্রয়োজনীয় ভাষা স্কোর",
      deadlineLabel: "আবেদনের সময়কাল"
    }
  }[language]

  // State Management
  const [profile, setProfile] = useState<ProfileData>(DEFAULT_PROFILE)
  const [saveStatus, setSaveStatus] = useState(false)
  const [selectedCountry, setSelectedCountry] = useState("USA")
  const [checkedDocs, setCheckedDocs] = useState<string[]>([])
  const [vaultDocs, setVaultDocs] = useState<string[]>([])
  const [tasks, setTasks] = useState<CustomTask[]>([])
  const [newTaskTitle, setNewTaskTitle] = useState("")
  const [newTaskDeadline, setNewTaskDeadline] = useState("")

  const supabase = createClient()

  // Load Saved Data on Mount
  useEffect(() => {
    // Load Profile and Tasks asynchronously to avoid synchronous setState inside useEffect
    const timer = setTimeout(() => {
      const savedProfile = localStorage.getItem('docket_study_profile')
      if (savedProfile) {
        try {
          const parsed = JSON.parse(savedProfile)
          setProfile(parsed)
          if (parsed.targetCountry) {
            setSelectedCountry(parsed.targetCountry)
          }
        } catch (e) {
          console.error("Error parsing profile", e)
        }
      }

      const savedTasks = localStorage.getItem('docket_saved_tasks')
      if (savedTasks) {
        try {
          setTasks(JSON.parse(savedTasks))
        } catch (e) {
          console.error("Error parsing tasks", e)
        }
      }
    }, 0)

    // Fetch Document Vault Info
    const checkVault = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (session) {
        const { data } = await supabase
          .from('documents')
          .select('doc_type')
        if (data) {
          const types = data.map(d => d.doc_type)
          setVaultDocs(types)
        }
      }
    }

    checkVault()
    return () => clearTimeout(timer)
  }, [supabase])

  // Save Profile Handler
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault()
    localStorage.setItem('docket_study_profile', JSON.stringify(profile))
    setSaveStatus(true)
    setTimeout(() => setSaveStatus(false), 4000)
    
    // Automatically match visa country tabs to target country selection
    if (profile.targetCountry) {
      setSelectedCountry(profile.targetCountry)
    }
  }

  // Task Handlers
  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTaskTitle.trim()) return

    const newTask: CustomTask = {
      id: crypto.randomUUID(),
      title: newTaskTitle,
      deadline: newTaskDeadline || 'No deadline',
      completed: false
    }

    const updatedTasks = [...tasks, newTask]
    setTasks(updatedTasks)
    localStorage.setItem('docket_saved_tasks', JSON.stringify(updatedTasks))
    
    setNewTaskTitle("")
    setNewTaskDeadline("")
  }

  const toggleTask = (taskId: string) => {
    const updatedTasks = tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    )
    setTasks(updatedTasks)
    localStorage.setItem('docket_saved_tasks', JSON.stringify(updatedTasks))
  }

  const deleteTask = (taskId: string) => {
    const updatedTasks = tasks.filter(task => task.id !== taskId)
    setTasks(updatedTasks)
    localStorage.setItem('docket_saved_tasks', JSON.stringify(updatedTasks))
  }

  const toggleDocCheck = (docText: string) => {
    setCheckedDocs(prev => 
      prev.includes(docText) ? prev.filter(t => t !== docText) : [...prev, docText]
    )
  }

  const guide = countryVisaGuides[language][selectedCountry] || countryVisaGuides[language]["USA"]
  const scholarships = internationalScholarships[language]

  // Custom recommendation algorithms
  const parseGPA = parseFloat(profile.gpa) || 0
  const parseScore = parseFloat(profile.englishScore) || 0
  const parseFunds = parseFloat(profile.funds) || 0

  const matchingScholarshipCount = scholarships.filter(scholarship => {
    return parseGPA >= scholarship.gpaReq && (profile.englishTest === 'None / Waiver' || parseScore >= scholarship.ieltsReq)
  }).length

  return (
    <main className="min-h-screen bg-[#f3f2f1] pt-16">
      <Header />
      
      {/* Breadcrumbs & Back */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-wider text-[#ff0000] hover:underline">
          <ArrowLeft className="w-4 h-4 stroke-[3px]" />
          {s.back}
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        
        {/* Page Title Card */}
        <div className="bg-white border-[3px] border-black p-8 space-y-6 mb-10">
          <div className="space-y-2">
            <span className="text-[10px] font-black uppercase bg-[#ff0000] text-white px-2 py-0.5">
              {s.subtitle}
            </span>
            <h1 className="text-4xl font-black text-black leading-tight flex items-center gap-3">
              <GraduationCap className="w-10 h-10 text-[#ff0000] shrink-0" />
              {s.title}
            </h1>
            <p className="text-sm font-bold text-gray-500 uppercase tracking-wider">
              {s.dept}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t-[3px] border-black">
            {s.stats.map((stat, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="p-2 bg-gray-50 border-2 border-black">
                  <stat.icon className="w-5 h-5 text-black" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase text-gray-400 leading-none">{stat.label}</p>
                  <p className="text-sm font-bold text-black pt-1">{stat.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dual Layout: Left Sidebar Profile form, Right Main Visa Info & Scholarship Grid */}
        <div className="grid lg:grid-cols-3 gap-10">
          
          {/* Left Column: Local Storage Data Persist & AI recommendations */}
          <div className="lg:col-span-1 space-y-10">
            
            {/* Academic profile form */}
            <div className="bg-white border-[3px] border-black p-6 space-y-6">
              <div className="space-y-1">
                <h2 className="text-xl font-black uppercase flex items-center gap-2">
                  <User className="w-5 h-5 text-[#ff0000]" />
                  {s.profileTitle}
                </h2>
                <p className="text-xs text-gray-500 font-bold leading-normal">
                  {s.profileDesc}
                </p>
              </div>

              <form onSubmit={handleSaveProfile} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-black uppercase text-gray-500">{s.fullName}</label>
                  <Input 
                    type="text" 
                    placeholder="e.g. Rahat Rahman" 
                    value={profile.name}
                    onChange={e => setProfile({...profile, name: e.target.value})}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-black uppercase text-gray-500">{s.targetDegree}</label>
                  <select 
                    value={profile.targetDegree}
                    onChange={e => setProfile({...profile, targetDegree: e.target.value})}
                    className="w-full h-12 px-4 border-[3px] border-black font-bold focus:bg-gray-50 outline-none appearance-none cursor-pointer rounded-none text-sm"
                  >
                    {language === 'en' ? (
                      ["Bachelor's Degree", "Master's Degree", "PhD / Doctorate"].map(d => (
                        <option key={d} value={d}>{d}</option>
                      ))
                    ) : (
                      ["ব্যাচেলর ডিগ্রি", "মাস্টার্স ডিগ্রি", "পিএইচডি / ডক্টরেট"].map((d, idx) => {
                        const enVal = ["Bachelor's Degree", "Master's Degree", "PhD / Doctorate"][idx];
                        return <option key={enVal} value={enVal}>{d}</option>
                      })
                    )}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-black uppercase text-gray-500">{s.targetCountry}</label>
                  <select 
                    value={profile.targetCountry}
                    onChange={e => setProfile({...profile, targetCountry: e.target.value})}
                    className="w-full h-12 px-4 border-[3px] border-black font-bold focus:bg-gray-50 outline-none appearance-none cursor-pointer rounded-none text-sm"
                  >
                    {["USA", "UK", "Canada", "Germany", "Australia", "Japan"].map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-black uppercase text-gray-500">{s.gpa}</label>
                  <Input 
                    type="text" 
                    placeholder="e.g. 3.80" 
                    value={profile.gpa}
                    onChange={e => setProfile({...profile, gpa: e.target.value})}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-black uppercase text-gray-500">{s.englishTest}</label>
                    <select 
                      value={profile.englishTest}
                      onChange={e => setProfile({...profile, englishTest: e.target.value})}
                      className="w-full h-12 px-4 border-[3px] border-black font-bold focus:bg-gray-50 outline-none appearance-none cursor-pointer rounded-none text-xs"
                    >
                      {["IELTS", "TOEFL", "PTE Academic", "None / Waiver"].map(t => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-black uppercase text-gray-500">{s.englishScore}</label>
                    <Input 
                      type="text" 
                      placeholder="e.g. 7.5" 
                      disabled={profile.englishTest === 'None / Waiver'}
                      value={profile.englishScore}
                      onChange={e => setProfile({...profile, englishScore: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-black uppercase text-gray-500">{s.fundAmount}</label>
                  <Input 
                    type="number" 
                    placeholder="e.g. 2500000" 
                    value={profile.funds}
                    onChange={e => setProfile({...profile, funds: e.target.value})}
                  />
                </div>

                <Button type="submit" className="w-full mt-2 font-black uppercase flex items-center justify-center gap-2 border-[3px] border-black rounded-none">
                  <Save className="w-5 h-5" />
                  {s.saveBtn}
                </Button>
              </form>

              {saveStatus && (
                <div className="p-3 bg-green-50 border-2 border-green-500 text-green-800 text-xs font-bold flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-green-600 shrink-0" />
                  {s.profileSaved}
                </div>
              )}
            </div>

            {/* Smart Matches box based on profile */}
            {profile.gpa && (
              <div className="bg-[#ff0000]/5 border-[3px] border-black p-6 space-y-4">
                <h3 className="text-lg font-black uppercase text-black flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-[#ff0000]" />
                  {s.matchingTitle}
                </h3>
                <p className="text-xs font-medium text-gray-700">
                  {s.matchingDesc}
                </p>

                <div className="space-y-3">
                  <div className="p-3 bg-white border-2 border-black space-y-1 text-xs">
                    <p className="font-black text-black uppercase">
                      {language === 'en' ? 'Scholarship Eligibility' : 'স্কলারশিপ যোগ্যতা'}
                    </p>
                    <p className="font-bold text-gray-600">
                      {language === 'en' 
                        ? `You match ${matchingScholarshipCount} prestigious global scholarships with your GPA (${profile.gpa || '0'}) and Language proficiency.`
                        : `আপনার জিপিএ (${profile.gpa || '০'}) এবং ভাষা পরীক্ষার ভিত্তিতে আপনি ${matchingScholarshipCount}টি আন্তর্জাতিক স্কলারশিপের আবেদনের যোগ্য।`}
                    </p>
                  </div>

                  {/* Fund warning */}
                  {profile.funds && parseFunds < 1500000 && (
                    <div className="p-3 bg-white border-2 border-black space-y-1 text-xs">
                      <p className="font-black text-[#ff0000] uppercase flex items-center gap-1">
                        <AlertCircle className="w-4 h-4 text-[#ff0000] shrink-0" />
                        {language === 'en' ? 'Financial Advisory' : 'আর্থিক পরামর্শ'}
                      </p>
                      <p className="font-bold text-gray-600">
                        {language === 'en'
                          ? "Your solvency proof (less than 15 Lakh BDT) might be tight for USA, UK, or Canada study visas without full funding. We recommend targeting fully-funded scholarships or exploring Germany's public universities."
                          : "আপনার ব্যাংক তহবিল (১৫ লক্ষ টাকার কম) মার্কিন যুক্তরাষ্ট্র, যুক্তরাজ্য বা কানাডার জন্য কিছু কম হতে পারে। আমরা আপনাকে সম্পূর্ণ অর্থায়িত স্কলারশিপ বা জার্মানির পাবলিক বিশ্ববিদ্যালয়ে আবেদনের পরামর্শ দিচ্ছি।"}
                      </p>
                    </div>
                  )}

                  {/* Blocked account reminder if Germany target */}
                  {selectedCountry === 'Germany' && (
                    <div className="p-3 bg-white border-2 border-black space-y-1 text-xs">
                      <p className="font-black text-black uppercase flex items-center gap-1">
                        <Globe className="w-4 h-4 text-[#ff0000] shrink-0" />
                        {language === 'en' ? 'German Blocked Account' : 'জার্মান ব্লকড অ্যাকাউন্ট'}
                      </p>
                      <p className="font-bold text-gray-600">
                        {language === 'en'
                          ? "Germany requires a Blocked Account (Sperrkonto) containing €11,908 EUR. This is mandatory for visa issuance."
                          : "জার্মানির স্টুডেন্ট ভিসার জন্য আপনার একটি ব্লকড অ্যাকাউন্টে (Sperrkonto) কমপক্ষে €১১,৯০৮ ইউরো জমা থাকতে হবে। এটি ভিসা পাওয়ার জন্য বাধ্যতামূলক।"}
                      </p>
                    </div>
                  )}

                  {/* Language waiver suggestion */}
                  {profile.englishTest === 'None / Waiver' && (
                    <div className="p-3 bg-white border-2 border-black space-y-1 text-xs">
                      <p className="font-black text-amber-600 uppercase flex items-center gap-1">
                        <AlertCircle className="w-4 h-4 text-amber-500 shrink-0" />
                        {language === 'en' ? 'Language Proof Alert' : 'ভাষা দক্ষতার সতর্কতা'}
                      </p>
                      <p className="font-bold text-gray-600">
                        {language === 'en'
                          ? "Applying without an English proficiency certificate limits choices. Consider IELTS or TOEFL to expand options for fully-funded fellowships."
                          : "ইংরেজি দক্ষতা পরীক্ষা ছাড়া আবেদন করলে অপশন সীমাবদ্ধ হয়ে যায়। বড় স্কলারশিপ ও ভিসা নিশ্চিত করতে আইইএলটিএস বা টোফেল দেওয়ার চেষ্টা করুন।"}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Right Main Column (Span 2): Visa Selector & Detailed Steps & Scholarship listings */}
          <div className="lg:col-span-2 space-y-10">
            
            {/* Visa Directory Selector */}
            <div className="bg-white border-[3px] border-black p-8 space-y-8">
              <div className="space-y-2">
                <h2 className="text-2xl font-black text-black flex items-center gap-2">
                  <Globe className="w-6 h-6 text-[#ff0000]" />
                  {s.visaInfoTitle}
                </h2>
                <p className="text-sm font-bold text-gray-500 leading-normal uppercase">
                  {s.selectCountryPrompt}
                </p>
              </div>

              {/* Country Tabs */}
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {["USA", "UK", "Canada", "Germany", "Australia", "Japan"].map(c => {
                  const isActive = selectedCountry === c
                  return (
                    <button
                      key={c}
                      onClick={() => setSelectedCountry(c)}
                      className={`py-3 border-2 border-black font-black uppercase text-xs transition-all ${
                        isActive 
                          ? 'bg-[#ff0000] text-white' 
                          : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                      }`}
                    >
                      {c}
                    </button>
                  )
                })}
              </div>

              {/* Stamped details of selected country visa */}
              <div className="space-y-6 pt-6 border-t-2 border-dashed border-gray-200">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider bg-black text-white px-2 py-0.5">
                      {selectedCountry} Profile
                    </span>
                    <h3 className="text-2xl font-black text-black pt-1">{guide.visaType}</h3>
                  </div>
                  
                  <div className="bg-gray-50 border-2 border-black p-3 text-right">
                    <p className="text-[9px] font-black uppercase text-gray-400 leading-none">Government Visa Fee</p>
                    <p className="text-sm font-black text-black pt-1">{guide.fee}</p>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="border-2 border-black p-4 bg-gray-50">
                    <p className="text-[9px] font-black uppercase text-gray-400">Processing Timeframe</p>
                    <p className="text-sm font-bold text-black pt-1">{guide.processingTime}</p>
                  </div>
                  <div className="border-2 border-black p-4 bg-gray-50">
                    <p className="text-[9px] font-black uppercase text-gray-400">Solvency Required</p>
                    <p className="text-sm font-bold text-black pt-1">{guide.requiredFunds}</p>
                  </div>
                </div>

                {/* Vertical Timeline pathway */}
                <div className="space-y-4">
                  <h4 className="text-base font-black uppercase text-black">{s.timeline}</h4>
                  <div className="space-y-0">
                    {guide.steps.map((step, idx) => (
                      <div key={idx} className="relative pl-6 pb-6 group">
                        {idx !== guide.steps.length - 1 && (
                          <div className="absolute left-[9px] top-5 bottom-0 w-0.5 bg-black" />
                        )}
                        <div className="absolute left-0 top-1 w-5 h-5 bg-white border-[3px] border-black rounded-full z-10 group-hover:bg-[#ff0000] transition-colors" />
                        <div className="bg-white border-2 border-black p-4 space-y-1 text-xs">
                          <h5 className="font-black text-black flex items-center gap-2">
                            <span className="bg-black text-white px-1 text-[10px]">{idx + 1}</span>
                            {step.title}
                          </h5>
                          <p className="font-bold text-gray-600 leading-normal">{step.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Required Documents Tracker with Vault Sync */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b-2 border-black pb-2">
                    <h4 className="text-base font-black uppercase text-black">{s.checklistTitle}</h4>
                    <span className="text-[10px] font-black uppercase tracking-wider text-green-600 bg-green-50 px-2 py-0.5 border border-green-500">
                      {s.vaultLinked}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 font-bold leading-normal">
                    {s.checklistDesc}
                  </p>

                  <div className="grid sm:grid-cols-2 gap-3 pt-2">
                    {guide.requirements.map((req, idx) => {
                      const isLinked = req.docType && vaultDocs.includes(req.docType)
                      const isChecked = isLinked || checkedDocs.includes(req.text)
                      
                      return (
                        <div 
                          key={idx}
                          onClick={() => !isLinked && toggleDocCheck(req.text)}
                          className={`border-2 p-3 flex items-start justify-between gap-3 select-none transition-colors ${
                            isLinked 
                              ? 'border-green-500 bg-green-50/50 cursor-default' 
                              : 'border-black bg-white hover:bg-gray-50 cursor-pointer'
                          }`}
                        >
                          <div className="space-y-1 min-w-0">
                            <p className={`text-xs font-bold leading-snug ${isChecked ? 'line-through text-gray-400' : 'text-black'}`}>
                              {req.text}
                            </p>
                            {isLinked && (
                              <span className="inline-flex items-center gap-1 text-[8px] font-black uppercase text-green-600">
                                <ShieldCheck className="w-3 h-3 text-green-600" />
                                {s.foundInVault}
                              </span>
                            )}
                            {req.docType && !isLinked && (
                              <span className="inline-flex items-center gap-1 text-[8px] font-black uppercase text-gray-400">
                                {s.notInVault}
                              </span>
                            )}
                          </div>

                          <div className="shrink-0 mt-0.5">
                            {isChecked ? (
                              <CheckCircle2 className={`w-5 h-5 ${isLinked ? 'text-green-600' : 'text-black'}`} />
                            ) : (
                              <Circle className="w-5 h-5 text-gray-300" />
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Post Arrival compliance rules */}
                <div className="p-6 bg-gray-50 border-2 border-black space-y-4">
                  <h4 className="text-base font-black uppercase text-black flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-[#ff0000]" />
                    {s.complianceTitle}
                  </h4>
                  <ul className="space-y-2">
                    {guide.postArrival.map((rule, idx) => (
                      <li key={idx} className="flex gap-2.5 items-start text-xs font-bold text-gray-700 leading-normal">
                        <span className="text-[#ff0000] font-black shrink-0">•</span>
                        <span>{rule}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Custom Task & Deadline Tracker (Storing data in local storage) */}
            <div className="bg-white border-[3px] border-black p-8 space-y-6">
              <div className="space-y-2">
                <h2 className="text-2xl font-black text-black flex items-center gap-2">
                  <Calendar className="w-6 h-6 text-[#ff0000]" />
                  {s.trackerTitle}
                </h2>
                <p className="text-sm font-bold text-gray-500 leading-normal uppercase">
                  {s.trackerDesc}
                </p>
              </div>

              {/* Task Add Form */}
              <form onSubmit={handleAddTask} className="grid sm:grid-cols-3 gap-4 border-2 border-black p-4 bg-gray-50">
                <div className="sm:col-span-2 space-y-1">
                  <label className="text-[10px] font-black uppercase text-gray-500">Task Details</label>
                  <Input 
                    type="text" 
                    placeholder={s.taskPlaceholder}
                    value={newTaskTitle}
                    onChange={e => setNewTaskTitle(e.target.value)}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase text-gray-500">{s.taskDeadline}</label>
                  <div className="flex gap-2">
                    <Input 
                      type="date" 
                      value={newTaskDeadline}
                      onChange={e => setNewTaskDeadline(e.target.value)}
                      className="flex-1"
                    />
                    <Button type="submit" size="icon" className="shrink-0 border-2 border-black">
                      <Plus className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
              </form>

              {/* Tasks List */}
              <div className="space-y-3 pt-2">
                {tasks.length === 0 ? (
                  <p className="text-center py-6 border-2 border-dashed border-gray-300 text-xs font-bold text-gray-400 uppercase">
                    {s.noTasks}
                  </p>
                ) : (
                  tasks.map(task => (
                    <div 
                      key={task.id} 
                      className={`border-2 border-black p-4 flex items-center justify-between gap-4 transition-colors ${
                        task.completed ? 'bg-gray-50/50 opacity-75' : 'bg-white'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <button 
                          onClick={() => toggleTask(task.id)}
                          className="shrink-0 p-1 hover:bg-gray-100 transition-colors"
                        >
                          {task.completed ? (
                            <CheckCircle2 className="w-5 h-5 text-green-600" />
                          ) : (
                            <Circle className="w-5 h-5 text-gray-400 hover:text-black" />
                          )}
                        </button>
                        <div className="min-w-0">
                          <p className={`text-sm font-bold truncate pr-4 ${task.completed ? 'line-through text-gray-400' : 'text-black'}`}>
                            {task.title}
                          </p>
                          <p className="text-[10px] font-black text-gray-400 uppercase">
                            {s.taskDeadline}: {task.deadline}
                          </p>
                        </div>
                      </div>

                      <button 
                        onClick={() => deleteTask(task.id)}
                        className="p-2 hover:bg-red-50 text-gray-400 hover:text-red-600 hover:border hover:border-black transition-all shrink-0"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* List of Prestigious Scholarships with dynamically matched status badges */}
            <div className="bg-white border-[3px] border-black p-8 space-y-6">
              <div className="space-y-2">
                <h2 className="text-2xl font-black text-black flex items-center gap-2">
                  <Award className="w-6 h-6 text-[#ff0000]" />
                  {s.scholarshipsTitle}
                </h2>
                <p className="text-sm font-bold text-gray-500 leading-normal uppercase">
                  {s.scholarshipsDesc}
                </p>
              </div>

              <div className="space-y-6 divide-y-2 divide-dashed divide-gray-200">
                {scholarships.map((sch, idx) => {
                  const meetsGPA = parseGPA >= sch.gpaReq
                  const meetsIELTS = profile.englishTest === 'None / Waiver' || parseScore >= sch.ieltsReq
                  const isEligible = meetsGPA && meetsIELTS
                  
                  return (
                    <div key={idx} className={`pt-6 first:pt-0 space-y-4`}>
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                        <div>
                          <h3 className="text-lg font-black text-black leading-snug">{sch.name}</h3>
                          <p className="text-xs font-bold text-gray-400 uppercase tracking-wide">{sch.provider}</p>
                        </div>

                        {profile.gpa && (
                          <div className={`text-[9px] font-black uppercase px-2 py-0.5 border-2 text-center w-fit shrink-0 ${
                            isEligible 
                              ? 'bg-green-600 text-white border-green-700' 
                              : 'bg-amber-100 text-amber-800 border-amber-300'
                          }`}>
                            {isEligible ? s.meetReqs : s.missReqs}
                          </div>
                        )}
                      </div>

                      <p className="text-xs font-bold text-gray-700 leading-relaxed bg-gray-50 p-3 border border-black">
                        {sch.benefits}
                      </p>

                      <div className="grid grid-cols-3 gap-2 text-[10px] font-black uppercase text-gray-500">
                        <div>
                          <span className="block text-gray-400 leading-none">{s.gpaRequired}</span>
                          <span className="text-black font-bold text-xs">{sch.gpaReq} out of 4.0</span>
                        </div>
                        <div>
                          <span className="block text-gray-400 leading-none">{s.ieltsRequired}</span>
                          <span className="text-black font-bold text-xs">IELTS {sch.ieltsReq}</span>
                        </div>
                        <div>
                          <span className="block text-gray-400 leading-none">{s.deadlineLabel}</span>
                          <span className="text-black font-bold text-xs">{sch.deadline}</span>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

          </div>

        </div>
        
      </div>

      <Footer />
    </main>
  )
}
