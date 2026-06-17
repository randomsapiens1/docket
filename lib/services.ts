export interface ServiceItem {
  name: string
  status: 'Live' | 'Soon'
  href: string
  keywords?: string[]
}

export interface ServiceCategory {
  title: string
  description: string
  items: ServiceItem[]
}

export const serviceCategories: Record<'en' | 'bn', ServiceCategory[]> = {
  en: [
    {
      title: "Business",
      description: "Register your company, file returns, stay compliant.",
      items: [
        { name: "Incorporate a private company", status: "Live", href: "/services/incorporate-a-private-company", keywords: ["company", "registration", "incorporation", "business", "rjsc"] },
        { name: "File annual returns", status: "Soon", href: "#", keywords: ["returns", "filing", "compliance", "annual"] },
        { name: "Change a director", status: "Soon", href: "#", keywords: ["director", "board", "change", "management"] },
      ]
    },
    {
      title: "Land & Property",
      description: "Transfer ownership, verify records, pay land tax.",
      items: [
        { name: "Land mutation (namjari)", status: "Live", href: "/services/land-mutation", keywords: ["land", "mutation", "namjari", "property", "transfer"] },
        { name: "Get a khatian", status: "Soon", href: "#", keywords: ["khatian", "porcha", "land", "records"] },
      ]
    },
    {
      title: "Identity",
      description: "NID, passport, birth and death certificates.",
      items: [
        { name: "Correct your NID", status: "Soon", href: "#", keywords: ["nid", "correction", "identity", "card"] },
        { name: "Apply for a passport", status: "Soon", href: "#", keywords: ["passport", "travel", "mrp", "e-passport"] },
      ]
    },
    {
      title: "Tax",
      description: "TIN, income tax, VAT.",
      items: [
        { name: "Register for TIN", status: "Live", href: "/services/register-for-tin", keywords: ["tin", "tax", "nbr", "registration"] },
      ]
    },
    {
      title: "Vehicles",
      description: "BRTA license, registration, fitness.",
      items: [
        { name: "Get a driving license", status: "Soon", href: "#", keywords: ["driving", "license", "brta", "car", "bike"] },
      ]
    },
    {
      title: "Travel",
      description: "Passport, police clearance, NOC.",
      items: [
        { name: "Apply for police clearance", status: "Soon", href: "#", keywords: ["police", "clearance", "pcc", "criminal", "record"] },
      ]
    }
  ],
  bn: [
    {
      title: "ব্যবসা",
      description: "আপনার কোম্পানি নিবন্ধন করুন, রিটার্ন জমা দিন, নিয়ম মেনে চলুন।",
      items: [
        { name: "প্রাইভেট কোম্পানি ইনকরপোরেশন", status: "Live", href: "/services/incorporate-a-private-company", keywords: ["কোম্পানি", "নিবন্ধন", "রেজিস্ট্রেশন", "ব্যবসা", "আরজেএসসি"] },
        { name: "বার্ষিক রিটার্ন দাখিল", status: "Soon", href: "#", keywords: ["রিটার্ন", "দাখিল", "কমপ্লায়েন্স", "বার্ষিক"] },
        { name: "পরিচালক পরিবর্তন", status: "Soon", href: "#", keywords: ["পরিচালক", "বোর্ড", "পরিবর্তন", "ব্যবস্থাপনা"] },
      ]
    },
    {
      title: "ভূমি ও সম্পত্তি",
      description: "মালিকানা পরিবর্তন করুন, রেকর্ড যাচাই করুন, ভূমি উন্নয়ন কর পরিশোধ করুন।",
      items: [
        { name: "নামজারি (মিউটেশন)", status: "Live", href: "/services/land-mutation", keywords: ["ভূমি", "নামজারি", "মিউটেশন", "সম্পত্তি", "স্থানান্তর"] },
        { name: "খতিয়ান সংগ্রহ", status: "Soon", href: "#", keywords: ["খতিয়ান", "পর্চা", "ভূমি", "রেকর্ড"] },
      ]
    },
    {
      title: "পরিচয়পত্র",
      description: "এনআইডি, পাসপোর্ট, জন্ম ও মৃত্যু নিবন্ধন।",
      items: [
        { name: "এনআইডি সংশোধন", status: "Soon", href: "#", keywords: ["এনআইডি", "সংশোধন", "পরিচয়পত্র", "কার্ড"] },
        { name: "পাসপোর্টের জন্য আবেদন", status: "Soon", href: "#", keywords: ["পাসপোর্ট", "ভ্রমণ", "এমআরপি", "ই-পাসপোর্ট"] },
      ]
    },
    {
      title: "কর",
      description: "টিন (TIN), আয়কর, ভ্যাট।",
      items: [
        { name: "টিন (TIN) রেজিস্ট্রেশন", status: "Live", href: "/services/register-for-tin", keywords: ["টিন", "কর", "এনবিআর", "নিবন্ধন"] },
      ]
    },
    {
      title: "যানবাহন",
      description: "বিআরটিএ লাইসেন্স, রেজিস্ট্রেশন, ফিটনেস।",
      items: [
        { name: "ড্রাইভিং লাইসেন্স সংগ্রহ", status: "Soon", href: "#", keywords: ["ড্রাইভিং", "লাইসেন্স", "বিআরটিএ", "গাড়ি", "বাইক"] },
      ]
    },
    {
      title: "ভ্রমণ",
      description: "পাসপোর্ট, পুলিশ ক্লিয়ারেন্স, এনওসি।",
      items: [
        { name: "পুলিশ ক্লিয়ারেন্সের জন্য আবেদন", status: "Soon", href: "#", keywords: ["পুলিশ", "ক্লিয়ারেন্স", "পিসিবি", "ক্রিমিনাল", "রেকর্ড"] },
      ]
    }
  ]
}
