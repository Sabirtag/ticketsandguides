
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { ButtonMandala } from "@/assets/mandala-patterns"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 relative overflow-hidden group",
  {
    variants: {
      variant: {
        default: "bg-[rgba(100,73,37,255)] text-primary-foreground hover:bg-[rgba(100,73,37,0.9)]",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-[rgba(100,73,37,255)] bg-background text-[rgba(100,73,37,255)] hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        mandala: "bg-[rgba(100,73,37,255)] text-primary-foreground hover:bg-[rgba(100,73,37,0.9)] border border-[rgba(224,193,143,0.3)]",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    
    // Create a single React element that contains all children and the mandala
    const buttonContent = (
      <React.Fragment>
        {children}
        <div className="absolute inset-0 w-full h-full flex items-center justify-center opacity-0 group-hover:opacity-15 transition-opacity duration-300">
          <ButtonMandala className="text-white transform scale-150" />
        </div>
      </React.Fragment>
    )
    
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {buttonContent}
      </Comp>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
