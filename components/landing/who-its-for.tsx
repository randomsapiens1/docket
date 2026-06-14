export function WhoItsFor() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            For anyone navigating Bangladesh bureaucracy
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-8 rounded-xl border border-border space-y-4">
            <h3 className="font-semibold text-lg">First-Time Founders</h3>
            <p className="text-muted-foreground">
              Don&apos;t have a lawyer. Need to register a company. docket guides you step by step.
            </p>
          </div>

          <div className="p-8 rounded-xl border border-border space-y-4">
            <h3 className="font-semibold text-lg">Small Business Owners</h3>
            <p className="text-muted-foreground">
              Save 10-20% that you&apos;d pay an intermediary. Get verified guidance in minutes.
            </p>
          </div>

          <div className="p-8 rounded-xl border border-border space-y-4">
            <h3 className="font-semibold text-lg">Professionals</h3>
            <p className="text-muted-foreground">
              Lawyers, consultants & NGO staff use docket as a verified reference.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
