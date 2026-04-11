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
      default: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20",
      destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-lg shadow-destructive/20",
      outline: "border-2 border-primary/20 bg-white/5 backdrop-blur-md hover:bg-primary/10 hover:border-primary/40",
      secondary: "bg-white/10 backdrop-blur-md border border-white/20 text-foreground hover:bg-white/20",
      ghost: "hover:bg-primary/10 hover:text-primary",
      link: "text-primary underline-offset-4 hover:underline",
      success: "bg-success text-success-foreground hover:bg-success/90 shadow-lg shadow-success/20",
      glass: "bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 shadow-xl",
    }

    const sizes = {
      default: "h-14 px-8 py-3 text-base rounded-2xl",
      sm: "h-11 rounded-xl px-4",
      lg: "h-20 rounded-3xl px-12 text-xl",
      icon: "h-14 w-14 rounded-full",
    }

    return (
      <button
        className={cn(
          "inline-flex items-center justify-center font-black tracking-tight ring-offset-background transition-all duration-300 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
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
