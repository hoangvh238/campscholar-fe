"use client";

import Lottie from "lottie-react";

import animationDataDark from "../../../public/lottie/code-dark.json";
import animationDataLight from "../../../public/lottie/code-light.json";

export default function Code() {
  return (
    <>
      <div className="hidden dark:block">
        <Lottie
          autoPlay
          animationData={animationDataDark}
          className="w-[200px] object-contain md:w-[400px] lg:w-[500px]"
          loop={true}
        />
      </div>
      <div className="flex dark:hidden">
        <Lottie
          autoPlay
          animationData={animationDataLight}
          className="w-[200px] object-contain md:w-[400px] lg:w-[500px]"
          loop={true}
        />
      </div>
    </>
  );
}
