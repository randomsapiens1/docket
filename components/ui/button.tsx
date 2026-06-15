'use client'

import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-none border-b-2 border-transparent bg-clip-padding text-base font-bold whitespace-nowrap transition-all outline-none select-none focus:ring-4 focus:ring-yellow-400 focus:bg-yellow-400 focus:text-black active:translate-y-0.5 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-5",
  {
    variants: {
      variant: {
        default: 'bg-primary text-white hover:bg-primary/90 active:shadow-none',
        outline:
          'border-2 border-black bg-background hover:bg-muted text-black active:shadow-none',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80 active:shadow-none',
        ghost:
          'hover:bg-muted hover:text-foreground text-black underline decoration-2 underline-offset-4',
        destructive:
          'bg-destructive text-white hover:bg-destructive/90 active:shadow-none',
        link: 'text-accent underline underline-offset-4 hover:text-accent/80',
      },
      size: {
        default: 'h-12 min-w-[140px] gap-2 px-6',
        xs: "h-8 gap-1 px-3 text-sm",
        sm: "h-10 gap-1.5 px-4 text-sm",
        lg: 'h-14 gap-2.5 px-8 text-lg',
        icon: 'size-12',
        'icon-xs': "size-8",
        'icon-sm': 'size-10',
        'icon-lg': 'size-14',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {}

function Button({
  className,
  variant,
  size,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
