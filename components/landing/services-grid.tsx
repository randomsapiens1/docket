import { 
  Fingerprint, 
  Users, 
  Briefcase, 
  Award, 
  Map, 
  Car, 
  Receipt, 
  GraduationCap, 
  Globe, 
  Home, 
  ArrowRight 
} from 'lucide-react'

const services = [
  {
    title: "Identity & Personal Documents",
    description: "Everything related to proving who you are, including NID, passport, and certificates.",
    icon: Fingerprint,
  },
  {
    title: "Family & Life Events",
    description: "Guides and checklists triggered by major life events like birth, marriage, and death.",
    icon: Users,
  },
  {
    title: "Business & Entrepreneurship",
    description: "Register your company, apply for licenses, file returns, and stay compliant.",
    icon: Briefcase,
  },
  {
    title: "Employment & Career",
    description: "Services related to work, including TIN, police clearance, and work permits.",
    icon: Award,
  },
  {
    title: "Property & Land",
    description: "Verify land records, request mutation (namjari), get khatians, and pay property taxes.",
    icon: Map,
  },
  {
    title: "Vehicles & Transportation",
    description: "Get driving licenses, register vehicles, and renew fitness certificates.",
    icon: Car,
  },
  {
    title: "Taxes & Finance",
    description: "Register for TIN, file income tax returns, and process treasury e-challans.",
    icon: Receipt,
  },
  {
    title: "Education",
    description: "Board certificates, name or age corrections, and educational equivalence.",
    icon: GraduationCap,
  },
  {
    title: "Immigration & Travel",
    description: "Apply for passports, visas, immigration clearances, and expat welfare.",
    icon: Globe,
  },
  {
    title: "Housing & Utilities",
    description: "Apply for electricity, gas, water connections, and manage municipal holding tax.",
    icon: Home,
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
              className="group relative p-6 border-2 border-black bg-white hover:bg-gray-50 transition-all cursor-pointer flex flex-col"
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
