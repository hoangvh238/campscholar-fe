"use client";
import cSvg from "../../../public/icons/c.svg";
import cplusplusSvg from "../../../public/icons/cplusplus.svg";
import csharpSvg from "../../../public/icons/csharp.svg";
import golangSvg from "../../../public/icons/golang.svg";
import haskellSvg from "../../../public/icons/haskell.svg";
import javaSvg from "../../../public/icons/java.svg";
import javascriptSvg from "../../../public/icons/javascript.svg";
import kotlinSvg from "../../../public/icons/kotlin.svg";
import luaSvg from "../../../public/icons/lua.svg";
import phpSvg from "../../../public/icons/php.svg";
import pythonSvg from "../../../public/icons/python.svg";
import rubySvg from "../../../public/icons/ruby.svg";
import rustSvg from "../../../public/icons/rust.svg";
import swiftSvg from "../../../public/icons/swift.svg";
import typeScriptSvg from "../../../public/icons/typescript.svg";

import { cn } from "@/utils/cn";
import Marquee from "@/components/core/common/marquee";

interface SvgProps {
  icon: any;
  size: string;
}

type Component = (props: SvgProps) => JSX.Element;

const SvgAsJsx: Component = ({ icon, size }) => {
  return (
    <img
      alt={icon.alt}
      className={cn("pointer-events-none select-none rounded-md", {
        "h-10 w-10": size === "10",
        "h-9 w-9": size === "9",
        "h-12 w-12": size === "12",
        "h-14 w-14": size === "14",
        "h-16 w-16": size === "16",
        "h-20 w-20": size === "20",
        "h-24 w-24": size === "24",
        "h-44 w-44": size === "44",
      })}
      height={size}
      src={icon.src}
      width={size}
    />
  );
};

const LanguageCard = ({
  label,
  icon,
}: {
  label: string;
  icon: JSX.Element;
}) => {
  return (
    <div
      className={cn(
        "relative cursor-pointer overflow-hidden rounded-xl border p-4",
        // light styles
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <div
          className={cn(
            `relative flex h-12 w-12 items-center justify-center rounded-md`,
          )}
        >
          {icon}
        </div>
        <span className="text-lg font-medium">{label}</span>
      </div>
    </div>
  );
};

const items = [
  { label: "Python", icon: SvgAsJsx({ icon: pythonSvg, size: "44" }) },
  { label: "JavaScript", icon: SvgAsJsx({ icon: javascriptSvg, size: "24" }) },
  { label: "C++", icon: SvgAsJsx({ icon: cplusplusSvg, size: "44" }) },
  { label: "Go", icon: SvgAsJsx({ icon: golangSvg, size: "44" }) },
  { label: "Haskell", icon: SvgAsJsx({ icon: haskellSvg, size: "24" }) },
  { label: "Kotlin", icon: SvgAsJsx({ icon: kotlinSvg, size: "24" }) },
  { label: "C#", icon: SvgAsJsx({ icon: csharpSvg, size: "24" }) },
  { label: "Java", icon: SvgAsJsx({ icon: javaSvg, size: "24" }) },
  { label: "TypeScript", icon: SvgAsJsx({ icon: typeScriptSvg, size: "24" }) },
  { label: "PHP", icon: SvgAsJsx({ icon: phpSvg, size: "24" }) },
  { label: "Swift", icon: SvgAsJsx({ icon: swiftSvg, size: "24" }) },
  { label: "Rust", icon: SvgAsJsx({ icon: rustSvg, size: "24" }) },
  { label: "C", icon: SvgAsJsx({ icon: cSvg, size: "24" }) },
  { label: "Lua", icon: SvgAsJsx({ icon: luaSvg, size: "24" }) },
  { label: "Ruby", icon: SvgAsJsx({ icon: rubySvg, size: "24" }) },
];

const firstRow = items.slice(0, items.length / 2);
const secondRow = items.slice(items.length / 2, items.length);
export function LanguagesBanner() {
  return (
    <>
      <div className="relative flex h-full max-w-7xl flex-col items-center justify-center space-y-20 overflow-hidden py-32">
        <h1 className="xs:text-xl mx-8 w-96 whitespace-normal text-center font-sans text-2xl font-medium md:w-7/12 md:max-w-3xl md:text-4xl">
          Solve problems in all of the programming languages that{" "}
          <span
            className="font-serif font-semibold italic"
            style={{
              background: "linear-gradient(transparent 50%, #FF6600 50%)",
            }}
          >
            we know and love.
          </span>
        </h1>
        <Marquee pauseOnHover className="[--duration:20s]">
          {firstRow.map((lang) => (
            <LanguageCard key={lang.label} {...lang} />
          ))}
        </Marquee>
        <Marquee pauseOnHover reverse className="[--duration:20s]">
          {secondRow.map((lang) => (
            <LanguageCard key={lang.label} {...lang} />
          ))}
        </Marquee>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background" />
      </div>
    </>
  );
}
