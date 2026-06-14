import { Briefcase, Map, Fingerprint, Receipt, Car, Globe, ArrowRight } from 'lucide-react'

const services = [
  {
    title: "Business",
    description: "Register your company, file returns, and stay compliant — step by step.",
    icon: Briefcase,
  },
  {
    title: "Land & Property",
    description: "Transfer ownership, verify records, and pay land tax without the confusion.",
    icon: Map,
  },
  {
    title: "Identity",
    description: "Apply for or correct your NID, passport, and certificates the right way.",
    icon: Fingerprint,
  },
  {
    title: "Tax",
    description: "Register for TIN, file your income tax, and handle VAT without a consultant.",
    icon: Receipt,
  },
  {
    title: "Vehicles",
    description: "Get your driving license, register a vehicle, and renew fitness certificates.",
    icon: Car,
  },
  {
    title: "Travel",
    description: "Apply for a passport, get police clearance, and prepare travel documents.",
    icon: Globe,
  },
]

export function ServicesGrid() {
  return (
    <section className="pt-8 pb-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="space-y-4 text-center md:text-left">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
            How docket can help you
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div 
              key={index}
              className="group relative p-6 border-2 border-black bg-white hover:bg-gray-50 transition-all cursor-pointer shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] flex flex-col"
            >
              <div className="flex items-start justify-between mb-3">
                <service.icon className="w-8 h-8 text-[#ff0000]" />
                <ArrowRight className="w-5 h-5 text-[#ff0000] opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-1" />
              </div>
              <h3 className="text-xl font-bold mb-2">{service.title}</h3>
              <p className="text-sm text-gray-600 leading-snug">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
