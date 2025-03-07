import { Label } from "@radix-ui/react-label";
import { ClipboardIcon } from "lucide-react";

import { Card } from "./card";
import { Textarea } from "./textarea";
import { Button } from "./button";

interface ContentProps {
  label: string;
  content: string;
  isTextarea?: boolean;
}

function Content({ label, content, isTextarea = false }: ContentProps) {
  return (
    <div className="space-y-1">
      <Label className="text-xs text-muted-foreground">{label}</Label>
      {isTextarea ? (
        <Textarea
          readOnly
          className="h-20 resize-none text-sm"
          value={content}
        />
      ) : (
        <Card className="relative p-2 text-sm">
          <CopyButton />
          <pre className="whitespace-pre-wrap break-all font-mono">
            {content}
          </pre>
        </Card>
      )}
    </div>
  );
}

export const Input = ({ input, label }: { input: string; label?: string }) => (
  <Content content={input} label={label || "Your Input"} />
);

export const CustomInput = ({ input }: { input: string }) => (
  <Content isTextarea content={input} label="Input" />
);

export const CustomInputResult = ({ result }: { result: string }) => (
  <Content isTextarea content={result} label="Result" />
);

export const Expected = ({ expected }: { expected: string }) => (
  <Content content={expected} label="Expected Output" />
);

export const Output = ({ output }: { output: string }) => (
  <Content content={output} label="Your Output" />
);

function CopyButton() {
  return (
    <Button
      className="absolute right-1 top-1 h-5 w-5 opacity-0 transition-opacity group-hover:opacity-100"
      size="icon"
      variant="ghost"
    >
      <ClipboardIcon className="h-3 w-3" />
      <span className="sr-only">Copy</span>
    </Button>
  );
}
