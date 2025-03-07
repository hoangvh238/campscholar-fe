import { GenerateResetPasswordTokenCard } from "./GenerateResetPasswordTokenCard";

import { cn } from "@/utils/cn";

interface GenerateResetPasswordTokenFormProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export function GenerateResetPasswordTokenForm({
  className,
  ...props
}: GenerateResetPasswordTokenFormProps) {
  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <GenerateResetPasswordTokenCard />
    </div>
  );
}
