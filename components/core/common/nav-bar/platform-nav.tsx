"use client";

import { useState, useEffect } from "react";
import { Menu } from "lucide-react";

import { ModeToggle } from "../theme";
import { Button, buttonVariants } from "../button";

import { MainNavigationMenu } from "./navbar";
import { NavIcons } from "./nav-icon";

import { routeList } from "@/helpers/data/constant";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/core/common/sheet";
import webStorageClient from "@/utils/webStorageClient";

export default function PlatformNavbar({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>(null);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = webStorageClient.getToken();
      setToken(storedToken || null);
    }
  }, []);
  return (
    <header className="sticky top-0 z-40 w-full border-b-[1px] bg-white dark:border-b-neutral-500/40 dark:bg-background">
      <div className="container flex h-14 w-screen justify-between px-4">
        <div className="mx-12 flex items-center gap-4 font-bold">
          <NavIcons.logo className="h-6 w-6 text-orange-600" />
          <a className="text-xl font-bold" href="/">
            CampScholar
          </a>
        </div>

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
                <SheetTitle className="text-xl font-bold">
                  CampScholar
                </SheetTitle>
              </SheetHeader>
              <nav className="mt-4 flex flex-col items-center justify-center gap-2">
                {token && children}
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
          {token && children}
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
