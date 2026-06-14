import { CheckCircle, Shield, Users, Zap } from 'lucide-react'

export function Features() {
  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/20">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Everything you need to succeed
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="p-6 rounded-xl border border-border bg-background space-y-4">
            <Zap className="w-8 h-8 text-accent" />
            <h3 className="text-xl font-semibold">Verified Checklists</h3>
            <p className="text-muted-foreground">
              Every step sourced directly from official government sources. RJSC FAQs, gazette notifications, NBR circulars. Not estimated. Not paraphrased.
            </p>
          </div>

          <div className="p-6 rounded-xl border border-border bg-background space-y-4">
            <Shield className="w-8 h-8 text-accent" />
            <h3 className="text-xl font-semibold">Accurate Fees</h3>
            <p className="text-muted-foreground">
              Fees calculated from official sources. No surprises. Discount eligibility checked automatically.
            </p>
          </div>

          <div className="p-6 rounded-xl border border-border bg-background space-y-4">
            <Users className="w-8 h-8 text-accent" />
            <h3 className="text-xl font-semibold">Plain Language</h3>
            <p className="text-muted-foreground">
              Complex bureaucratic jargon translated into clear, actionable steps anyone can follow.
            </p>
          </div>

          <div className="p-6 rounded-xl border border-border bg-background space-y-4">
            <CheckCircle className="w-8 h-8 text-accent" />
            <h3 className="text-xl font-semibold">Progress Tracking</h3>
            <p className="text-muted-foreground">
              Mark steps as complete. Save your progress. Return anytime and pick up where you left off.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
