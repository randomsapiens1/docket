export interface Facility {
  id: string
  title: string
  ministry: string
  category: 'financial' | 'education' | 'healthcare' | 'agriculture' | 'business'
  ageGroups: ('children' | 'youth' | 'adult' | 'senior')[]
  audiences: ('general' | 'women' | 'disability' | 'freedom-fighter' | 'farmer')[]
  description: string
  benefits: string
  eligibility: string
  actionUrl: string
  isExternal: boolean
}

export const CATEGORIES = {
  en: [
    { value: 'financial', label: 'Financial Aid & Allowance' },
    { value: 'education', label: 'Education & Training' },
    { value: 'healthcare', label: 'Healthcare & Wellness' },
    { value: 'agriculture', label: 'Agriculture & Farming' },
    { value: 'business', label: 'Business & Startup Grants' }
  ],
  bn: [
    { value: 'financial', label: 'আর্থিক সহায়তা ও ভাতা' },
    { value: 'education', label: 'শিক্ষা ও প্রশিক্ষণ' },
    { value: 'healthcare', label: 'স্বাস্থ্য ও চিকিৎসা' },
    { value: 'agriculture', label: 'কৃষি ও খামার' },
    { value: 'business', label: 'ব্যবসা ও প্রণোদনা' }
  ]
}

export const AGE_GROUPS = {
  en: [
    { value: 'children', label: 'Children (0-12 yrs)' },
    { value: 'youth', label: 'Youth & Students (13-25 yrs)' },
    { value: 'adult', label: 'Adults & Professionals (26-59 yrs)' },
    { value: 'senior', label: 'Senior Citizens (60+ yrs)' }
  ],
  bn: [
    { value: 'children', label: 'শিশু (০-১২ বছর)' },
    { value: 'youth', label: 'তরুণ ও শিক্ষার্থী (১৩-২৫ বছর)' },
    { value: 'adult', label: 'প্রাপ্তবয়স্ক ও পেশাজীবী (২৬-৫৯ বছর)' },
    { value: 'senior', label: 'জেষ্ঠ্য নাগরিক (৬০+ বছর)' }
  ]
}

export const AUDIENCES = {
  en: [
    { value: 'general', label: 'General Citizens' },
    { value: 'women', label: 'Women' },
    { value: 'disability', label: 'Persons with Disabilities' },
    { value: 'freedom-fighter', label: 'Freedom Fighters' },
    { value: 'farmer', label: 'Farmers' }
  ],
  bn: [
    { value: 'general', label: 'সাধারণ নাগরিক' },
    { value: 'women', label: 'নারী' },
    { value: 'disability', label: 'প্রতিবন্ধী ব্যক্তি' },
    { value: 'freedom-fighter', label: 'বীর মুক্তিযোদ্ধা' },
    { value: 'farmer', label: 'কৃষক' }
  ]
}

export const facilitiesData: Record<'en' | 'bn', Facility[]> = {
  en: [
    {
      id: 'primary-school-stipend',
      title: 'Primary School Student Stipend',
      ministry: 'Ministry of Primary and Mass Education',
      category: 'education',
      ageGroups: ['children'],
      audiences: ['general'],
      description: 'Cash stipends sent directly to mothers\' mobile banking accounts (Bkash/Nagad) to boost primary school enrollment and mitigate dropouts.',
      benefits: '৳150 to ৳500 per month depending on the number of children enrolled.',
      eligibility: 'Children enrolled in public primary schools with minimum 85% attendance.',
      actionUrl: 'http://www.mopme.gov.bd/',
      isExternal: true
    },
    {
      id: 'national-youth-training',
      title: 'National Youth Skill Development Training',
      ministry: 'Department of Youth Development',
      category: 'education',
      ageGroups: ['youth'],
      audiences: ['general'],
      description: 'Vocational training courses in IT, electrics, sewing, livestock rearing, and entrepreneurship to create self-employment opportunities.',
      benefits: 'Free professional certification, raw materials, and eligibility for low-interest start-up loans up to ৳1,00,000.',
      eligibility: 'Unemployed citizens aged 18 to 35 with minimum JSC or SSC qualifications.',
      actionUrl: 'http://dyd.gov.bd/',
      isExternal: true
    },
    {
      id: 'old-age-allowance',
      title: 'Old Age Allowance (Boyosko Bhata)',
      ministry: 'Ministry of Social Welfare',
      category: 'financial',
      ageGroups: ['senior'],
      audiences: ['general'],
      description: 'Monthly direct financial support aimed at securing basic livelihood, healthcare, and security for underprivileged senior citizens.',
      benefits: '৳600 per month paid directly through G2P mobile bank accounts.',
      eligibility: 'Men aged 65+ and women aged 62+ with an annual income below ৳10,000.',
      actionUrl: 'https://msw.gov.bd/',
      isExternal: true
    },
    {
      id: 'widow-allowance',
      title: 'Allowance for Widows and Deserted Women',
      ministry: 'Ministry of Social Welfare',
      category: 'financial',
      ageGroups: ['adult', 'senior'],
      audiences: ['women'],
      description: 'Monthly social safety-net allowance for women who are widowed, divorced, or abandoned by their spouses without economic support.',
      benefits: '৳550 per month directly credited to mobile bank wallets.',
      eligibility: 'Vulnerable women who are widowed or deserted, with a low income and residing in rural/semi-urban areas.',
      actionUrl: 'https://msw.gov.bd/',
      isExternal: true
    },
    {
      id: 'maternity-allowance',
      title: 'Maternity Allowance for Poor Mothers',
      ministry: 'Ministry of Women and Children Affairs',
      category: 'healthcare',
      ageGroups: ['adult'],
      audiences: ['women'],
      description: 'Maternal health benefit ensuring nutritional security, post-natal clinic check-ups, and immunization support for pregnant mothers.',
      benefits: '৳800 per month for a total duration of 36 months.',
      eligibility: 'Low-income pregnant women during their first or second pregnancy.',
      actionUrl: 'https://mowca.gov.bd/',
      isExternal: true
    },
    {
      id: 'agricultural-subsidy',
      title: 'Agricultural Subsidy & Input Assistance Cards',
      ministry: 'Ministry of Agriculture',
      category: 'agriculture',
      ageGroups: ['youth', 'adult', 'senior'],
      audiences: ['farmer'],
      description: 'Provides subsidized high-yield seeds, discounted chemical/organic fertilizers, irrigation fuels, and micro-credits via Agricultural Input Assistance cards.',
      benefits: 'Up to 50%-70% discount on agricultural tools and inputs, and ৳10 savings bank account facilities.',
      eligibility: 'Verified smallholder and tenant farmers holding a valid Farmer Card (Krishi Card).',
      actionUrl: 'http://www.moa.gov.bd/',
      isExternal: true
    },
    {
      id: 'freedom-fighter-honorarium',
      title: 'Honorarium for Heroic Freedom Fighters',
      ministry: 'Ministry of Liberation War Affairs',
      category: 'financial',
      ageGroups: ['senior'],
      audiences: ['freedom-fighter'],
      description: 'Lifetime monthly honorarium and medical allowances awarded to certified freedom fighters and their immediate dependent families.',
      benefits: '৳20,000 per month, along with two festival bonuses and a Noboborsho bonus annually.',
      eligibility: 'Listed and gazetted freedom fighters or their immediate legal successors.',
      actionUrl: 'https://molwa.gov.bd/',
      isExternal: true
    },
    {
      id: 'disability-education-stipend',
      title: 'Education Stipend for Students with Disabilities',
      ministry: 'Department of Social Services',
      category: 'education',
      ageGroups: ['children', 'youth'],
      audiences: ['disability'],
      description: 'Financial grants given at all educational levels to facilitate schooling, purchase assistive learning kits, and boost literacy.',
      benefits: 'From ৳750 (primary level) up to ৳1,300 (higher secondary/tertiary level) per month.',
      eligibility: 'Students with verified disabilities enrolled in recognized educational institutions.',
      actionUrl: 'http://www.dss.gov.bd/',
      isExternal: true
    }
  ],
  bn: [
    {
      id: 'primary-school-stipend',
      title: 'প্রাথমিক বিদ্যালয় উপবৃত্তি',
      ministry: 'প্রাথমিক ও গণশিক্ষা মন্ত্রণালয়',
      category: 'education',
      ageGroups: ['children'],
      audiences: ['general'],
      description: 'প্রাথমিক বিদ্যালয়ে ভর্তি বাড়াতে ও ঝরে পড়া কমাতে সরাসরি মায়ের মোবাইলে (বিকাশ/নগদ) উপবৃত্তির টাকা পাঠানো হয়।',
      benefits: 'ভর্তিকৃত শিক্ষার্থীর সংখ্যার ওপর ভিত্তি করে প্রতি মাসে ১৫০ টাকা থেকে ৫০০ টাকা পর্যন্ত।',
      eligibility: 'সরকারি প্রাথমিক বিদ্যালয়ে পড়ুয়া এবং ন্যূনতম ৮৫% উপস্থিতি সম্পন্ন শিশু।',
      actionUrl: 'http://www.mopme.gov.bd/',
      isExternal: true
    },
    {
      id: 'national-youth-training',
      title: 'জাতীয় যুব প্রশিক্ষণ ও কর্মসংস্থান কার্যক্রম',
      ministry: 'যুব উন্নয়ন অধিদপ্তর',
      category: 'education',
      ageGroups: ['youth'],
      audiences: ['general'],
      description: 'তথ্যপ্রযুক্তি, ইলেকট্রনিক্স, সেলাই, গবাদিপশু পালন এবং উদ্যোক্তা উন্নয়ন বিষয়ক বৃত্তিমূলক প্রশিক্ষণ।',
      benefits: 'বিনামূল্যে পেশাদার সার্টিফিকেট, প্রশিক্ষণ উপকরণ এবং ১,০০,০০০ টাকা পর্যন্ত সহজ শর্তে স্টার্ট-আপ ঋণ পাওয়ার সুযোগ।',
      eligibility: '১৮ থেকে ৩৫ বছর বয়সী বেকার নাগরিক, যাদের ন্যূনতম শিক্ষাগত যোগ্যতা জেএসসি বা এসএসসি।',
      actionUrl: 'http://dyd.gov.bd/',
      isExternal: true
    },
    {
      id: 'old-age-allowance',
      title: 'বয়স্ক ভাতা (Boyosko Bhata)',
      ministry: 'সমাজকল্যাণ মন্ত্রণালয়',
      category: 'financial',
      ageGroups: ['senior'],
      audiences: ['general'],
      description: 'দরিদ্র ও পিছিয়ে পড়া বয়োজ্যেষ্ঠ নাগরিকদের মৌলিক জীবিকা, স্বাস্থ্যসেবা ও সামাজিক নিরাপত্তা নিশ্চিতকরণের জন্য মাসিক ভাতা।',
      benefits: 'প্রতি মাসে ৬০০ টাকা সরাসরি মোবাইল ব্যাংক অ্যাকাউন্টের (জি২পি) মাধ্যমে প্রদান করা হয়।',
      eligibility: '৬৫ বছর বা তদূর্ধ্ব বয়সী পুরুষ এবং ৬২ বছর বা তদূর্ধ্ব বয়সী নারী যাদের বার্ষিক আয় ১০,০০০ টাকার কম।',
      actionUrl: 'https://msw.gov.bd/',
      isExternal: true
    },
    {
      id: 'widow-allowance',
      title: 'বিধবা ও স্বামী নিগৃহীতা মহিলা ভাতা',
      ministry: 'সমাজকল্যাণ মন্ত্রণালয়',
      category: 'financial',
      ageGroups: ['adult', 'senior'],
      audiences: ['women'],
      description: 'বিধবা, তালাকপ্রাপ্তা অথবা স্বামী কর্তৃক পরিত্যক্ত এবং অর্থনৈতিকভাবে সহায়তাহীন নারীদের জন্য একটি সামাজিক নিরাপত্তা কর্মসূচি।',
      benefits: 'প্রতি মাসে ৫৫০ টাকা সরাসরি মোবাইল ব্যাংকিং অ্যাকাউন্টে পাঠানো হয়।',
      eligibility: 'অসহায় ও দরিদ্র বিধবা বা স্বামী পরিত্যক্ত নারী যারা গ্রামীণ বা আধা-শহুরে এলাকায় বসবাসকারী।',
      actionUrl: 'https://msw.gov.bd/',
      isExternal: true
    },
    {
      id: 'maternity-allowance',
      title: 'দরিদ্র মা’র জন্য মাতৃত্বকাল ভাতা',
      ministry: 'মহিলা ও শিশু বিষয়ক মন্ত্রণালয়',
      category: 'healthcare',
      ageGroups: ['adult'],
      audiences: ['women'],
      description: 'গর্ভবতী মায়েদের পুষ্টির নিরাপত্তা, প্রসব-পরবর্তী স্বাস্থ্য পরীক্ষা এবং শিশুদের টিকাদানের নিশ্চয়তা দিতে মাতৃত্বকালীন সুবিধা।',
      benefits: 'প্রতি মাসে ৮০০ টাকা করে মোট ৩৬ মাস পর্যন্ত।',
      eligibility: 'প্রথম বা দ্বিতীয়বার গর্ভধারণকারী নিম্ন আয়ের নারী।',
      actionUrl: 'https://mowca.gov.bd/',
      isExternal: true
    },
    {
      id: 'agricultural-subsidy',
      title: 'কৃষি প্রণোদনা ও উপকরণ সহায়তা কার্ড',
      ministry: 'কৃষি মন্ত্রণালয়',
      category: 'agriculture',
      ageGroups: ['youth', 'adult', 'senior'],
      audiences: ['farmer'],
      description: 'কৃষি উপকরণ সহায়তা কার্ডের মাধ্যমে ভর্তুকি মূল্যে উচ্চ ফলনশীল বীজ, সার, সেচের জ্বালানি এবং স্বল্প সুদে কৃষি ঋণ সরবরাহ।',
      benefits: 'কৃষি যন্ত্রপাতি ও উপাদানে ৫০%-৭০% পর্যন্ত ছাড় এবং মাত্র ১০ টাকায় সঞ্চয়ী ব্যাংক অ্যাকাউন্ট খোলার সুবিধা।',
      eligibility: 'কৃষি সম্প্রসারণ অধিদপ্তর কর্তৃক নিবন্ধিত এবং বৈধ কৃষক কার্ডধারী প্রান্তিক ও ক্ষুদ্র চাষী।',
      actionUrl: 'http://www.moa.gov.bd/',
      isExternal: true
    },
    {
      id: 'freedom-fighter-honorarium',
      title: 'বীর মুক্তিযোদ্ধাদের সম্মানী ভাতা',
      ministry: 'মুক্তিযুদ্ধ বিষয়ক মন্ত্রণালয়',
      category: 'financial',
      ageGroups: ['senior'],
      audiences: ['freedom-fighter'],
      description: 'বীর মুক্তিযোদ্ধা এবং তাদের অসচ্ছল পরিবারের কল্যাণে আজীবন মাসিক রাষ্ট্রীয় সম্মানী ও চিকিৎসা সহায়তা ভাতা।',
      benefits: 'প্রতি মাসে ২০,০০০ টাকা, সাথে বছরে দুটি উৎসব ভাতা এবং একটি নববর্ষ ভাতা।',
      eligibility: 'সরকারি গেজেটভুক্ত বীর মুক্তিযোদ্ধা অথবা তাদের উপযুক্ত আইনগত উত্তরাধিকারী।',
      actionUrl: 'https://molwa.gov.bd/',
      isExternal: true
    },
    {
      id: 'disability-education-stipend',
      title: 'প্রতিবন্ধী শিক্ষার্থীদের জন্য শিক্ষা উপবৃত্তি',
      ministry: 'সমাজসেবা অধিদপ্তর',
      category: 'education',
      ageGroups: ['children', 'youth'],
      audiences: ['disability'],
      description: 'প্রতিবন্ধী শিক্ষার্থীদের প্রাতিষ্ঠানিক শিক্ষা গ্রহণে সহায়তা ও শিক্ষার হার বাড়াতে সরকারের পক্ষ থেকে বিশেষ আর্থিক অনুদান।',
      benefits: 'শিক্ষার স্তরভেদে প্রতি মাসে ৭৫০ টাকা (প্রাথমিক) থেকে শুরু করে ১,৩০০ টাকা (উচ্চশিক্ষা) পর্যন্ত।',
      eligibility: 'সমাজসেবা অধিদপ্তর কর্তৃক নিবন্ধিত এবং কোনো স্বীকৃত শিক্ষা প্রতিষ্ঠানে অধ্যয়নরত প্রতিবন্ধী শিক্ষার্থী।',
      actionUrl: 'http://www.dss.gov.bd/',
      isExternal: true
    }
  ]
}
