"use client";

import Link from "next/link";
import React from "react";

import { LoginForm } from "./LoginForm";

import { ModeToggle } from "@/components/core/common/theme";
import { cn } from "@/utils/cn";
import { buttonVariants } from "@/components/core/common/button";
import Code from "@/components/core/common/code";

function SignInModule() {
  return (
    <>
      <div className="absolute left-4 top-4 z-50">
        <ModeToggle />
      </div>
      <div className="container relative hidden h-[800px] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            {/* Login Form */}
            <LoginForm />
          </div>
        </div>
        <div className="relative hidden h-full flex-col px-10 pt-10 text-black dark:border-r dark:text-white lg:flex">
          <Link
            className={cn(
              buttonVariants({ variant: "link" }),
              "absolute right-4 top-4 z-50 text-black dark:text-white md:right-8 md:top-16",
            )}
            href="/auth/signup"
          >
            Sign up
          </Link>

          <div className="relative z-20 mt-auto" id="lottie-panel">
            <Code />
          </div>
        </div>
      </div>
    </>
  );
}

export default SignInModule;
