"use client";

import { useAutoAnimate } from "@formkit/auto-animate/react";
import {
  PanelsLeftBottomIcon,
  SettingsIcon,
  TerminalSquareIcon,
} from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useState } from "react";

import animationData from "../../../public/lottie/lottie.json";

import { BorderBeam } from "./beam";
import { items } from "./whyCampScholar";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/core/common/card";
import { cn } from "@/utils/cn";
// import Lottie from "lottie-react";
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });
interface ServiceProps {
  title: string;
  description: string;
  icon: JSX.Element;
  id: number;
}

const serviceList: ServiceProps[] = [
  {
    id: 0,
    title: "CampScholar Platform",
    description:
      "All of our services packaged into this user-friendly, web-based platform.",
    icon: <PanelsLeftBottomIcon className="h-6 w-6 text-osu opacity-80" />,
  },
  {
    id: 1,
    title: "CampScholar Framework",
    description:
      "An extensible backend framework for building competitive programming platforms and organizing custom ICPC-style contests.",
    icon: <SettingsIcon className="h-6 w-6 text-osu opacity-80" />,
  },
  {
    id: 2,
    title: "CampScholar CLI",
    description:
      "A simple command-line interface for interacting with the CampScholar framework through your terminal.",
    icon: <TerminalSquareIcon className="h-6 w-6 text-osu opacity-80" />,
  },
];
export const Services = () => {
  const [parent] = useAutoAnimate({ easing: "linear", duration: 500 });
  const [selectedCard, setSelectedCard] = useState<number | null>(1);
  const handleCardClick = (id: number) => {
    if (selectedCard === id) {
      setSelectedCard(null);
    } else {
      setSelectedCard(id);
    }
  };
  return (
    <section
      className="container w-full max-w-6xl overflow-hidden py-4"
      id="services"
    >
      <div className="grid place-items-center items-start gap-12 lg:grid-cols-[1fr,1fr]">
        <div>
          <h2 className="text-center font-sans text-3xl font-medium md:text-left md:text-4xl">
            The{" "}
            <span className="bg-gradient-to-br from-osu to-osu bg-clip-text font-serif font-semibold italic text-transparent">
              Ultimate{" "}
            </span>
            Coding Arena
          </h2>

          <p className="mt-4 text-center text-xl text-muted-foreground md:text-left">
            Whether you&apos;re a beginner or an seasoned veteran in competitive
            programming, we&apos;ve got you covered.
          </p>

          <i className="mx-auto hidden w-full text-center text-lg text-muted-foreground md:block md:text-left">
            Select a service to learn more.
          </i>

          <div className="mt-4 hidden flex-col gap-8 md:flex">
            {serviceList.map(
              ({ icon, title, description, id }: ServiceProps) => (
                <Card
                  key={title}
                  className={cn(
                    "cursor-pointer transition-all duration-300",
                    selectedCard === id && "scale-95 bg-osu/10",
                  )}
                  onClick={() => handleCardClick(id)}
                >
                  <CardHeader className="flex items-start justify-start gap-4 space-y-1 md:flex-row">
                    <div className="mt-1 rounded bg-neutral-100 p-1 shadow dark:bg-neutral-900">
                      {icon}
                    </div>
                    <div>
                      <CardTitle>{title}</CardTitle>
                      <CardDescription className="text-md mt-2">
                        {description}
                      </CardDescription>
                    </div>
                  </CardHeader>
                </Card>
              ),
            )}
          </div>
        </div>
        <div className="mt-4 flex flex-col gap-8 md:hidden">
          {serviceList.map(({ icon, title, description }: ServiceProps) => (
            <Card key={title}>
              <CardHeader className="flex items-start justify-start gap-4 space-y-1 md:flex-row">
                <div className="mt-1 rounded bg-neutral-100 p-1 shadow dark:bg-neutral-900">
                  {icon}
                </div>
                <div>
                  <CardTitle>{title}</CardTitle>
                  <CardDescription className="text-md mt-2">
                    {description}
                  </CardDescription>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
        <div ref={parent} className="hidden justify-center md:flex">
          {selectedCard === 0 ? (
            <>
              <PlatformItems />
            </>
          ) : selectedCard === 1 ? (
            <FrameworkExample />
          ) : (
            <>
              <LottieAnimation />
            </>
          )}
        </div>
      </div>
    </section>
  );
};

const PlatformItems = () => {
  return (
    <div className="m-4 grid max-h-[600px] grid-cols-1 gap-4 overflow-scroll p-2">
      {items.slice(1, 4).map((item: any) => (
        <div key={item.title} className="flex flex-col gap-4">
          <div>{item.header}</div>
        </div>
      ))}
    </div>
  );
};

const LottieAnimation = () => {
  return (
    <Lottie
      autoPlay
      animationData={animationData}
      className="w-[200px] object-contain md:w-[400px] lg:w-[500px]"
      loop={true}
    />
  );
};

const FrameworkExample = () => {
  return (
    <div className="relative rounded-lg">
      <Image
        alt="CampScholar Framework"
        className={cn(
          "hidden dark:flex",
          "rounded-lg shadow-lg",
          "object-cover",
          "w-full sm:h-[300px] md:h-[400px] lg:h-[700px]",
        )}
        height={500}
        src="/demo/framework.svg"
        width={600}
      />
      <Image
        alt="CampScholar Framework"
        className={cn(
          "flex dark:hidden",
          "rounded-lg shadow-lg",
          "object-cover",
          "w-full sm:h-[300px] md:h-[400px] lg:h-[700px]",
        )}
        height={500}
        src="/demo/framework-light.svg"
        width={600}
      />
      <BorderBeam />
    </div>
  );
};
