'use client'

import { ArrowRight } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'
import { serviceCategories } from '@/lib/services'

const labels = {
  en: {
    heading: "How docket can help you",
    live: "Live",
    soon: "Soon"
  },
  bn: {
    heading: "ডকেট আপনাকে যেভাবে সাহায্য করতে পারে",
    live: "লাইভ",
    soon: "শীঘ্রই"
  }
}

export function ServiceDirectory() {
  const { language } = useLanguage()
  const categories = serviceCategories[language]
  const { heading, live, soon } = labels[language]

  return (
    <section id="services" className="pt-8 pb-16 px-4 sm:px-6 lg:px-8 bg-gray-50 border-t border-gray-100">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 mb-8 sm:mb-12">
          {heading}
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {categories.map((category, idx) => (
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
              <ul className="space-y-1 flex-1">
                {category.items.map((item, itemIdx) => {
                  const isLive = item.status === 'Live'
                  return (
                    <li key={itemIdx}>
                      <a
                        href={item.href}
                        className={`group flex items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-150 ${
                          isLive
                            ? 'hover:bg-primary/5 cursor-pointer'
                            : 'pointer-events-none opacity-50'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <ArrowRight className={`w-3.5 h-3.5 shrink-0 transition-transform duration-150 ${
                            isLive
                              ? 'text-primary group-hover:translate-x-0.5'
                              : 'text-gray-300'
                          }`} />
                          <span className={`text-sm font-medium truncate ${
                            isLive ? 'text-gray-800 group-hover:text-primary' : 'text-gray-400'
                          } transition-colors duration-150`}>
                            {item.name}
                          </span>
                        </div>
                        <span className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full shrink-0 ml-2 ${
                          isLive
                            ? 'bg-primary/10 text-primary'
                            : 'bg-gray-100 text-gray-400'
                        }`}>
                          {isLive ? live : soon}
                        </span>
                      </a>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
