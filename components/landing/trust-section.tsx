export function TrustSection() {
  return (
    <section id="trust" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Built on official sources
          </h2>
          <p className="text-lg text-muted-foreground">
            We don&apos;t guess. We verify.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center space-y-2">
            <div className="text-3xl font-bold text-primary">100%</div>
            <p className="text-muted-foreground">Official source backed</p>
            <p className="text-sm text-muted-foreground/70">Every step verified against government docs</p>
          </div>
          <div className="text-center space-y-2">
            <div className="text-3xl font-bold text-primary">Live Updates</div>
            <p className="text-muted-foreground">When rules change, we change</p>
            <p className="text-sm text-muted-foreground/70">Monitor gazette notifications & circulars</p>
          </div>
          <div className="text-center space-y-2">
            <div className="text-3xl font-bold text-primary">No Fees</div>
            <p className="text-muted-foreground">Completely free</p>
            <p className="text-sm text-muted-foreground/70">No intermediaries. No hidden costs.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
