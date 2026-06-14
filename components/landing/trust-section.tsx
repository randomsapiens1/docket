export function TrustSection() {
  return (
    <section id="trust" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            Built on official sources
          </h2>
          <p className="text-lg text-muted-foreground">
            We don&apos;t guess. We verify.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center space-y-2">
            <div className="text-3xl font-bold text-primary">100%</div>
            <p className="text-muted-foreground font-bold text-foreground">Official source backed</p>
            <p className="text-sm text-muted-foreground/70">Every step verified against government docs</p>
          </div>
          <div className="text-center space-y-2">
            <div className="text-3xl font-bold text-primary">Live Updates</div>
            <p className="text-muted-foreground font-bold text-foreground">When rules change, we change</p>
            <p className="text-sm text-muted-foreground/70">Monitor gazette notifications & circulars</p>
          </div>
          <div className="text-center space-y-2">
            <div className="text-3xl font-bold text-primary">No Fees</div>
            <p className="text-muted-foreground font-bold text-foreground">Completely free</p>
            <p className="text-sm text-muted-foreground/70">No intermediaries. No hidden costs.</p>
          </div>
        </div>

        <div className="pt-12 text-center border-t border-border">
          <p className="text-lg font-bold text-foreground">
            Found something outdated? <a href="mailto:rajkumaryhere@gmail.com" className="text-[#ff0000] underline decoration-2 underline-offset-4 hover:text-[#ff0000]/80">Report it &rarr;</a>
          </p>
        </div>
      </div>
    </section>
  )
}
