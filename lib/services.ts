export interface SubItem {
  name: string
  status: 'Live' | 'Soon'
  href: string
}

export interface ServiceItem {
  name: string
  status: 'Live' | 'Soon'
  href: string
  keywords?: string[]
  subItems?: SubItem[]
}

export interface ServiceCategory {
  title: string
  description: string
  items: ServiceItem[]
}

export const serviceCategories: Record<'en' | 'bn', ServiceCategory[]> = {
  en: [
    {
      title: "Identity & Personal Documents",
      description: "Everything related to proving who you are.",
      items: [
        { name: "Birth Certificate", status: "Soon", href: "#", keywords: ["birth", "certificate", "nothi"] },
        { name: "National ID (NID)", status: "Soon", href: "#", keywords: ["nid", "national id", "identity", "card", "voter"] },
        { name: "Passport", status: "Soon", href: "#", keywords: ["passport", "travel", "e-passport", "mrp"] },
        { name: "Death Certificate", status: "Soon", href: "#", keywords: ["death", "certificate", "mrityu"] },
        { name: "Marriage Registration", status: "Soon", href: "#", keywords: ["marriage", "registration", "kabin", "bibaho"] },
        { name: "Police Clearance Certificate", status: "Soon", href: "#", keywords: ["police", "clearance", "pcc", "criminal", "record"] }
      ]
    },
    {
      title: "Family & Life Events",
      description: "Services triggered by major life events.",
      items: [
        {
          name: "Birth of a Child",
          status: "Soon",
          href: "#",
          keywords: ["birth", "child", "school", "passport", "registration"],
          subItems: [
            { name: "Birth registration", status: "Soon", href: "#" },
            { name: "Child passport", status: "Soon", href: "#" },
            { name: "School admission documents", status: "Soon", href: "#" }
          ]
        },
        {
          name: "Marriage",
          status: "Soon",
          href: "#",
          keywords: ["marriage", "registration", "name change", "spouse", "visa"],
          subItems: [
            { name: "Marriage registration", status: "Soon", href: "#" },
            { name: "Name change", status: "Soon", href: "#" },
            { name: "Spouse visa documents", status: "Soon", href: "#" }
          ]
        },
        {
          name: "Death",
          status: "Soon",
          href: "#",
          keywords: ["death", "registration", "inheritance", "succession", "warisan"],
          subItems: [
            { name: "Death registration", status: "Soon", href: "#" },
            { name: "Inheritance documents", status: "Soon", href: "#" }
          ]
        }
      ]
    },
    {
      title: "Business & Entrepreneurship",
      description: "Starting, running, and growing a business.",
      items: [
        {
          name: "Start a Business",
          status: "Live",
          href: "#",
          keywords: ["company", "incorporation", "sole proprietorship", "partnership", "private limited", "opc", "rjsc"],
          subItems: [
            { name: "Sole Proprietorship", status: "Soon", href: "#" },
            { name: "Partnership", status: "Soon", href: "#" },
            { name: "Private Limited Company", status: "Live", href: "/services/incorporate-a-private-company" },
            { name: "One Person Company (OPC)", status: "Soon", href: "#" }
          ]
        },
        {
          name: "Licenses & Registration",
          status: "Live",
          href: "#",
          keywords: ["trade license", "tin", "bin", "vat", "irc", "erc", "environmental", "clearance"],
          subItems: [
            { name: "Trade License", status: "Soon", href: "#" },
            { name: "TIN", status: "Live", href: "/services/register-for-tin" },
            { name: "BIN/VAT", status: "Soon", href: "#" },
            { name: "IRC/ERC", status: "Soon", href: "#" },
            { name: "Environmental Clearance", status: "Soon", href: "#" }
          ]
        },
        {
          name: "Compliance",
          status: "Soon",
          href: "#",
          keywords: ["income tax", "vat return", "annual return", "rjsc filings"],
          subItems: [
            { name: "Income Tax Return", status: "Soon", href: "#" },
            { name: "VAT Return", status: "Soon", href: "#" },
            { name: "Annual Returns", status: "Soon", href: "#" },
            { name: "RJSC Filings", status: "Soon", href: "#" }
          ]
        },
        {
          name: "Protect Your Business",
          status: "Soon",
          href: "#",
          keywords: ["trademark", "copyright", "patent", "ip", "brand"],
          subItems: [
            { name: "Trademark Registration", status: "Soon", href: "#" },
            { name: "Copyright Registration", status: "Soon", href: "#" },
            { name: "Patent Registration", status: "Soon", href: "#" }
          ]
        }
      ]
    },
    {
      title: "Employment & Career",
      description: "Services related to work.",
      items: [
        { name: "Taxpayer Identification Number (TIN)", status: "Live", href: "/services/register-for-tin", keywords: ["tin", "taxpayer", "work", "employment"] },
        { name: "Police Clearance", status: "Soon", href: "#", keywords: ["police", "clearance", "pcc", "job"] },
        { name: "Professional Certifications", status: "Soon", href: "#", keywords: ["certification", "professional", "license"] },
        { name: "Work Permits", status: "Soon", href: "#", keywords: ["work permit", "foreigner", "employment"] },
        { name: "Labor Rights", status: "Soon", href: "#", keywords: ["labor", "rights", "workplace", "dispute"] },
        { name: "Pension Services", status: "Soon", href: "#", keywords: ["pension", "retirement", "gratuity"] }
      ]
    },
    {
      title: "Property & Land",
      description: "Everything related to land and property.",
      items: [
        { name: "Land Record Search", status: "Soon", href: "#", keywords: ["land", "record", "search", "khatian", "porcha"] },
        { name: "Mutation", status: "Live", href: "/services/land-mutation", keywords: ["mutation", "namjari", "land", "property", "transfer"] },
        { name: "Khatian", status: "Soon", href: "#", keywords: ["khatian", "porcha", "land", "records"] },
        { name: "Mouza Map", status: "Soon", href: "#", keywords: ["mouza", "map", "land", "survey"] },
        { name: "Registration of Property", status: "Soon", href: "#", keywords: ["registration", "property", "purchase", "sale", "deed"] },
        { name: "Property Tax", status: "Soon", href: "#", keywords: ["property", "tax", "land development tax", "khajna"] }
      ]
    },
    {
      title: "Vehicles & Transportation",
      description: "Licenses, registration, fitness, and permits.",
      items: [
        { name: "Driving License", status: "Soon", href: "#", keywords: ["driving", "license", "brta", "car", "bike"] },
        { name: "Learner License", status: "Soon", href: "#", keywords: ["learner", "license", "driving", "brta"] },
        { name: "Vehicle Registration", status: "Soon", href: "#", keywords: ["vehicle", "registration", "brta", "car", "bike"] },
        { name: "Fitness Certificate", status: "Soon", href: "#", keywords: ["fitness", "certificate", "brta", "vehicle"] },
        { name: "Route Permit", status: "Soon", href: "#", keywords: ["route", "permit", "brta", "bus", "truck"] },
        { name: "Ownership Transfer", status: "Soon", href: "#", keywords: ["ownership", "transfer", "brta", "vehicle", "car"] }
      ]
    },
    {
      title: "Taxes & Finance",
      description: "TIN, returns, VAT, and payments.",
      items: [
        { name: "TIN Registration", status: "Live", href: "/services/register-for-tin", keywords: ["tin", "taxpayer", "registration", "nbr"] },
        { name: "Income Tax Return", status: "Soon", href: "#", keywords: ["income tax", "return", "filing"] },
        { name: "VAT Registration", status: "Soon", href: "#", keywords: ["vat", "registration", "bin"] },
        { name: "Tax Payment", status: "Soon", href: "#", keywords: ["tax", "payment", "online"] },
        { name: "Treasury Challan", status: "Soon", href: "#", keywords: ["treasury", "challan", "bank"] },
        { name: "e-Challan", status: "Soon", href: "#", keywords: ["e-challan", "challan", "online"] }
      ]
    },
    {
      title: "Education",
      description: "Board certificates, corrections, and equivalences.",
      items: [
        { name: "Board Certificates", status: "Soon", href: "#", keywords: ["board", "certificate", "ssc", "hsc"] },
        { name: "Certificate Correction", status: "Soon", href: "#", keywords: ["correction", "certificate", "name", "age"] },
        { name: "Scholarship & Visa Portal", status: "Live", href: "/services/scholarship-and-visa", keywords: ["scholarship", "visa", "study abroad", "student visa", "documents", "data", "store"] },
        { name: "Student Verification", status: "Soon", href: "#", keywords: ["student", "verification", "university", "college"] },
        { name: "Educational Equivalence", status: "Soon", href: "#", keywords: ["educational", "equivalence", "foreign", "degree"] }
      ]
    },
    {
      title: "Immigration & Travel",
      description: "Passport, visa, and expat services.",
      items: [
        { name: "Passport", status: "Soon", href: "#", keywords: ["passport", "travel", "e-passport"] },
        { name: "Visa Information", status: "Soon", href: "#", keywords: ["visa", "information", "travel"] },
        { name: "Immigration Clearance", status: "Soon", href: "#", keywords: ["immigration", "clearance", "bmet", "card"] },
        { name: "Expatriate Services", status: "Soon", href: "#", keywords: ["expatriate", "probashi", "welfare"] }
      ]
    },
    {
      title: "Housing & Utilities",
      description: "Utility connections and holding tax.",
      items: [
        { name: "Electricity Connection", status: "Soon", href: "#", keywords: ["electricity", "power", "connection", "desco", "dpdc", "wzpdco"] },
        { name: "Gas Connection", status: "Soon", href: "#", keywords: ["gas", "titas", "connection"] },
        { name: "Water Connection", status: "Soon", href: "#", keywords: ["water", "sewerage", "wasa", "connection"] },
        { name: "Internet Service Permissions", status: "Soon", href: "#", keywords: ["internet", "isp", "connection", "permission"] },
        { name: "Holding Tax", status: "Live", href: "/services/holding-tax", keywords: ["holding tax", "tax", "municipality", "city corporation", "sweb"] }
      ]
    }
  ],
  bn: [
    {
      title: "পরিচয় ও ব্যক্তিগত নথিপত্র",
      description: "এনআইডি, পাসপোর্ট, জন্ম ও মৃত্যু সনদ এবং অন্যান্য ব্যক্তিগত নথিপত্র।",
      items: [
        { name: "জন্ম সনদ", status: "Soon", href: "#", keywords: ["জন্ম", "সনদ", "নিবন্ধন"] },
        { name: "জাতীয় পরিচয়পত্র (NID)", status: "Soon", href: "#", keywords: ["এনআইডি", "জাতীয় পরিচয়পত্র", "কার্ড", "ভোটার"] },
        { name: "পাসপোর্ট", status: "Soon", href: "#", keywords: ["পাসপোর্ট", "ভ্রমণ", "ই-পাসপোর্ট"] },
        { name: "মৃত্যু সনদ", status: "Soon", href: "#", keywords: ["মৃত্যু", "সনদ", "মৃত্যু নিবন্ধন"] },
        { name: "বিবাহ নিবন্ধন", status: "Soon", href: "#", keywords: ["বিবাহ", "নিবন্ধন", "কাবিন", "বিয়ে"] },
        { name: "পুলিশ ক্লিয়ারেন্স সনদ", status: "Soon", href: "#", keywords: ["পুলিশ", "ক্লিয়ারেন্স", "পিচিবি", "পিসিবি"] }
      ]
    },
    {
      title: "পরিবার ও জীবনভিত্তিক সেবাসমূহ",
      description: "জন্ম, বিয়ে, মৃত্যু এবং অন্যান্য পারিবারিক ঘটনা সংক্রান্ত সেবা।",
      items: [
        {
          name: "সন্তানের জন্ম",
          status: "Soon",
          href: "#",
          keywords: ["জন্ম", "সন্তান", "স্কুল", "ভর্তি", "পাসপোর্ট", "নিবন্ধন"],
          subItems: [
            { name: "জন্ম নিবন্ধন", status: "Soon", href: "#" },
            { name: "শিশুর পাসপোর্ট", status: "Soon", href: "#" },
            { name: "স্কুলে ভর্তির নথিপত্র", status: "Soon", href: "#" }
          ]
        },
        {
          name: "বিবাহ",
          status: "Soon",
          href: "#",
          keywords: ["বিবাহ", "নিবন্ধন", "নাম পরিবর্তন", "স্পাউস", "ভিসা"],
          subItems: [
            { name: "বিবাহ নিবন্ধন", status: "Soon", href: "#" },
            { name: "নাম পরিবর্তন", status: "Soon", href: "#" },
            { name: "স্পাউস ভিসা নথিপত্র", status: "Soon", href: "#" }
          ]
        },
        {
          name: "মৃত্যু",
          status: "Soon",
          href: "#",
          keywords: ["মৃত্যু", "নিবন্ধন", "উত্তরাধিকার", "ওয়ারিশ সনদ"],
          subItems: [
            { name: "মৃত্যু নিবন্ধন", status: "Soon", href: "#" },
            { name: "উত্তরাধিকার সংক্রান্ত নথিপত্র", status: "Soon", href: "#" }
          ]
        }
      ]
    },
    {
      title: "ব্যবসা ও উদ্যোক্তা",
      description: "কোম্পানি নিবন্ধন, লাইসেন্স, কমপ্লায়েন্স এবং ব্যবসা পরিচালনা।",
      items: [
        {
          name: "ব্যবসা শুরু",
          status: "Live",
          href: "#",
          keywords: ["কোম্পানি", "নিবন্ধন", "একক মালিকানা", "অংশীদারী", "লিমিটেড কোম্পানি", "ওপিসি"],
          subItems: [
            { name: "একক মালিকানা ব্যবসা", status: "Soon", href: "#" },
            { name: "অংশীদারি ব্যবসা", status: "Soon", href: "#" },
            { name: "প্রাইভেট লিমিটেড কোম্পানি", status: "Live", href: "/services/incorporate-a-private-company" },
            { name: "এক ব্যক্তি কোম্পানি (OPC)", status: "Soon", href: "#" }
          ]
        },
        {
          name: "লাইসেন্স ও নিবন্ধন",
          status: "Live",
          href: "#",
          keywords: ["ট্রেড লাইসেন্স", "টিন", "বিন", "ভ্যাট", "আইআরসি", "ইআরসি", "পরিবেশগত ছাড়পত্র"],
          subItems: [
            { name: "ট্রেড লাইসেন্স", status: "Soon", href: "#" },
            { name: "টিন (TIN)", status: "Live", href: "/services/register-for-tin" },
            { name: "বিন/ভ্যাট (BIN/VAT)", status: "Soon", href: "#" },
            { name: "আমদানি/রপ্তানি সনদ (IRC/ERC)", status: "Soon", href: "#" },
            { name: "পরিবেশগত ছাড়পত্র", status: "Soon", href: "#" }
          ]
        },
        {
          name: "কমপ্লায়েন্স ও কর রিটার্ন",
          status: "Soon",
          href: "#",
          keywords: ["আয়কর রিটার্ন", "ভ্যাট রিটার্ন", "বার্ষিক রিটার্ন", "আরজেএসসি রিটার্ন"],
          subItems: [
            { name: "আয়কর রিটার্ন", status: "Soon", href: "#" },
            { name: "ভ্যাট রিটার্ন", status: "Soon", href: "#" },
            { name: "বার্ষিক রিটার্ন", status: "Soon", href: "#" },
            { name: "আরজেএসসি রিটার্ন দাখিল (RJSC Filings)", status: "Soon", href: "#" }
          ]
        },
        {
          name: "ব্যবসা সুরক্ষা",
          status: "Soon",
          href: "#",
          keywords: ["ট্রেডমার্ক", "কপিরাইট", "পেটেন্ট", "আইপি"],
          subItems: [
            { name: "ট্রেডমার্ক নিবন্ধন", status: "Soon", href: "#" },
            { name: "কপিরাইট নিবন্ধন", status: "Soon", href: "#" },
            { name: "পেটেন্ট নিবন্ধন", status: "Soon", href: "#" }
          ]
        }
      ]
    },
    {
      title: "কর্মসংস্থান ও ক্যারিয়ার",
      description: "টিন (TIN), পুলিশ ক্লিয়ারেন্স, কাজের অনুমতি এবং কর্মসংস্থান সেবা।",
      items: [
        { name: "ট্যাক্সপেয়ার আইডেন্টিফিকেশন নম্বর (TIN)", status: "Live", href: "/services/register-for-tin", keywords: ["টিন", "করদাতা", "নিবন্ধন", "কর্মসংস্থান"] },
        { name: "পুলিশ ক্লিয়ারেন্স", status: "Soon", href: "#", keywords: ["পুলিশ", "ক্লিয়ারেন্স", "চাকরি"] },
        { name: "পেশাগত সার্টিফিকেশন", status: "Soon", href: "#", keywords: ["শংসাপত্র", "পেশাগত", "সার্টিফিকেশন"] },
        { name: "কাজের অনুমতি (Work Permit)", status: "Soon", href: "#", keywords: ["কাজের অনুমতি", "ওয়ার্ক পারমিট", "বিদেশী"] },
        { name: "শ্রম অধিকার", status: "Soon", href: "#", keywords: ["শ্রম", "অধিকার", "আইন"] },
        { name: "পেনশন সেবা", status: "Soon", href: "#", keywords: ["পেনশন", "অবসর"] }
      ]
    },
    {
      title: "সম্পত্তি ও ভূমি",
      description: "নামজারি, খতিয়ান, খাজনা এবং জমি সংক্রান্ত অন্যান্য সেবা।",
      items: [
        { name: "ভূমি রেকর্ড অনুসন্ধান", status: "Soon", href: "#", keywords: ["ভূমি", "রেকর্ড", "অনুসন্ধান", "খতিয়ান"] },
        { name: "নামজারি (মিউটেশন)", status: "Live", href: "/services/land-mutation", keywords: ["নামজারি", "মিউটেশন", "ভূমি", "সম্পত্তি", "হস্তান্তর"] },
        { name: "খতিয়ান", status: "Soon", href: "#", keywords: ["খতিয়ান", "পর্চা", "রেকর্ড"] },
        { name: "মৌজা ম্যাপ", status: "Soon", href: "#", keywords: ["মৌজা", "ম্যাপ", "নকশা"] },
        { name: "সম্পত্তি নিবন্ধন", status: "Soon", href: "#", keywords: ["দলিল", "নিবন্ধন", "ক্রয়", "বিক্রয়"] },
        { name: "সম্পত্তি কর", status: "Soon", href: "#", keywords: ["খাজনা", "ভূমি কর", "উন্নয়ন কর"] }
      ]
    },
    {
      title: "যানবাহন ও পরিবহন",
      description: "ড্রাইভিং লাইসেন্স, ফিটনেস সনদ এবং মালিকানা পরিবর্তন।",
      items: [
        { name: "ড্রাইভিং লাইসেন্স", status: "Soon", href: "#", keywords: ["ড্রাইভিং", "লাইসেন্স", "বিআরটিএ", "গাড়ি", "বাইক"] },
        { name: "লার্নার লাইসেন্স", status: "Soon", href: "#", keywords: ["শিক্ষানবিস", "লার্নার", "লাইসেন্স", "ড্রাইভিং"] },
        { name: "যানবাহন নিবন্ধন", status: "Soon", href: "#", keywords: ["গাড়ি", "মোটরসাইকেল", "নিবন্ধন", "বিআরটিএ"] },
        { name: "ফিটনেস সার্টিফিকেট", status: "Soon", href: "#", keywords: ["ফিটনেস", "সার্টিফিকেট", "যানবাহন", "বিআরটিএ"] },
        { name: "রুট পারমিট", status: "Soon", href: "#", keywords: ["রুট", "পারমিট", "বাস", "ট্রাক", "বিআরটিএ"] },
        { name: "মালিকানা হস্তান্তর", status: "Soon", href: "#", keywords: ["মালিকানা", "হস্তান্তর", "গাড়ি", "বিআরটিএ"] }
      ]
    },
    {
      title: "কর ও অর্থসংস্থান",
      description: "টিন রেজিস্ট্রেশন, ভ্যাট, আয়কর রিটার্ন এবং সরকারি চালান পরিশোধ।",
      items: [
        { name: "টিন (TIN) রেজিস্ট্রেশন", status: "Live", href: "/services/register-for-tin", keywords: ["টিন", "করদাতা", "নিবন্ধন", "এনবিআর"] },
        { name: "আয়কর রিটার্ন দাখিল", status: "Soon", href: "#", keywords: ["আয়কর", "রিটার্ন", "দাখিল"] },
        { name: "ভ্যাট (VAT) নিবন্ধন", status: "Soon", href: "#", keywords: ["ভ্যাট", "বিন", "নিবন্ধন"] },
        { name: "কর পরিশোধ", status: "Soon", href: "#", keywords: ["কর", "পরিশোধ", "অনলাইন"] },
        { name: "ট্রেজারি চালান", status: "Soon", href: "#", keywords: ["চালান", "ট্রেজারি", "ব্যাংক"] },
        { name: "ই-চালান (e-Challan)", status: "Soon", href: "#", keywords: ["ই-চালান", "চালান", "অনলাইন"] }
      ]
    },
    {
      title: "শিক্ষা",
      description: "বোর্ড সার্টিফিকেট, সনদ সংশোধন এবং শিক্ষা সংক্রান্ত অন্যান্য সেবা।",
      items: [
        { name: "বোর্ড সার্টিফিকেট", status: "Soon", href: "#", keywords: ["বোর্ড", "সার্টিফিকেট", "এসএসসি", "এইচএসসি"] },
        { name: "সনদ সংশোধন", status: "Soon", href: "#", keywords: ["সংশোধন", "নাম", "বয়স", "সনদ"] },
        { name: "স্কলারশিপ ও ভিসা পোর্টাল", status: "Live", href: "/services/scholarship-and-visa", keywords: ["বৃত্তি", "স্কলারশিপ", "স্টাইপেন্ড", "ভিসা", "উচ্চশিক্ষা"] },
        { name: "শিক্ষার্থী যাচাইকরণ", status: "Soon", href: "#", keywords: ["শিক্ষার্থী", "যাচাই", "বিশ্ববিদ্যালয়"] },
        { name: "শিক্ষাগত সমমান সনদ (Equivalence)", status: "Soon", href: "#", keywords: ["সমমান", "ইকুইভ্যালেন্স", "বিদেশী ডিগ্রি"] }
      ]
    },
    {
      title: "ইমিগ্রেশন ও ভ্রমণ",
      description: "পাসপোর্ট, ভিসা, ইমিগ্রেশন ক্লিয়ারেন্স এবং প্রবাসী সেবা।",
      items: [
        { name: "পাসপোর্ট", status: "Soon", href: "#", keywords: ["পাসপোর্ট", "ভ্রমণ", "ই-পাসপোর্ট"] },
        { name: "ভিসা সংক্রান্ত তথ্য", status: "Soon", href: "#", keywords: ["ভিসা", "তথ্য", "ভ্রমণ"] },
        { name: "ইমিগ্রেশন ক্লিয়ারেন্স", status: "Soon", href: "#", keywords: ["ইমিগ্রেশন", "ক্লিয়ারেন্স", "বিএমইটি"] },
        { name: "প্রবাসী কল্যাণ সেবা", status: "Soon", href: "#", keywords: ["প্রবাসী", "কল্যাণ", "প্রবাস"] }
      ]
    },
    {
      title: "আবাসন ও ইউটিলিটি",
      description: "বিদ্যুৎ, গ্যাস, পানি সংযোগ এবং হোল্ডিং ট্যাক্স সেবা।",
      items: [
        { name: "বিদ্যুৎ সংযোগ", status: "Soon", href: "#", keywords: ["বিদ্যুৎ", "সংযোগ", "ডেসকো", "ডিপিডিসি"] },
        { name: "গ্যাস সংযোগ", status: "Soon", href: "#", keywords: ["গ্যাস", "তিতাস", "সংযোগ"] },
        { name: "পানি সংযোগ", status: "Soon", href: "#", keywords: ["পানি", "ওয়াসা", "সংযোগ"] },
        { name: "ইন্টারনেট সেবা অনুমতি", status: "Soon", href: "#", keywords: ["ইন্টারনেট", "অনুমতি", "সংযোগ"] },
        { name: "হোল্ডিং ট্যাক্স", status: "Live", href: "/services/holding-tax", keywords: ["হোল্ডিং ট্যাক্স", "ট্যাক্স", "কর", "পৌরসভা", "সিটি কর্পোরেশন"] }
      ]
    }
  ]
}
