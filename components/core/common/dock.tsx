"use client"

import { cn } from "@/utils/cn"
import * as React from "react"

const Dock = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex h-16 items-center justify-center rounded-full bg-background/80 p-2 backdrop-blur-sm",
      className,
    )}
    {...props}
  />
))
Dock.displayName = "Dock"

const DockIcon = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("group relative flex items-center justify-center", className)} {...props} />
  ),
)
DockIcon.displayName = "DockIcon"

export { Dock, DockIcon }

