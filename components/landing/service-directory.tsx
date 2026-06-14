import { ArrowRight } from 'lucide-react'

const serviceCategories = [
  {
    title: "Business",
    description: "Register your company, file returns, stay compliant.",
    items: [
      { name: "Incorporate a private company", status: "Live", href: "#" },
      { name: "File annual returns", status: "Soon", href: "#" },
      { name: "Change a director", status: "Soon", href: "#" },
    ]
  },
  {
    title: "Land & Property",
    description: "Transfer ownership, verify records, pay land tax.",
    items: [
      { name: "Land mutation (namjari)", status: "Soon", href: "#" },
      { name: "Get a khatian", status: "Soon", href: "#" },
    ]
  },
  {
    title: "Identity",
    description: "NID, passport, birth and death certificates.",
    items: [
      { name: "Correct your NID", status: "Soon", href: "#" },
      { name: "Apply for a passport", status: "Soon", href: "#" },
    ]
  },
  {
    title: "Tax",
    description: "TIN, income tax, VAT.",
    items: [
      { name: "Register for TIN", status: "Soon", href: "#" },
    ]
  },
  {
    title: "Vehicles",
    description: "BRTA license, registration, fitness.",
    items: [
      { name: "Get a driving license", status: "Soon", href: "#" },
    ]
  },
  {
    title: "Travel",
    description: "Passport, police clearance, NOC.",
    items: [
      { name: "Apply for police clearance", status: "Soon", href: "#" },
    ]
  }
]

export function ServiceDirectory() {
  return (
    <section className="pt-8 pb-16 px-4 sm:px-6 lg:px-8 bg-gray-50 border-t border-border">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-extrabold mb-16 text-foreground">How docket can help you</h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
          {serviceCategories.map((category, idx) => (
            <div key={idx} className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-foreground underline decoration-4 decoration-[#ff0000] underline-offset-8">
                  {category.title}
                </h3>
                <p className="text-sm text-muted-foreground pt-2">
                  {category.description}
                </p>
              </div>
              
              <ul className="space-y-4">
                {category.items.map((item, itemIdx) => (
                  <li key={itemIdx} className="group">
                    <a 
                      href={item.href} 
                      className={`flex items-center justify-between py-2 border-b border-gray-200 group-hover:border-[#ff0000] transition-colors ${item.status === 'Soon' ? 'pointer-events-none' : ''}`}
                    >
                      <div className="flex items-center gap-2">
                        <ArrowRight className={`w-4 h-4 ${item.status === 'Live' ? 'text-[#ff0000]' : 'text-gray-300'}`} />
                        <span className={`font-bold ${item.status === 'Live' ? 'text-[#ff0000] group-hover:underline' : 'text-gray-500'}`}>
                          {item.name}
                        </span>
                      </div>
                      <span className={`text-[10px] font-bold uppercase px-2 py-0.5 border ${
                        item.status === 'Live' 
                          ? 'bg-[#ff0000] text-white border-[#ff0000]' 
                          : 'bg-gray-100 text-gray-500 border-gray-200'
                      }`}>
                        {item.status}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
