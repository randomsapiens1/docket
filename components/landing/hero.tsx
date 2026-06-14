import { Search } from 'lucide-react'
import Image from "next/image"

export function Hero() {
  return (
    <section className="pt-20 pb-20 px-4 sm:px-6 lg:px-8 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Title Row - 60% width on desktop */}
        <div className="w-full lg:w-[60%] mb-8 relative z-10 space-y-6">
          <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold tracking-tight text-pretty text-foreground leading-[1.2]">
            Government paperwork made easy
          </h1>
          <p className="text-xl sm:text-2xl text-muted-foreground text-pretty max-w-xl leading-relaxed">
            Get verified, step-by-step guidance for official processes in Bangladesh. From company registration to land transfers.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-end justify-between gap-8 lg:gap-8">
          {/* Left Column: Search */}
          <div className="w-full lg:w-[40%] text-left">
            <div className="relative max-w-lg group">
              <label htmlFor="search-services" className="sr-only">Search for a service</label>
              <div className="flex shadow-[0_8px_0_0_rgba(0,0,0,0.05)]">
                <input
                  type="text"
                  id="search-services"
                  placeholder="Search for a service..."
                  className="flex-1 px-5 py-4 text-xl font-medium text-black bg-white border-[3px] border-r-0 border-black focus:outline-none focus:ring-4 focus:ring-yellow-400 w-full"
                />
                <button className="bg-primary hover:bg-primary/90 text-white px-7 py-4 flex items-center justify-center border-[3px] border-black focus:outline-none focus:ring-4 focus:ring-yellow-400 shrink-0">
                  <Search className="w-7 h-7" />
                  <span className="sr-only">Search</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Image (Pulled up to overlap text, but bottom-aligned with search) */}
          <div className="w-full lg:w-[60%] flex justify-center lg:justify-end lg:-mt-48">
            <div className="relative w-full max-w-[950px] lg:max-w-none">
              <Image
                src="/docket-hero.webp"
                alt="Docket Hero Illustration"
                width={1400}
                height={1000}
                priority
                sizes="(max-width: 768px) 100vw, 60vw"
                className="w-full h-auto object-contain max-h-[650px] lg:max-h-[850px] drop-shadow-2xl translate-x-4"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
