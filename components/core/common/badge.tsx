import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/utils/cn";

const badgeVariants = cva(
  "inline-flex items-center rounded-md border font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground dark:bg-primary-dark dark:text-primary-foreground-dark shadow hover:bg-primary/80 dark:hover:bg-primary-dark/80",
        secondary: "border-transparent bg-secondary text-secondary-foreground dark:bg-secondary-dark dark:text-secondary-foreground-dark hover:bg-secondary/80 dark:hover:bg-secondary-dark/80",
        destructive: "border-transparent bg-destructive text-destructive-foreground dark:bg-destructive-dark dark:text-destructive-foreground-dark shadow hover:bg-destructive/80 dark:hover:bg-destructive-dark/80",
        outline: "text-foreground dark:text-foreground-dark",
        success: "border-transparent bg-green-500 text-white dark:bg-green-700 dark:text-white shadow hover:bg-green-600 dark:hover:bg-green-800",
        error: "border-transparent bg-red-500 text-white dark:bg-red-700 dark:text-white shadow hover:bg-red-600 dark:hover:bg-red-800",
        warning: "border-transparent bg-yellow-500 text-white dark:bg-yellow-700 dark:text-white shadow hover:bg-yellow-600 dark:hover:bg-yellow-800",
      },
      size: {
        sm: "px-2 py-0.5 text-xs",
        md: "px-3 py-1 text-sm",
        lg: "px-4 py-1.5 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);


export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {
  size?: "sm" | "md" | "lg";
}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }

