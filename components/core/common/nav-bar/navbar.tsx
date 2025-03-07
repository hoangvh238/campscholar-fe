"use client";

import { useEffect, useState } from "react";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { Menu, Pyramid } from "lucide-react";
import Link from "next/link";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";

import { Button, buttonVariants } from "@/components/core/common/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/core/common/sheet";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/core/common/navigation-menu";
import {
  directoryRoutes,
  platformRoutes,
  routeList,
  instructorRoutes,
} from "@/helpers/data/constant";
import { cn } from "@/utils/cn";
import { ModeToggle } from "@/components/core/common/theme";
import { RootState } from "@/store";

export function Navbar() {
  const [pin] = useState<string | null>(null);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const pin = localStorage.getItem("pin");
      if (pin) {
        localStorage.setItem("pin", pin);
      }
    }
  }, []);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <header className="sticky top-0 z-40 mx-auto flex w-screen max-w-7xl items-center justify-between bg-transparent p-8 backdrop-blur-lg md:relative">
      <NavigationMenu
        className={cn("flex w-full max-w-full items-center justify-between")}
      >
        <div className="flex w-full items-center justify-start align-middle">
          {/* <NavIcons.logo className="text-orange-600 translate-y-[0.8px]" /> */}
          <Link passHref className="ml-3 text-xl" href="/">
            Campscholar
          </Link>
        </div>
        <div className="flex md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="px-2">
              <Button className={cn("self-end")} variant="ghost">
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
                <ModeToggle />
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
                <a
                  className={`w-[110px] border ${buttonVariants({
                    variant: "secondary",
                  })}`}
                  href="https://github.com/CampScholar/CampScholar"
                  rel="noreferrer"
                  target="_blank"
                >
                  <GitHubLogoIcon className="mr-2 h-5 w-5" />
                  Github
                </a>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
        {/* desktop */}
        <NavigationMenuList className="hidden w-full items-center justify-center md:flex">
          {routeList.map((route, i) => (
            <a
              key={i}
              className={`text-[17px] ${buttonVariants({
                variant: "ghost",
              })}`}
              href={route.href}
            >
              {route.label}
            </a>
          ))}
        </NavigationMenuList>
        <div className="hidden w-full justify-end md:flex">
          <NavigationMenuItem className="flex items-center justify-end gap-4">
            <ModeToggle />
            <div className="hidden items-center gap-0">
              <Link
                className={cn(
                  `text-base text-black dark:text-white ${buttonVariants({
                    variant: "link",
                  })}`,
                )}
                href="/auth/login"
              >
                Login
              </Link>
              <Link
                className={cn(
                  `text-base text-black dark:text-white ${buttonVariants({
                    variant: "link",
                  })}`,
                )}
                href="/auth/signup"
              >
                Sign Up
              </Link>
            </div>
          </NavigationMenuItem>
        </div>
      </NavigationMenu>
    </header>
  );
}

export function MainNavigationMenu() {
  const infos = directoryRoutes.infosNav[0];
  const [token, setToken] = useState<string | null>(null);

  const scope = useSelector((state: RootState) => state.user.scope);
  const isInstructor = scope?.some((s) => s.startsWith("Instructor_"));

  const navigationRoutes = isInstructor ? instructorRoutes : platformRoutes;
  useEffect(() => {
    const storedToken = Cookies.get("_access_token") || null;
    setToken(storedToken);
  }, []);
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>{infos.title}</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <a
                  className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                  href={`/platform/problems/random`}
                >
                  <Pyramid className="h-10 w-10" />
                  <div className="text-gradient_blaze-orange mb-2 mt-3 text-lg font-medium">
                    Jump right in!
                  </div>
                  <p className="text-sm leading-tight text-muted-foreground">
                    Go straight to our first problem and start solving!
                  </p>
                </a>
              </li>
              {infos.items?.map((info) => (
                <li key={info.title}>
                  <ListItem key={info.title} {...info} />
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        {navigationRoutes
          .filter((link) => !(link.label === "Sign-in" && token))
          .map((link: any) => (
            <NavigationMenuItem key={link.label}>
              <a className={navigationMenuTriggerStyle()} href={link.href}>
                {link.label}
              </a>
            </NavigationMenuItem>
          ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem: React.FC<any> = ({
  title,
  href,
  description,
  disabled,
  external,
}) => {
  const target = external ? "_blank" : undefined;
  return (
    <a
      className={cn(
        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
        disabled
          ? "text-muted-foreground hover:bg-transparent hover:text-muted-foreground"
          : "",
      )}
      href={disabled ? undefined : href}
      target={target}
    >
      <div className="flex items-center justify-between">
        <span className="mr-2">{title}</span>
      </div>
      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
        {description}
      </p>
    </a>
  );
};
ListItem.displayName = "ListItem";

export function PlatformNavbar() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <header className="sticky top-0 z-40 w-full border-b-[1px] bg-white dark:border-b-neutral-500/40 dark:bg-background">
      <div className="container flex h-14 w-screen justify-between px-4">
        <div className="flex items-center font-bold">
          <Pyramid className="h-10 w-10" />
          <a className="ml-3 flex text-xl font-bold" href="/">
            CampScholar
          </a>
        </div>
        <div className="flex md:hidden">
          <ModeToggle />
          {/* mobile */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger className="px-2">
              <Menu
                className="flex h-5 w-5 md:hidden"
                onClick={() => setIsOpen(true)}
              >
                <span className="sr-only">Menu Icon</span>
              </Menu>
            </SheetTrigger>

            <SheetContent side={"left"}>
              <SheetHeader>
                <SheetTitle className="text-xl font-bold">
                  CampScholar
                </SheetTitle>
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

        <div className="hidden items-center justify-center gap-4 md:flex">
          <MainNavigationMenu />
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
