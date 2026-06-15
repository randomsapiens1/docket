import React from 'react'
import { Download, FileCheck, ShieldCheck } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'
import { Button } from '@/components/ui/button'
import { TemplateItem } from '@/lib/templates'

interface TemplateLibraryProps {
  items: TemplateItem[]
}

export function TemplateLibrary({ items }: TemplateLibraryProps) {
  const { language } = useLanguage()

  const t = {
    en: {
      title: "Document Template Library",
      subtitle: "Verified drafts to speed up your setup",
      download: "Download Template",
      request: "Request Custom Draft",
      verified: "Verified by Legal Experts"
    },
    bn: {
      title: "ডকুমেন্ট টেমপ্লেট লাইব্রেরি",
      subtitle: "আপনার কাজ দ্রুত করতে যাচাইকৃত ড্রাফটসমূহ",
      download: "টেমপ্লেট ডাউনলোড",
      request: "কাস্টম ড্রাফটের জন্য অনুরোধ",
      verified: "আইনি বিশেষজ্ঞ দ্বারা যাচাইকৃত"
    }
  }[language]

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="space-y-1">
          <h2 className="text-2xl sm:text-3xl font-black text-black">{t.title}</h2>
          <p className="text-gray-600 font-medium">{t.subtitle}</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 border-2 border-green-600 text-green-700 text-xs font-bold uppercase">
          <ShieldCheck className="w-4 h-4" />
          {t.verified}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.length > 0 ? (
          items.map((doc) => (
            <div key={doc.id} className="bg-white border-2 border-black p-6 flex flex-col group hover:-translate-y-1 transition-transform">
              <div className="mb-4">
                <span className="text-[10px] font-black uppercase tracking-widest text-[#ff0000] px-2 py-0.5 bg-red-50 border border-[#ff0000]">
                  {doc.category}
                </span>
              </div>
              
              <div className="flex-1 space-y-3">
                <h3 className="text-lg font-bold leading-tight group-hover:underline">
                  {doc.name}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {doc.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t-2 border-gray-100 flex items-center justify-between">
                <span className="text-[10px] font-bold text-gray-400">{doc.type}</span>
                <button className="flex items-center gap-2 text-sm font-black text-[#ff0000] hover:underline">
                  {t.download}
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-20 text-center space-y-4 bg-gray-50 border-2 border-dashed border-gray-300">
            <p className="text-lg font-bold text-gray-500">
              {language === 'en' ? 'No templates found matching your search.' : 'আপনার অনুসন্ধানের সাথে মেলে এমন কোনো টেমপ্লেট পাওয়া যায়নি।'}
            </p>
          </div>
        )}

        {/* Custom Request Card */}
        <div className="bg-black text-white border-2 border-black p-6 flex flex-col justify-center items-center text-center space-y-4">
          <FileCheck className="w-8 h-8 text-[#ff0000]" />
          <h3 className="font-bold">{language === 'en' ? 'Need a specific draft?' : 'বিশেষ কোনো ড্রাফট প্রয়োজন?'}</h3>
          <p className="text-xs text-gray-400">
            {language === 'en' ? 'We can prepare custom MoA/AoA tailored to your specific industry.' : 'আমরা আপনার ব্যবসার জন্য কাস্টম MoA/AoA প্রস্তুত করে দিতে পারি।'}
          </p>
          <Button variant="outline" className="w-full border-white text-white hover:bg-white hover:text-black">
            {t.request}
          </Button>
        </div>
      </div>
    </div>
  )
}
