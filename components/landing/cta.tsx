import { Button } from "@/components/ui/button"

export function CTA() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-primary text-primary-foreground">
      <div className="max-w-3xl mx-auto text-center space-y-8">
        <div className="space-y-4">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Ready to cut through the bureaucracy?
          </h2>
          <p className="text-lg opacity-90">
            Start your first process today. No signup. No credit card. Just clear, verified guidance.
          </p>
        </div>
        <Button className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 rounded-full px-8 py-3 h-auto font-semibold">
          Get Started Free
        </Button>
      </div>
    </section>
  )
}
