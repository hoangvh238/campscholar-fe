import { Skeleton } from "../skeleton";

import { cn } from "@/utils/cn";

export function EditorSkeleton() {
  return (
    <>
      <Skeleton
        className={cn(
          "min-h-[85dvh] min-w-full",
          "rounded-none dark:bg-neutral-900",
        )}
      />
    </>
  );
}
