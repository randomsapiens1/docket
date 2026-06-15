export interface TemplateItem {
  id: string
  name: string
  category: string
  desc: string
  type: string
}

export const templates: Record<'en' | 'bn', TemplateItem[]> = {
  en: [
    {
      id: 'moa-it',
      name: 'MoA & AoA: IT & Software',
      category: 'Legal Constitution',
      desc: 'Industry-standard draft optimized for BASIS membership and tech startups.',
      type: 'PDF / DOCX'
    },
    {
      id: 'moa-trade',
      name: 'MoA & AoA: General Trading',
      category: 'Legal Constitution',
      desc: 'Standard objects for import, export, and retail businesses in Bangladesh.',
      type: 'PDF / DOCX'
    },
    {
      id: 'lease-draft',
      name: 'Office Lease Agreement',
      category: 'Operations',
      desc: 'Draft rental agreement required for Trade License and VAT registration.',
      type: 'DOCX'
    },
    {
      id: 'board-bank',
      name: 'Board Resolution (Bank)',
      category: 'Banking',
      desc: 'Mandatory resolution draft to open a corporate bank account.',
      type: 'DOCX'
    },
    {
      id: 'form-ix',
      name: 'Form IX (Consent Form)',
      category: 'RJSC Forms',
      desc: 'Pre-filled template for Director\'s Consent to Act.',
      type: 'PDF'
    }
  ],
  bn: [
    {
      id: 'moa-it',
      name: 'MoA এবং AoA: আইটি ও সফটওয়্যার',
      category: 'আইনি সংবিধান',
      desc: 'আইটি কোম্পানি এবং বেসিস (BASIS) মেম্বারশিপের জন্য অপ্টিমাইজ করা ড্রাফট।',
      type: 'PDF / DOCX'
    },
    {
      id: 'moa-trade',
      name: 'MoA এবং AoA: সাধারণ ব্যবসা',
      category: 'আইনি সংবিধান',
      desc: 'আমদানি, রপ্তানি এবং খুচরা ব্যবসার জন্য স্ট্যান্ডার্ড ড্রাফট।',
      type: 'PDF / DOCX'
    },
    {
      id: 'lease-draft',
      name: 'অফিস ভাড়ার চুক্তিপত্র',
      category: 'অপারেশনস',
      desc: 'ট্রেড লাইসেন্স এবং ভ্যাট নিবন্ধনের জন্য প্রয়োজনীয় ভাড়ার চুক্তির ড্রাফট।',
      type: 'DOCX'
    },
    {
      id: 'board-bank',
      name: 'বোর্ড রেজোলিউশন (ব্যাংক)',
      category: 'ব্যাংকিং',
      desc: 'কর্পোরেট ব্যাংক অ্যাকাউন্ট খোলার জন্য প্রয়োজনীয় বোর্ড রেজোলিউশন।',
      type: 'DOCX'
    },
    {
      id: 'form-ix',
      name: 'ফর্ম IX (সম্মতিপত্র)',
      category: 'RJSC ফর্মসমূহ',
      desc: 'পরিচালক হিসেবে কাজ করার সম্মতিপত্রের প্রি-ফিল্ড টেমপ্লেট।',
      type: 'PDF'
    }
  ]
}
