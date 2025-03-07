"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import { CodeSandboxLogoIcon } from "@radix-ui/react-icons";

import { ModeToggle } from "../theme";
import { Button, buttonVariants } from "../button";
import { MainNavigationMenu } from "../nav-bar/navbar";

import { routeList } from "@/helpers/data/constant";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/core/common/sheet";

// TODO: Feed these props from Zustand (global state solution)
export default function EditorNavbar({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <header className="top-0 z-40 w-full border-b-[1px] bg-white dark:border-b-neutral-500/40 dark:bg-background">
      <div className="container flex h-14 w-screen justify-between px-4">
        <div className="mx-6 flex items-center gap-2 font-bold">
          <CodeSandboxLogoIcon />
          <a className="text-xl" href="/">
            NextJudge
          </a>
        </div>

        {/* <EditorThemeSelector
          onSelect={onSelect}
          themes={themes}
          selectedTheme={selectedTheme}
        /> */}

        {/* mobile */}
        <div className="mx-4 flex items-center justify-center gap-8 md:hidden">
          <ModeToggle />
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="px-2">
              <Button variant="ghost">
                <Menu className="h-5 w-5" onClick={() => setIsOpen(true)} />
              </Button>
            </SheetTrigger>

            <SheetContent side={"left"}>
              <SheetHeader>
                <SheetTitle className="text-xl font-bold">NextJudge</SheetTitle>
              </SheetHeader>
              <nav className="mt-4 flex flex-col items-center justify-center gap-2">
                {routeList.map(({ href, label }) => (
                  <a
                    key={label}
                    className={buttonVariants({ variant: "ghost" })}
                    href={href}
                    onClick={() => setIsOpen(false)}
                  >
                    {label}
                  </a>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>

        <div className="mx-12 hidden flex-row items-center justify-center gap-4 md:flex">
          <MainNavigationMenu />
          {children}
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
