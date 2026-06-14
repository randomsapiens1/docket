import { ArrowRight } from 'lucide-react'
import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto text-center space-y-8">
        <div className="space-y-4">
          <div className="inline-block px-3 py-1 rounded-full border border-border bg-secondary text-secondary-foreground text-xs font-medium">
            Simplifying Bangladesh Government Processes
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-pretty">
            Government processes that make sense
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground text-pretty">
            Stop paying intermediaries. Stop guessing. Get verified, step-by-step guidance for any official process you need to complete—from company registration to land transfers, all in one place.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Button className="rounded-full px-8 py-3 h-auto font-semibold flex items-center justify-center gap-2">
            Start Free <ArrowRight className="w-4 h-4" />
          </Button>
          <Button variant="outline" className="rounded-full px-8 py-3 h-auto font-semibold">
            Watch Demo
          </Button>
        </div>
      </div>
    </section>
  )
}
