'use client'

import { ArrowRight } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'
import { trackEvent } from '@/lib/analytics'
import { serviceCategories, ServiceItem } from '@/lib/services'
import Link from 'next/link'

const labels = {
  en: {
    heading: "How docket can help you",
    live: "Live",
    soon: "Soon",
    viewAll: "View all services",
  },
  bn: {
    heading: "ডকেট আপনাকে যেভাবে সাহায্য করতে পারে",
    live: "লাইভ",
    soon: "শীঘ্রই",
    viewAll: "সব সেবা দেখুন",
  }
}

function flattenLiveItems(category: ServiceItem[]): Array<{ name: string; href: string }> {
  const result: Array<{ name: string; href: string }> = []
  for (const item of category) {
    if (item.subItems && item.subItems.length > 0) {
      for (const sub of item.subItems) {
        if (sub.status === 'Live') result.push({ name: sub.name, href: sub.href })
      }
    } else if (item.status === 'Live') {
      result.push({ name: item.name, href: item.href })
    }
  }
  return result
}

export function ServiceDirectory({ preview = false }: { preview?: boolean }) {
  const { language } = useLanguage()
  const categories = serviceCategories[language]
  const { heading, live, soon, viewAll } = labels[language]

  return (
    <section id="services" className="pt-8 pb-16 px-4 sm:px-6 lg:px-8 bg-gray-50 border-t border-gray-100">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 mb-8 sm:mb-12">
          {heading}
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {categories.map((category, idx) => {
            const liveItems = flattenLiveItems(category.items)
            const previewItems = preview ? liveItems.slice(0, 4) : null
            const hiddenCount = preview ? Math.max(0, liveItems.length - 4) : 0

            return (
              <div
                key={idx}
                className="bg-white rounded-2xl ring-1 ring-black/8 shadow-sm p-6 space-y-5 flex flex-col"
              >
                {/* Category header */}
                <div className="space-y-1.5 pb-4 border-b border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-900">{category.title}</h3>
                  <p className="text-xs text-gray-400 leading-relaxed">{category.description}</p>
                </div>

                {/* Service items */}
                {preview ? (
                  <>
                    <ul className="space-y-1 flex-1">
                      {previewItems!.map((item, i) => (
                        <li key={i}>
                          <a
                            href={item.href}
                            onClick={() => trackEvent('click_service', { service_name: item.name, category: category.title })}
                            className="group flex items-center gap-2.5 px-3 py-2.5 rounded-xl hover:bg-primary/5 transition-all duration-150"
                          >
                            <ArrowRight className="w-3.5 h-3.5 shrink-0 text-primary group-hover:translate-x-0.5 transition-transform duration-150" />
                            <span className="text-sm font-medium text-gray-800 group-hover:text-primary transition-colors duration-150 truncate">
                              {item.name}
                            </span>
                            <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full shrink-0 ml-auto bg-primary/10 text-primary">
                              {live}
                            </span>
                          </a>
                        </li>
                      ))}
                    </ul>
                    {(hiddenCount > 0 || liveItems.length === 0) && (
                      <div className="pt-3 border-t border-gray-100">
                        <Link
                          href="/services"
                          className="flex items-center justify-between text-sm font-medium text-gray-400 hover:text-primary transition-colors duration-150 group"
                        >
                          <span>{hiddenCount > 0 ? `+${hiddenCount} more` : viewAll}</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-150" />
                        </Link>
                      </div>
                    )}
                  </>
                ) : (
                  <ul className="space-y-1 flex-1">
                    {category.items.flatMap((item, itemIdx) => {
                      if (item.subItems && item.subItems.length > 0) {
                        return item.subItems.map((sub, subIdx) => {
                          const isLive = sub.status === 'Live'
                          return (
                            <li key={`${itemIdx}-${subIdx}`}>
                              <a
                                href={isLive ? sub.href : '#'}
                                onClick={isLive ? () => trackEvent('click_service', { service_name: sub.name, category: category.title }) : undefined}
                                className={`group flex items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-150 ${
                                  isLive ? 'hover:bg-primary/5 cursor-pointer' : 'pointer-events-none opacity-50'
                                }`}
                              >
                                <div className="flex items-center gap-2.5 min-w-0">
                                  <ArrowRight className={`w-3.5 h-3.5 shrink-0 transition-transform duration-150 ${isLive ? 'text-primary group-hover:translate-x-0.5' : 'text-gray-300'}`} />
                                  <span className={`text-sm font-medium truncate ${isLive ? 'text-gray-800 group-hover:text-primary' : 'text-gray-400'} transition-colors duration-150`}>
                                    {sub.name}
                                  </span>
                                </div>
                                <span className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full shrink-0 ml-2 ${isLive ? 'bg-primary/10 text-primary' : 'bg-gray-100 text-gray-400'}`}>
                                  {isLive ? live : soon}
                                </span>
                              </a>
                            </li>
                          )
                        })
                      }

                      const isLive = item.status === 'Live'
                      return [(
                        <li key={itemIdx}>
                          <a
                            href={isLive ? item.href : '#'}
                            onClick={isLive ? () => trackEvent('click_service', { service_name: item.name, category: category.title }) : undefined}
                            className={`group flex items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-150 ${
                              isLive ? 'hover:bg-primary/5 cursor-pointer' : 'pointer-events-none opacity-50'
                            }`}
                          >
                            <div className="flex items-center gap-2.5 min-w-0">
                              <ArrowRight className={`w-3.5 h-3.5 shrink-0 transition-transform duration-150 ${isLive ? 'text-primary group-hover:translate-x-0.5' : 'text-gray-300'}`} />
                              <span className={`text-sm font-medium truncate ${isLive ? 'text-gray-800 group-hover:text-primary' : 'text-gray-400'} transition-colors duration-150`}>
                                {item.name}
                              </span>
                            </div>
                            <span className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full shrink-0 ml-2 ${isLive ? 'bg-primary/10 text-primary' : 'bg-gray-100 text-gray-400'}`}>
                              {isLive ? live : soon}
                            </span>
                          </a>
                        </li>
                      )]
                    })}
                  </ul>
                )}
              </div>
            )
          })}
        </div>

        {preview && (
          <div className="mt-8 text-center">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gray-900/90 backdrop-blur-sm hover:bg-gray-900 hover:shadow-xl hover:shadow-black/25 hover:scale-[1.03] active:scale-[0.98] text-white font-semibold text-sm transition-all duration-200 shadow-md border border-white/10 group"
            >
              {viewAll}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
