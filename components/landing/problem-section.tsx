import { CheckCircle } from 'lucide-react'

export function ProblemSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/20">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Bangladesh bureaucracy shouldn&apos;t require an intermediary
            </h2>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <div className="flex-shrink-0 pt-1">
                  <CheckCircle className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="font-semibold">Scattered Information</p>
                  <p className="text-sm text-muted-foreground">Dozens of portals. Unclear forms. Lost documents.</p>
                </div>
              </li>
              <li className="flex gap-3">
                <div className="flex-shrink-0 pt-1">
                  <CheckCircle className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="font-semibold">Hidden Fees</p>
                  <p className="text-sm text-muted-foreground">Fee structures buried in PDFs. Surprise costs.</p>
                </div>
              </li>
              <li className="flex gap-3">
                <div className="flex-shrink-0 pt-1">
                  <CheckCircle className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="font-semibold">Time & Expense</p>
                  <p className="text-sm text-muted-foreground">People pay intermediaries 10-20% just to navigate.</p>
                </div>
              </li>
            </ul>
          </div>
          <div className="bg-gradient-to-br from-muted to-secondary rounded-xl p-8 h-64 flex items-center justify-center text-center text-muted-foreground">
            <p className="text-sm">Process Navigation Visualization</p>
          </div>
        </div>
      </div>
    </section>
  )
}
