import { ResetPasswordCard } from "./ResetPasswordCard";

import { cn } from "@/utils/cn";

interface ResetPasswordFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function ResetPasswordForm({
  className,
  ...props
}: ResetPasswordFormProps) {
  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <ResetPasswordCard />
    </div>
  );
}
