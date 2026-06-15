'use client'

import Image from "next/image"

export function Footer() {
  return (
    <footer className="border-t border-border py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Image 
                src="/Docket-logo.png" 
                alt="docket logo" 
                width={24} 
                height={24} 
                className="w-6 h-6 object-contain"
              />
              <span className="text-2xl font-bold tracking-tight">docket</span>
            </div>
            <p className="text-sm text-muted-foreground">Making government processes accessible to everyone.</p>
          </div>
          <div className="space-y-4">
            <h4 className="font-semibold text-sm">Product</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition">RJSC Registration</a></li>
              <li><a href="#" className="hover:text-foreground transition">Roadmap</a></li>
              <li><a href="#" className="hover:text-foreground transition">Pricing</a></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="font-semibold text-sm">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition">About</a></li>
              <li><a href="#" className="hover:text-foreground transition">Blog</a></li>
              <li><a href="#" className="hover:text-foreground transition">Contact</a></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="font-semibold text-sm">Legal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition">Privacy</a></li>
              <li><a href="#" className="hover:text-foreground transition">Terms</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border pt-8 flex flex-col sm:flex-row justify-between items-center text-sm text-muted-foreground">
          <p>&copy; 2026 docket. All rights reserved.</p>
          <p>Made in Bangladesh for Bangladeshis.</p>
        </div>
      </div>
    </footer>
  )
}
