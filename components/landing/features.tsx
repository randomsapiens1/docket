import { CheckCircle, Shield, Users, Zap } from 'lucide-react'

export function Features() {
  return (
    <section id="features" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-secondary/20 border-t border-border">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-black">
            Everything you need to succeed
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            We simplify the complexity of government bureaucracy into actionable pathways.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
          <div className="p-6 sm:p-8 border-[3px] border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] space-y-4">
            <div className="w-12 h-12 bg-[#ff0000] flex items-center justify-center border-2 border-black">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl sm:text-2xl font-black uppercase italic">Verified Checklists</h3>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              Every step sourced directly from official government sources. RJSC FAQs, gazette notifications, NBR circulars. Not estimated. Not paraphrased.
            </p>
          </div>

          <div className="p-6 sm:p-8 border-[3px] border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] space-y-4">
            <div className="w-12 h-12 bg-[#ff0000] flex items-center justify-center border-2 border-black">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl sm:text-2xl font-black uppercase italic">Accurate Fees</h3>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              Fees calculated from official sources. No surprises. Discount eligibility checked automatically.
            </p>
          </div>

          <div className="p-6 sm:p-8 border-[3px] border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] space-y-4">
            <div className="w-12 h-12 bg-[#ff0000] flex items-center justify-center border-2 border-black">
              <Users className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl sm:text-2xl font-black uppercase italic">Plain Language</h3>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              Complex bureaucratic jargon translated into clear, actionable steps anyone can follow.
            </p>
          </div>

          <div className="p-6 sm:p-8 border-[3px] border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] space-y-4">
            <div className="w-12 h-12 bg-[#ff0000] flex items-center justify-center border-2 border-black">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl sm:text-2xl font-black uppercase italic">Progress Tracking</h3>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              Mark steps as complete. Save your progress. Return anytime and pick up where you left off.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
