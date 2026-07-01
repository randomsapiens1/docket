'use client'

import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-none border-b-2 border-transparent bg-clip-padding text-base font-bold whitespace-nowrap transition-all duration-200 outline-none select-none focus:ring-4 focus:ring-yellow-400 focus:bg-yellow-400 focus:text-black disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-5",
  {
    variants: {
      variant: {
        default: 'bg-primary/90 backdrop-blur-sm text-white border border-white/10 hover:bg-primary hover:shadow-lg hover:shadow-primary/30 hover:scale-[1.02] active:scale-[0.98]',
        outline:
          'border-2 border-black bg-white/60 backdrop-blur-sm hover:bg-white hover:shadow-md hover:scale-[1.02] active:scale-[0.98] text-black',
        secondary:
          'bg-secondary/80 backdrop-blur-sm text-secondary-foreground hover:bg-secondary hover:shadow-md hover:scale-[1.02] active:scale-[0.98]',
        ghost:
          'hover:bg-white/60 hover:backdrop-blur-sm hover:text-foreground hover:shadow-sm text-black underline decoration-2 underline-offset-4',
        destructive:
          'bg-destructive/90 backdrop-blur-sm text-white border border-white/10 hover:bg-destructive hover:shadow-lg hover:shadow-destructive/30 hover:scale-[1.02] active:scale-[0.98]',
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
