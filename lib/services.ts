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
      title: "Business",
      description: "Register your company, file returns, stay compliant.",
      items: [
        {
          name: "Company Registration",
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
          name: "Trade License",
          status: "Soon",
          href: "#",
          keywords: ["trade", "license", "renewal", "address", "transfer"],
          subItems: [
            { name: "New application", status: "Soon", href: "#" },
            { name: "Renewal", status: "Soon", href: "#" },
            { name: "Change of address", status: "Soon", href: "#" },
            { name: "Ownership transfer", status: "Soon", href: "#" }
          ]
        },
        {
          name: "TIN Registration",
          status: "Live",
          href: "/services/register-for-tin",
          keywords: ["tin", "tax", "individual", "business"],
          subItems: [
            { name: "Individual TIN", status: "Live", href: "/services/register-for-tin" },
            { name: "Business TIN", status: "Soon", href: "#" },
            { name: "Tax obligations", status: "Soon", href: "#" }
          ]
        },
        {
          name: "VAT/BIN Registration",
          status: "Soon",
          href: "#",
          keywords: ["vat", "bin", "compliance"],
          subItems: [
            { name: "When you need VAT", status: "Soon", href: "#" },
            { name: "Registration process", status: "Soon", href: "#" },
            { name: "Compliance requirements", status: "Soon", href: "#" }
          ]
        },
        {
          name: "Import Export Certificate (IRC/ERC)",
          status: "Soon",
          href: "#",
          keywords: ["irc", "erc", "import", "export", "license"],
          subItems: [
            { name: "Eligibility", status: "Soon", href: "#" },
            { name: "Required documents", status: "Soon", href: "#" },
            { name: "Renewal process", status: "Soon", href: "#" }
          ]
        },
        {
          name: "Income Tax Filing",
          status: "Soon",
          href: "#",
          keywords: ["income tax", "filing", "return"],
          subItems: [
            { name: "Annual return", status: "Soon", href: "#" },
            { name: "Required records", status: "Soon", href: "#" },
            { name: "Common mistakes", status: "Soon", href: "#" }
          ]
        },
        {
          name: "Trademark Registration",
          status: "Soon",
          href: "#",
          keywords: ["trademark", "patent", "ip", "brand"],
          subItems: [
            { name: "Trademark search", status: "Soon", href: "#" },
            { name: "Application", status: "Soon", href: "#" },
            { name: "Opposition period", status: "Soon", href: "#" },
            { name: "Renewal", status: "Soon", href: "#" }
          ]
        },
        {
          name: "Bank Account for Business",
          status: "Soon",
          href: "#",
          keywords: ["bank", "corporate bank account", "documents"],
          subItems: [
            { name: "Required documents", status: "Soon", href: "#" },
            { name: "Different bank requirements", status: "Soon", href: "#" },
            { name: "Sole proprietorship vs company", status: "Soon", href: "#" }
          ]
        },
        {
          name: "RJSC Post-Incorporation Compliance",
          status: "Soon",
          href: "#",
          keywords: ["post incorporation", "compliance", "rjsc", "director", "share"],
          subItems: [
            { name: "Share allocation", status: "Soon", href: "#" },
            { name: "Director changes", status: "Soon", href: "#" },
            { name: "Annual returns", status: "Soon", href: "#" },
            { name: "Company updates", status: "Soon", href: "#" }
          ]
        },
        {
          name: "e-Commerce Business Compliance",
          status: "Soon",
          href: "#",
          keywords: ["ecommerce", "online shop", "gateway", "consumer protection"],
          subItems: [
            { name: "Trade license", status: "Soon", href: "#" },
            { name: "VAT requirements", status: "Soon", href: "#" },
            { name: "Consumer protection rules", status: "Soon", href: "#" },
            { name: "Payment gateway requirements", status: "Soon", href: "#" }
          ]
        }
      ]
    },
    {
      title: "Land & Property",
      description: "Transfer ownership, verify records, pay land tax.",
      items: [
        { name: "Land mutation (namjari)", status: "Live", href: "/services/land-mutation", keywords: ["land", "mutation", "namjari", "property", "transfer"] },
        { name: "Get a khatian", status: "Soon", href: "#", keywords: ["khatian", "porcha", "land", "records"] }
      ]
    },
    {
      title: "Identity",
      description: "NID, passport, birth and death certificates.",
      items: [
        { name: "Correct your NID", status: "Soon", href: "#", keywords: ["nid", "correction", "identity", "card"] },
        { name: "Apply for a passport", status: "Soon", href: "#", keywords: ["passport", "travel", "mrp", "e-passport"] }
      ]
    },
    {
      title: "Tax",
      description: "TIN, income tax, VAT.",
      items: [
        { name: "Register for TIN", status: "Live", href: "/services/register-for-tin", keywords: ["tin", "tax", "nbr", "registration"] }
      ]
    },
    {
      title: "Vehicles",
      description: "BRTA license, registration, fitness.",
      items: [
        { name: "Get a driving license", status: "Soon", href: "#", keywords: ["driving", "license", "brta", "car", "bike"] }
      ]
    },
    {
      title: "Travel",
      description: "Passport, police clearance, NOC.",
      items: [
        { name: "Apply for police clearance", status: "Soon", href: "#", keywords: ["police", "clearance", "pcc", "criminal", "record"] }
      ]
    }
  ],
  bn: [
    {
      title: "ব্যবসা",
      description: "আপনার কোম্পানি নিবন্ধন করুন, রিটার্ন জমা দিন, নিয়ম মেনে চলুন।",
      items: [
        {
          name: "কোম্পানি নিবন্ধন",
          status: "Live",
          href: "#",
          keywords: ["কোম্পানি", "নিবন্ধন", "একক মালিকানা", "লিমিটেড কোম্পানি", "ওপিসি"],
          subItems: [
            { name: "একক মালিকানা", status: "Soon", href: "#" },
            { name: "অংশীদারী কারবার", status: "Soon", href: "#" },
            { name: "প্রাইভেট লিমিটেড কোম্পানি", status: "Live", href: "/services/incorporate-a-private-company" },
            { name: "এক ব্যক্তি কোম্পানি (OPC)", status: "Soon", href: "#" }
          ]
        },
        {
          name: "ট্রেড লাইসেন্স",
          status: "Soon",
          href: "#",
          keywords: ["ট্রেড", "লাইসেন্স", "নবায়ন", "ঠিকানা", "হস্তান্তর"],
          subItems: [
            { name: "নতুন আবেদন", status: "Soon", href: "#" },
            { name: "নবায়ন", status: "Soon", href: "#" },
            { name: "ঠিকানা পরিবর্তন", status: "Soon", href: "#" },
            { name: "মালিকানা হস্তান্তর", status: "Soon", href: "#" }
          ]
        },
        {
          name: "টিন (TIN) রেজিস্ট্রেশন",
          status: "Live",
          href: "/services/register-for-tin",
          keywords: ["টিন", "কর", "এনবিআর", "নিবন্ধন"],
          subItems: [
            { name: "ব্যক্তিগত টিন", status: "Live", href: "/services/register-for-tin" },
            { name: "কোম্পানি/উদ্যোক্তা টিন", status: "Soon", href: "#" },
            { name: "করের বাধ্যবাধকতা", status: "Soon", href: "#" }
          ]
        },
        {
          name: "ভ্যাট/বিন (VAT/BIN) নিবন্ধন",
          status: "Soon",
          href: "#",
          keywords: ["ভ্যাট", "বিন", "কমপ্লায়েন্স"],
          subItems: [
            { name: "কখন ভ্যাট প্রয়োজন", status: "Soon", href: "#" },
            { name: "নিবন্ধন প্রক্রিয়া", status: "Soon", href: "#" },
            { name: "কমপ্লায়েন্সের বাধ্যবাধকতা", status: "Soon", href: "#" }
          ]
        },
        {
          name: "আমদানি রপ্তানি সনদ (IRC/ERC)",
          status: "Soon",
          href: "#",
          keywords: ["আইআরসি", "ইআরসি", "আমদানি", "রপ্তানি", "লাইসেন্স"],
          subItems: [
            { name: "যোগ্যতা", status: "Soon", href: "#" },
            { name: "প্রয়োজনীয় কাগজপত্র", status: "Soon", href: "#" },
            { name: "নবায়ন প্রক্রিয়া", status: "Soon", href: "#" }
          ]
        },
        {
          name: "আয়কর রিটার্ন দাখিল",
          status: "Soon",
          href: "#",
          keywords: ["আয়কর", "রিটার্ন", "দাখিল"],
          subItems: [
            { name: "বার্ষিক রিটার্ন", status: "Soon", href: "#" },
            { name: "প্রয়োজনীয় নথিপত্র", status: "Soon", href: "#" },
            { name: "সাধারণ ভুলসমূহ", status: "Soon", href: "#" }
          ]
        },
        {
          name: "ট্রেডমার্ক নিবন্ধন",
          status: "Soon",
          href: "#",
          keywords: ["ট্রেডমার্ক", "পেটেন্ট", "ব্র্যান্ড"],
          subItems: [
            { name: "ট্রেডমার্ক অনুসন্ধান", status: "Soon", href: "#" },
            { name: "আবেদন", status: "Soon", href: "#" },
            { name: "আপত্তি দাখিল", status: "Soon", href: "#" },
            { name: "নবায়ন", status: "Soon", href: "#" }
          ]
        },
        {
          name: "ব্যবসায়িক ব্যাংক অ্যাকাউন্ট",
          status: "Soon",
          href: "#",
          keywords: ["ব্যাংক", "কর্পোরেট অ্যাকাউন্ট", "কাগজপত্র"],
          subItems: [
            { name: "প্রয়োজনীয় নথিপত্র", status: "Soon", href: "#" },
            { name: "বিভিন্ন ব্যাংকের প্রয়োজনীয়তা", status: "Soon", href: "#" },
            { name: "একক মালিকানা বনাম লিমিটেড কোম্পানি", status: "Soon", href: "#" }
          ]
        },
        {
          name: "আরজেএসসি পোস্ট-ইনকরপোরেশন কমপ্লায়েন্স",
          status: "Soon",
          href: "#",
          keywords: ["আরজেএসসি", "কমপ্লায়েন্স", "পরিচালক", "শেয়ার"],
          subItems: [
            { name: "শেয়ার বরাদ্দকরণ", status: "Soon", href: "#" },
            { name: "পরিচালক পরিবর্তন", status: "Soon", href: "#" },
            { name: "বার্ষিক রিটার্ন দাখিল", status: "Soon", href: "#" },
            { name: "কোম্পানির তথ্য আপডেট", status: "Soon", href: "#" }
          ]
        },
        {
          name: "ই-কমার্স ব্যবসা কমপ্লায়েন্স",
          status: "Soon",
          href: "#",
          keywords: ["ইকমার্স", "অনলাইন শপ", "গেটওয়ে", "ভোক্তা অধিকার"],
          subItems: [
            { name: "ট্রেড লাইসেন্স", status: "Soon", href: "#" },
            { name: "ভ্যাট সংক্রান্ত নিয়মাবলী", status: "Soon", href: "#" },
            { name: "ভোক্তা অধিকার সংরক্ষণ নিয়ম", status: "Soon", href: "#" },
            { name: "পেমেন্ট গেটওয়ে সেটআপ নিয়ম", status: "Soon", href: "#" }
          ]
        }
      ]
    },
    {
      title: "ভূমি ও সম্পত্তি",
      description: "মালিকানা পরিবর্তন করুন, রেকর্ড যাচাই করুন, ভূমি উন্নয়ন কর পরিশোধ করুন।",
      items: [
        { name: "নামজারি (মিউটেশন)", status: "Live", href: "/services/land-mutation", keywords: ["ভূমি", "নামজারি", "মিউটেশন", "সম্পত্তি", "স্থানান্তর"] },
        { name: "খতিয়ান সংগ্রহ", status: "Soon", href: "#", keywords: ["খতিয়ান", "পর্চা", "ভূমি", "রেকর্ড"] }
      ]
    },
    {
      title: "পরিচয়পত্র",
      description: "এনআইডি, পাসপোর্ট, জন্ম ও মৃত্যু নিবন্ধন।",
      items: [
        { name: "এনআইডি সংশোধন", status: "Soon", href: "#", keywords: ["এনআইডি", "সংশোধন", "পরিচয়পত্র", "কার্ড"] },
        { name: "পাসপোর্টের জন্য আবেদন", status: "Soon", href: "#", keywords: ["পাসপোর্ট", "ভ্রমণ", "এমআরপি", "ই-পাসপোর্ট"] }
      ]
    },
    {
      title: "কর",
      description: "টিন (TIN), আয়কর, ভ্যাট।",
      items: [
        { name: "টিন (TIN) রেজিস্ট্রেশন", status: "Live", href: "/services/register-for-tin", keywords: ["টিন", "কর", "এনবিআর", "নিবন্ধন"] }
      ]
    },
    {
      title: "যানবাহন",
      description: "বিআরটিএ লাইসেন্স, রেজিস্ট্রেশন, fitness।",
      items: [
        { name: "ড্রাইভিং লাইসেন্স সংগ্রহ", status: "Soon", href: "#", keywords: ["ড্রাইভিং", "লাইসেন্স", "বিআরটিএ", "গাড়ি", "বাইক"] }
      ]
    },
    {
      title: "ভ্রমণ",
      description: "পাসপোর্ট, পুলিশ ক্লিয়ারেন্স, এনওসি।",
      items: [
        { name: "পুলিশ ক্লিয়ারেন্সের জন্য আবেদন", status: "Soon", href: "#", keywords: ["পুলিশ", "ক্লিয়ারেন্স", "পিসিবি", "ক্রিমিনাল", "রেকর্ড"] }
      ]
    }
  ]
}
