"use client";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { toast } from "sonner";

import { EnhancedButton } from "@/components/core/common/enhanced-button";
import { cn } from "@/utils/cn";

export default function HeroButtons() {
  const handleClick = () => {
    toast(
      "CampScholar is currently in private beta. Sign up to get early access!",
    );
  };

  const handleDocumentationClick = () => {
    window.open("https://github.com/CampScholar/CampScholar", "_blank");
  };
  return (
    <>
      <div className="flex flex-col items-center justify-center gap-1">
        <EnhancedButton
          Icon={ArrowRightIcon}
          className={cn("w-full text-lg font-semibold md:w-4/6")}
          iconPlacement="right"
          size={"lg"}
          variant="expandIcon"
          onClick={handleClick}
        >
          Join the Arena
        </EnhancedButton>

        <EnhancedButton
          className="w-3/6"
          size={"lg"}
          variant="linkHover2"
          onClick={handleDocumentationClick}
        >
          CampScholar on GitHub
        </EnhancedButton>
      </div>
    </>
  );
}
