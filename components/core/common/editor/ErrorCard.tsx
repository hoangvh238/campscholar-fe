import { AlertCircle } from "lucide-react";

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/core/common/alert";

interface ErrorDisplayProps {
  errorMessage: string;
}

export function ErrorDisplay({ errorMessage }: ErrorDisplayProps) {
  if (!errorMessage) return null;
  return (
    <Alert className="mb-8 mt-4" variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>{errorMessage}</AlertDescription>
    </Alert>
  );
}
