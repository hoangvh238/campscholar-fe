"use client";

import { Sparkles, Wand2 } from "lucide-react";
import * as React from "react";
import { toast } from "sonner";

import { cn } from "./dropdown-search";

import { Button } from "@/components/core/common/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/core/common/dialog";
import { Textarea } from "@/components/core/common/textarea";

interface AIPromptDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onGenerate: (prompt: string) => Promise<void>;
}

export function AIPromptDialog({
  open,
  onOpenChange,
  onGenerate,
}: AIPromptDialogProps) {
  const [prompt, setPrompt] = React.useState("");
  const [isGenerating, setIsGenerating] = React.useState(false);
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);
  React.useEffect(() => {
    if (open && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [open]);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error("Please enter a problem description");
      return;
    }

    try {
      setIsGenerating(true);
      await onGenerate(prompt);
      setPrompt("");
      onOpenChange(false);
    } catch (error) {
      toast.error("Failed to generate problem");
      console.error(error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      handleGenerate();
    }
  };

  const examples = [
    "Create a problem about finding the longest palindromic substring in a string",
    "Design a problem about balancing parentheses using a stack",
    "Make a problem about finding the kth largest element in an array",
  ];

  const handleUseExample = (example: string) => {
    setPrompt(example);
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-blue-500" />
            Generate Problem with AI
          </DialogTitle>
          <DialogDescription>
            Describe the programming problem you want to create. Be as specific
            as possible about the requirements, constraints, and expected
            behavior.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Textarea
            id="prompt-textarea"
            ref={textareaRef}
            className="h-32 resize-none"
            disabled={isGenerating}
            placeholder="Example: Create a problem that involves finding two numbers in an array that sum up to a target value. Include constraints about array size and number ranges."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <div className="space-y-2">
            <label
              htmlFor="prompt-textarea"
              className="text-sm font-medium text-muted-foreground"
            >
              Example Prompts
            </label>
            <div className="flex flex-wrap gap-2">
              {examples.map((example) => (
                <button
                  key={example}
                  className={cn(
                    "inline-flex items-center text-xs",
                    "rounded-full border px-2.5 py-0.5 font-semibold transition-colors",
                    "hover:bg-secondary/80 hover:text-secondary-foreground",
                    "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                    "cursor-pointer select-none",
                    isGenerating && "pointer-events-none opacity-50",
                  )}
                  onClick={() => handleUseExample(example)}
                >
                  {example}
                </button>
              ))}
            </div>
          </div>
        </div>
        <DialogFooter className="gap-2 sm:gap-0">
          <Button
            disabled={isGenerating}
            variant="secondary"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button
            className={cn(
              "gap-2",
              isGenerating && "animate-pulse cursor-not-allowed",
            )}
            disabled={!prompt.trim() || isGenerating}
            onClick={handleGenerate}
          >
            {isGenerating ? (
              <>
                <Wand2 className="h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" />
                Generate
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
