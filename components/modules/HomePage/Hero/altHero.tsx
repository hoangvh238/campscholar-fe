import HeroButtons from "./heroButton";
import { PreviewVideo } from "./video";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
} from "@/components/core/common/tooltip";
import { cn } from "@/utils/cn";

export function AltHero() {
  return (
    <section className="container relative grid place-items-center gap-10 py-2 md:py-8 lg:grid-cols-1 lg:pt-4">
      <TooltipProvider>
        <div className="space-y-6 text-center">
          <div className="mx-auto flex items-center justify-center">
            <a href="#early-access">
              <Tooltip delayDuration={0}>
                <TooltipContent
                  className={cn("text-sm", "scale-90")}
                  side="right"
                  sideOffset={5}
                >
                  <p className="text-sm">
                    <span className="font-semibold">Click here</span> to join
                    the waitlist for early access.
                    <br />
                  </p>
                </TooltipContent>
              </Tooltip>
            </a>
          </div>
          <h1 className="font-sans text-3xl font-medium md:text-5xl lg:text-6xl">
            Elevate your coding skills <br /> to the
            <span className="bg-gradient-to-r from-osu to-osu bg-clip-text font-serif italic text-transparent">
              {" "}
              next level.
            </span>
          </h1>

          <p className="mx-auto mt-2 max-w-sm font-medium text-muted-foreground md:max-w-xl">
            Meet the next generation platform for competitive programming.
            Beautiful out of the box, extensible, and optimized for maximum
            performance.
          </p>
          <HeroButtons />
        </div>
      </TooltipProvider>
      <PreviewVideo />
    </section>
  );
}
