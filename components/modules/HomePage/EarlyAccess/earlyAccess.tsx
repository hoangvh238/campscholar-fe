"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import { Vortex } from "@/components/core/common/vortex";

export function EarlyAccess() {
  return (
    <section
      className="relative flex h-full flex-col items-center justify-center space-y-20 overflow-hidden"
      id="early-access"
    >
      <Vortex
        baseHue={120}
        baseSpeed={0.1}
        className="flex h-screen w-screen flex-col items-center justify-center"
        particleCount={100}
        rangeSpeed={0.5}
        rangeY={800}
      >
        <div className="relative z-10 flex flex-col items-center space-y-8">
          <Image
            priority
            alt="FPT Logo Background"
            className="absolute left-1/2 top-1/2 w-1/3 -translate-x-1/2 -translate-y-52 opacity-70 blur-[35px]"
            height={150}
            src="/images/fpt_logo.svg"
            width={300}
          />
          <Image
            priority
            alt="FPT Logo"
            className="w-3/6 opacity-70"
            height={100}
            src="/images/fpt_logo.svg"
            width={200}
          />
          <motion.h1
            animate={{ opacity: 1, y: 0 }}
            className="text-center font-sans text-3xl font-medium text-white/80 md:text-5xl lg:text-6xl"
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Competition Programming Platform
          </motion.h1>
          <motion.p
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-2xl text-primary-foreground/80 md:text-2xl"
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <span className="bg-gradient-to-r from-osu to-osu bg-clip-text text-3xl font-bold text-transparent">
              for FPTU students
            </span>
          </motion.p>
        </div>
      </Vortex>
    </section>
  );
}
