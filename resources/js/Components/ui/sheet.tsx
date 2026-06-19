import * as React from "react"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

type SheetProps = {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  children: React.ReactNode
}

export function Sheet({ open, onOpenChange, children }: SheetProps) {
  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/30 backdrop-blur-xs transition-opacity animate-in fade-in duration-300"
        onClick={() => onOpenChange?.(false)}
      />
      {/* Content */}
      {children}
    </div>
  )
}

export function SheetContent({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "relative z-50 h-full w-full max-w-md bg-background shadow-2xl transition-transform duration-300 ease-out animate-in slide-in-from-right flex flex-col gap-0",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export function SheetHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("flex flex-col space-y-1.5 text-left", className)}
      {...props}
    />
  )
}

export function SheetTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2
      className={cn("text-lg font-semibold text-foreground", className)}
      {...props}
    />
  )
}
