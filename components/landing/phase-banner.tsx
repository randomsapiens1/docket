'use client'

import { useState, useEffect } from 'react'
import { X } from 'lucide-react'

export function PhaseBanner() {
  const [isVisible, setIsVisible] = useState(false)

  // Show after a short delay for a "popup" effect
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 1000)
    return () => clearTimeout(timer)
  }, [])

  if (!isVisible) return null

  return (
    <div className="fixed bottom-6 right-6 z-[100] max-w-sm bg-white border-2 border-black p-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <button 
        onClick={() => setIsVisible(false)}
        className="absolute top-2 right-2 p-1 hover:bg-gray-100 transition-colors"
        aria-label="Dismiss"
      >
        <X className="w-4 h-4" />
      </button>
      
      <div className="flex flex-col gap-3 pr-6">
        <div className="flex items-center gap-2">
          <strong className="bg-[#ff0000] text-white px-2 py-0.5 font-bold uppercase tracking-wide text-[10px]">
            Beta
          </strong>
          <span className="font-bold text-sm">New Service</span>
        </div>
        <p className="text-sm text-gray-700 leading-relaxed">
          This is a new service – your <a href="#" className="text-[#ff0000] underline font-bold hover:text-[#ff0000]/80">feedback</a> will help us to improve it.
        </p>
      </div>
    </div>
  )
}
