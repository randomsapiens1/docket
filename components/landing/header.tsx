import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="fixed top-0 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">d</span>
          </div>
          <span className="font-semibold text-lg">docket.bd</span>
        </div>
        <nav className="hidden md:flex gap-8 items-center">
          <a href="#how" className="text-sm text-muted-foreground hover:text-foreground transition">How it works</a>
          <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition">Features</a>
          <a href="#trust" className="text-sm text-muted-foreground hover:text-foreground transition">Why trust us</a>
          <Button className="rounded-full px-6 py-2 h-auto text-sm font-medium">
            Get Started
          </Button>
        </nav>
        <button className="md:hidden px-4 py-2 rounded-lg border border-border">Menu</button>
      </div>
    </header>
  )
}
