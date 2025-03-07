import { LoginCard } from "./LoginCard";

import { cn } from "@/utils/cn";

interface LoginFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function LoginForm({ className, ...props }: LoginFormProps) {
  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <LoginCard />
    </div>
  );
}
