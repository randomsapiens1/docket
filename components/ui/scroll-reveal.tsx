'use client'

import React, { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

interface ScrollRevealProps {
  children: React.ReactNode
  className?: string
  animation?: 'fade-in' | 'slide-up' | 'slide-down' | 'slide-left' | 'slide-right' | 'scale-up'
  delay?: number // ms
  duration?: number // ms
  threshold?: number // 0 to 1
}

export function ScrollReveal({
  children,
  className,
  animation = 'slide-up',
  delay = 0,
  duration = 600,
  threshold = 0.05
}: ScrollRevealProps) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [threshold])

  const animationStyles = {
    'fade-in': 'opacity-0 data-[visible=true]:opacity-100',
    'slide-up': 'opacity-0 translate-y-10 data-[visible=true]:opacity-100 data-[visible=true]:translate-y-0',
    'slide-down': 'opacity-0 -translate-y-10 data-[visible=true]:opacity-100 data-[visible=true]:translate-y-0',
    'slide-left': 'opacity-0 translate-x-10 data-[visible=true]:opacity-100 data-[visible=true]:translate-x-0',
    'slide-right': 'opacity-0 -translate-x-10 data-[visible=true]:opacity-100 data-[visible=true]:translate-x-0',
    'scale-up': 'opacity-0 scale-95 data-[visible=true]:opacity-100 data-[visible=true]:scale-100',
  }[animation]

  return (
    <div
      ref={ref}
      data-visible={isVisible}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
      }}
      className={cn(
        "transition-all ease-out transform-gpu",
        animationStyles,
        className
      )}
    >
      {children}
    </div>
  )
}
