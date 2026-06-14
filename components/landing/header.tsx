import { Button } from "@/components/ui/button"
import Image from "next/image"

export function Header() {
  return (
    <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <div className="flex items-center gap-3 group cursor-pointer">
          <Image 
            src="/Docket-logo.png" 
            alt="docket logo" 
            width={32} 
            height={32} 
            priority
            className="w-8 h-8 object-contain"
          />
          <span className="font-bold text-2xl sm:text-3xl tracking-tighter text-foreground">docket</span>
        </div>
...
        <nav className="hidden md:flex gap-8 items-center">
          <a href="#" className="text-sm font-bold text-foreground/80 hover:text-foreground hover:underline decoration-2 underline-offset-4 transition-colors">How it works</a>
          <a href="#" className="text-sm font-bold text-foreground/80 hover:text-foreground hover:underline decoration-2 underline-offset-4 transition-colors">Browse services</a>
          <Button variant="outline" size="sm" className="font-bold">
            Sign in
          </Button>
        </nav>
...
        <button className="md:hidden px-4 py-2 font-bold text-foreground underline decoration-2 underline-offset-4">Menu</button>
      </div>
    </header>
  )
}
