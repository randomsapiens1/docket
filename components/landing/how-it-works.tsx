export function HowItWorks() {
  return (
    <section id="how" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Your government process, simplified
          </h2>
          <p className="text-lg text-muted-foreground">
            Three simple steps from start to finish
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-lg bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">
              1
            </div>
            <h3 className="text-xl font-semibold">Pick Your Process</h3>
            <p className="text-muted-foreground">
              Select what you need to do—register a company, transfer land, file taxes, get a passport, or anything else.
            </p>
          </div>

          <div className="space-y-4">
            <div className="w-12 h-12 rounded-lg bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">
              2
            </div>
            <h3 className="text-xl font-semibold">Answer Quick Questions</h3>
            <p className="text-muted-foreground">
              Tell us your entity type, location, or what applies to you. Takes 2-3 minutes.
            </p>
          </div>

          <div className="space-y-4">
            <div className="w-12 h-12 rounded-lg bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">
              3
            </div>
            <h3 className="text-xl font-semibold">Get Your Checklist</h3>
            <p className="text-muted-foreground">
              Steps in order, fees calculated, documents listed, and direct links to government portals.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
