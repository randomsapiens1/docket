export function Roadmap() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/20">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            V1: Company Registration
          </h2>
          <p className="text-lg text-muted-foreground">
            Starting with RJSC—the most common process Bangladeshi founders need
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-3">
            <h3 className="font-semibold text-lg">V1: Company Registration (RJSC)</h3>
            <p className="text-muted-foreground">Fully verified. Fully guided. Everything you need to incorporate a private limited company.</p>
            <ul className="space-y-2 text-sm">
              <li className="flex gap-2"><span className="text-accent">✓</span> Step-by-step checklist</li>
              <li className="flex gap-2"><span className="text-accent">✓</span> Required documents</li>
              <li className="flex gap-2"><span className="text-accent">✓</span> Fee breakdown</li>
              <li className="flex gap-2"><span className="text-accent">✓</span> Direct portal links</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold text-lg">Coming Soon: More Processes</h3>
            <p className="text-muted-foreground">We&apos;re building guides for:</p>
            <ul className="space-y-2 text-sm">
              <li>• Property & land transfers</li>
              <li>• Personal & corporate tax filing</li>
              <li>• Identity documents</li>
              <li>• Import/export & vehicles</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
