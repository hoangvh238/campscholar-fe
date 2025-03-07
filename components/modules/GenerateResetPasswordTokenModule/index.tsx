"use client";
import React from "react";

import { GenerateResetPasswordTokenForm } from "./GenerateResetPasswordTokenForm";

import { ModeToggle } from "@/components/core/common/theme";
import Code from "@/components/core/common/code";

function GenerateResetPasswordTokenModule() {
  return (
    <>
      <div className="absolute left-4 top-4 z-50">
        <ModeToggle />
      </div>
      <div className="container relative hidden h-[800px] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            {/* Generate Reset Password Token Form */}
            <GenerateResetPasswordTokenForm />
          </div>
        </div>
        <div className="relative h-full flex-col px-10 pt-10 text-black dark:border-r dark:text-white lg:flex">
          <div className="relative z-20 my-auto" id="lottie-panel">
            <Code />
          </div>
        </div>
      </div>
    </>
  );
}

export default GenerateResetPasswordTokenModule;
