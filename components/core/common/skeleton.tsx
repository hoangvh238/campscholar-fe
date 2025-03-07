"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { motion, HTMLMotionProps } from "framer-motion";

import { cn } from "@/utils/cn";

const skeletonVariants = cva("bg-muted/60 relative overflow-hidden", {
  variants: {
    variant: {
      default: "rounded-md",
      circle: "rounded-full",
      square: "rounded-none",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});
export interface SkeletonProps
  extends HTMLMotionProps<"div">,
    VariantProps<typeof skeletonVariants> {
  shimmer?: boolean;
}

const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, variant, shimmer = true, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        animate={{ opacity: [0.5, 0.8, 0.5] }}
        className={cn(skeletonVariants({ variant, className }))}
        initial={{ opacity: 0.5 }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        {...props}
      >
        {shimmer && (
          <motion.div
            animate={{ translateX: ["0%", "200%"] }}
            className="absolute inset-0 -translate-x-full"
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="h-full w-full bg-gradient-to-r from-transparent dark:via-white/20 via-gray-300 to-transparent" />
          </motion.div>
        )}
      </motion.div>
    );
  },
);
Skeleton.displayName = "Skeleton";

export { Skeleton };
