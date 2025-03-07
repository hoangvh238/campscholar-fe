import { GitHubLogoIcon } from "@radix-ui/react-icons";
import Image from "next/image";

import { Button, buttonVariants } from "@/components/core/common/button";
export const Hero = () => {
  return (
    <section className="container grid place-items-center gap-10 py-20 md:py-32 lg:grid-cols-2">
      <div className="space-y-6 text-center lg:text-start">
        <main className="text-5xl font-bold md:text-6xl">
          <h1 className="inline">
            <span className="inline bg-gradient-to-r from-osu to-osubrown bg-clip-text text-transparent">
              Next Generation
            </span>{" "}
            Platform
          </h1>{" "}
          for{" "}
          <h2 className="inline">
            <span className="inline bg-gradient-to-r from-osubrown to-osu bg-clip-text text-transparent">
              Competitive
            </span>{" "}
            Programming
          </h2>
        </main>

        <p className="mx-auto text-xl text-muted-foreground md:w-10/12 lg:mx-0">
          CampScholar is a modern, open-source platform for hosting and
          partaking in competitive programming. It is designed to be easy to
          use, fast, and extensible.
        </p>

        <div className="space-y-4 md:space-x-4 md:space-y-0">
          <Button className="w-full md:w-1/3">
            <a href="/platform">Get Started</a>
          </Button>
          <a
            className={`w-full md:w-1/3 ${buttonVariants({
              variant: "outline",
            })}`}
            href="https://github.com/CampScholar/CampScholar"
            rel="noreferrer"
            target="_blank"
          >
            Github Repository
            <GitHubLogoIcon className="ml-2 h-5 w-5" />
          </a>
        </div>
      </div>

      {/* Hero preview */}
      <div className="z-10 lg:scale-125">
        <Image
          alt="Editor Preview"
          className="h-fit w-fit rounded-lg bg-black ring-1 ring-osu/20 lg:h-full lg:w-full"
          height={1000}
          src="/preview.png"
          width={1000}
        />
      </div>
      <div className="shadow-anim" />
    </section>
  );
};
