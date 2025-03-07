import { Button } from "@/components/core/common/button";
import { Separator } from "@/components/core/common/separator";
import { PlusCircle } from "lucide-react";

function ProblemLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="hidden w-full max-w-7xl space-y-6 px-10 py-10 md:block">

      <div className="flex items-center justify-between">
      <div className="space-y-0.5">
      <h2 className="text-2xl font-bold tracking-tight">Problem Management</h2>
      <p className="text-muted-foreground">Easily create, update, and manage problems.</p>
      </div>
      </div>
      <Separator className="my-6" />
      <div className="flex">{children}</div>
    </div>
  );
}

export default ProblemLayout;
