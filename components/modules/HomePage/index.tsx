"use client";

import Image from "next/image";

import { WhyCampScholar } from "./whyCampScholar";
import { Services } from "./services";
import { EarlyAccess } from "./EarlyAccess/earlyAccess";
import { ScrollToTop } from "./scrollUp";
import { LanguagesBanner } from "./banner";
import { FAQ } from "./faq";
import { AltHero } from "./Hero/altHero";
function HomePageModule() {
  return (
    <>
      <main className="flex max-w-full flex-col items-center justify-between gap-10 overflow-x-hidden">
        <Image
          alt="background"
          className="absolute left-0 top-0 -z-50 mx-auto h-auto w-1/3 bg-transparent opacity-70 blur-[200px] backdrop-filter dark:hidden"
          height={50}
          priority={true}
          src="/blobs/blob1.svg"
          width={100}
        />
        <Image
          alt="background"
          className="absolute right-0 top-0 -z-50 h-auto w-3/6 bg-transparent opacity-50 blur-[200px] backdrop-filter dark:hidden"
          height={50}
          priority={true}
          src="/blobs/blob1.svg"
          width={100}
        />
        <AltHero />
        <Image
          alt="background"
          className="absolute bottom-20 left-0 -z-50 mx-auto hidden h-full w-full translate-y-2/4 scale-100 bg-transparent opacity-70 blur-[250px] backdrop-filter dark:block dark:2xl:hidden"
          height={50}
          priority={true}
          src="/blobs/blob1.svg"
          width={100}
        />
        {/* TODO: Figure out how to optimize this across all devices */}
        <WhyCampScholar />
        <Services />
        <LanguagesBanner />
        <EarlyAccess />
        <FAQ />
        <ScrollToTop />
      </main>
    </>
  );
}

export default HomePageModule;
