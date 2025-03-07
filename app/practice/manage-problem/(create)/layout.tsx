import { Separator } from "@/components/core/common/separator";

function ProblemLayoutCreate({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full max-w-7xl mx-auto p-6 space-y-6">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">Create Problem</h2>
        <p className="text-muted-foreground">
          Fill out the fields below to add a new problem to the platform.
        </p>
      </div>
      <Separator className="my-6" />
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <div className="flex-1 lg:max-w-4xl">{children}</div>
      </div>
    </div>
  );
}

export default ProblemLayoutCreate;
