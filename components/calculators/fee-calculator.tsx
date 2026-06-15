'use client'

import React, { useState, useMemo } from 'react'
import { useLanguage } from '@/lib/language-context'
import { Calculator, Info } from 'lucide-react'

type CompanyType = 'private' | 'public' | 'foreign' | 'trade' | 'society' | 'partnership'

export function FeeCalculator() {
  const { language } = useLanguage()
  const [type, setType] = useState<CompanyType>('private')
  const [capital, setCapital] = useState<number>(1000000)
  const [members, setMembers] = useState<number>(20)

  const fees = useMemo(() => {
    let stamp = 0
    let registration = 0
    let filing = 0

    if (type === 'private' || type === 'public') {
      // Stamp Fee
      stamp = 2000 // MoA
      if (capital <= 4000000) stamp += 10000
      else if (capital <= 120000000) stamp += 30000
      else stamp += 50000

      // Filing Fee
      filing = type === 'private' ? 1200 : 1600

      // Registration Fee (Capital based)
      if (capital > 1000000) {
        if (capital <= 5000000) {
          registration = Math.ceil((capital - 1000000) / 100000) * 80
        } else {
          registration = (4000000 / 100000) * 80 // First 50L (after 10L)
          registration += Math.ceil((capital - 5000000) / 100000) * 130
        }
      }
    } else if (type === 'foreign') {
      filing = 3000
      stamp = 3000 // MoA/AoA
      registration = 0
    } else if (type === 'trade') {
      stamp = 300
      filing = 2800
      if (members <= 20) registration = 1000
      else if (members <= 100) registration = 2500
      else registration = 2500 + Math.ceil((members - 100) / 100) * 300
    } else if (type === 'society') {
      registration = 15000
      filing = 800
    } else if (type === 'partnership') {
      registration = 5000
      filing = 500
    }

    return { stamp, registration, filing, total: stamp + registration + filing }
  }, [type, capital, members])

  const t = {
    en: {
      title: "RJSC Fee Calculator",
      subtitle: "Updated as of July 2023",
      compType: "Business Type",
      capLabel: "Authorized Capital (BDT)",
      memLabel: "Number of Members",
      breakdown: "Fee Breakdown",
      stamp: "Stamp Duty",
      reg: "Registration Fee",
      filing: "Filing & Others",
      total: "Estimated Total",
      types: {
        private: "Private Limited Company",
        public: "Public Limited Company",
        foreign: "Foreign Company (Branch/Liaison)",
        trade: "Trade Organization",
        society: "Society / Association",
        partnership: "Partnership Firm"
      }
    },
    bn: {
      title: "নিবন্ধন ফি ক্যালকুলেটর",
      subtitle: "জুলাই ২০২৩ অনুযায়ী হালনাগাদ",
      compType: "প্রতিষ্ঠানের ধরন",
      capLabel: "অনুমোদিত মূলধন (টাকা)",
      memLabel: "সদস্য সংখ্যা",
      breakdown: "ফির বিবরণ",
      stamp: "স্ট্যাম্প ফি",
      reg: "নিবন্ধন ফি",
      filing: "ফাইলিং ও অন্যান্য",
      total: "সর্বমোট আনুমানিক ফি",
      types: {
        private: "প্রাইভেট লিমিটেড কোম্পানি",
        public: "পাবলিক লিমিটেড কোম্পানি",
        foreign: "বিদেশি কোম্পানি",
        trade: "ট্রেড অর্গানাইজেশন",
        society: "সমিতি (সোসাইটি)",
        partnership: "পার্টনারশিপ ফার্ম"
      }
    }
  }[language]

  return (
    <div className="bg-white border-[3px] border-black p-6 sm:p-8 space-y-8">
      <div className="flex items-start justify-between border-b-2 border-gray-100 pb-6">
        <div className="space-y-1">
          <h3 className="text-2xl font-black text-black flex items-center gap-2">
            <Calculator className="w-6 h-6 text-[#ff0000]" />
            {t.title}
          </h3>
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">{t.subtitle}</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-10">
        {/* Inputs */}
        <div className="space-y-6">
          <div className="space-y-3">
            <label className="text-sm font-black uppercase text-gray-700">{t.compType}</label>
            <select 
              value={type}
              onChange={(e) => setType(e.target.value as CompanyType)}
              className="w-full h-12 px-4 border-2 border-black font-bold focus:bg-gray-50 outline-none appearance-none cursor-pointer rounded-none"
            >
              {Object.entries(t.types).map(([key, label]) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </select>
          </div>

          {type !== 'society' && type !== 'partnership' && type !== 'foreign' && (
            <div className="space-y-3">
              <label className="text-sm font-black uppercase text-gray-700">
                {type === 'trade' ? t.memLabel : t.capLabel}
              </label>
              <input 
                type="number"
                value={type === 'trade' ? members : capital}
                onChange={(e) => type === 'trade' ? setMembers(Number(e.target.value)) : setCapital(Number(e.target.value))}
                className="w-full h-12 px-4 border-2 border-black font-bold focus:bg-gray-50 outline-none rounded-none"
              />
              {type !== 'trade' && (
                <input 
                  type="range"
                  min="100000"
                  max="100000000"
                  step="100000"
                  value={capital}
                  onChange={(e) => setCapital(Number(e.target.value))}
                  className="w-full accent-[#ff0000] h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer mt-4"
                />
              )}
            </div>
          )}
        </div>

        {/* Results */}
        <div className="bg-gray-50 border-2 border-black p-6 space-y-6">
          <h4 className="font-black text-lg border-b-2 border-gray-200 pb-2">{t.breakdown}</h4>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center text-sm">
              <span className="font-bold text-gray-600">{t.stamp}</span>
              <span className="font-black">৳ {fees.stamp.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="font-bold text-gray-600">{t.reg}</span>
              <span className="font-black">৳ {fees.registration.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="font-bold text-gray-600">{t.filing}</span>
              <span className="font-black">৳ {fees.filing.toLocaleString()}</span>
            </div>
            
            <div className="pt-4 border-t-4 border-black">
              <div className="flex justify-between items-center">
                <span className="text-lg font-black">{t.total}</span>
                <span className="text-2xl font-black text-[#ff0000]">৳ {fees.total.toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div className="p-4 bg-blue-50 border-l-4 border-blue-500 flex gap-3">
            <Info className="w-5 h-5 text-blue-500 shrink-0" />
            <p className="text-[10px] leading-relaxed text-blue-800 font-medium">
              * This is an estimate based on official RJSC rates. Final fees may include minor bank charges or VAT on services.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
