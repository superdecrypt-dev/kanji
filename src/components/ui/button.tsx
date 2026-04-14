import * as React from "react"
import { cn } from "../../lib/utils"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link' | 'success' | 'glass'
  size?: 'default' | 'sm' | 'lg' | 'icon'
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', ...props }, ref) => {
    const variants = {
      default: "bg-primary text-white hover:bg-primary/90 shadow-[0_4px_14px_0_rgba(229,57,53,0.3)]",
      destructive: "bg-red-500 text-white hover:bg-red-600",
      outline: "border-2 border-border bg-background hover:bg-secondary hover:border-foreground/20",
      secondary: "bg-secondary border border-border text-foreground hover:bg-secondary/80",
      ghost: "hover:bg-secondary hover:text-foreground",
      link: "text-primary underline-offset-4 hover:underline",
      success: "bg-green-500 text-white hover:bg-green-600",
      glass: "bg-card border border-border hover:border-foreground/20 text-foreground",
    }

    const sizes = {
      default: "h-12 px-6 py-2.5 text-sm rounded-xl",
      sm: "h-10 rounded-lg px-4 text-sm",
      lg: "h-14 rounded-xl px-8 text-base",
      icon: "h-10 w-10 rounded-full",
    }

    return (
      <button
        className={cn(
          "inline-flex items-center justify-center font-bold tracking-tight transition-all duration-200 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          variants[variant],
          sizes[size],
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
