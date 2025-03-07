"use client";
import { BorderBeam } from "../beam";

import { cn } from "@/utils/cn";
import { Card } from "@/components/core/common/card";

export function PreviewVideo() {
  return (
    <>
      <Card
        className={cn(
          "min-w-7xl relative hidden flex-col items-center rounded-lg border-muted bg-neutral-950 dark:flex dark:justify-center",
        )}
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full max-w-7xl rounded-lg border border-muted bg-neutral-950 object-cover p-2 shadow-osu sm:h-[300px] md:h-[400px] lg:h-full"
          controls={false}
          height="100%"
          preload="auto"
          src="/demo/new-dark.webm"
          title="CampScholar Demo"
          typeof="video/webm"
          width="100%"
        >
          <source src={"/demo/new-dark.webm"} type="video/webm" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute bottom-0 left-0 hidden h-5/6 w-full bg-gradient-to-t from-neutral-950 via-neutral-950/95 to-neutral-950/5 md:block" />
        <BorderBeam />
      </Card>
      <Card
        className={cn(
          "min-w-7xl relative flex flex-col items-center justify-center rounded-lg border-muted bg-white dark:hidden",
        )}
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full max-w-7xl rounded-lg border border-muted bg-white object-cover p-2 shadow-xl sm:h-[300px] md:h-[400px] lg:h-full"
          controls={false}
          height="100%"
          preload="auto"
          src="/demo/new-light.webm"
          title="CampScholar Demo"
          typeof="video/webm"
          width="100%"
        >
          <source src={"/demo/new-light.webm"} type="video/webm" />
          Your browser does not support the video tag.
        </video>
        {/* Gradient Mask */}
        {/* <div className="hidden md:block absolute bottom-0 left-0 w-full h-5/6 bg-gradient-to-t from-neutral-100 to-neutral-100/5 via-neutral-100/95"></div> */}
        <BorderBeam />
      </Card>
    </>
  );
}
