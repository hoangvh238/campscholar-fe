"use client";

import React from "react";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import Markdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import rehypeRaw from "rehype-raw";
import remarkMath from "remark-math";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import "katex/dist/katex.min.css";
import { Copy, Check, ChevronDown } from "lucide-react";

import { Button } from "./button";


import { cn } from "@/utils/cn";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@radix-ui/react-collapsible";

const mathJaxConfig = {
  loader: { load: ["[tex]/html"] },
  tex: {
    packages: { "[+]": ["html"] },
    inlineMath: [["$", "$"]],
    displayMath: [["$$", "$$"]],
  },
};
interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export default function MarkdownRenderer({
  content,
  className,
}: MarkdownRendererProps) {
  return (
    <MathJaxContext config={mathJaxConfig} version={3}>
      <MathJax dynamic>
        <div
          className={cn(
            "markdown-content mx-auto w-full max-w-2xl py-4 pl-5 pr-2",
            "rounded border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900",
            "text-gray-700 dark:text-gray-300",
            className,
          )}
        >
          <Markdown
            className="prose prose-sm dark:prose-invert prose-pre:bg-transparent prose-pre:p-0"
            components={{
              code: CodeBlock,
              h1: ({ children }) => (
                <h1 className="mb-2 border-b pb-1 text-base font-semibold">
                  {children}
                </h1>
              ),
              h2: ({ children }) => (
                <h2 className="mb-2 mt-4 text-sm font-medium">{children}</h2>
              ),
              h3: ({ children }) => (
                <h3 className="mb-1 mt-3 text-xs font-semibold">{children}</h3>
              ),
              p: ({ children }) => (
                <p className="mb-2 leading-relaxed">{children}</p>
              ),
              ul: ({ children }) => (
                <ul className="mb-2 list-disc pl-4">{children}</ul>
              ),
              ol: ({ children }) => (
                <ol className="mb-2 list-decimal pl-4">{children}</ol>
              ),
              li: ({ children }) => (
                <li className="mb-1 text-sm">{children}</li>
              ),
              blockquote: ({ children }) => (
                <blockquote className="border-l-2 pl-2 italic text-gray-600 dark:text-gray-400">
                  {children}
                </blockquote>
              ),
              table: ({ children }) => (
                <div className="overflow-x-auto rounded border border-gray-300 dark:border-gray-700">
                  <table className="w-full text-xs">{children}</table>
                </div>
              ),
              th: ({ children }) => (
                <th className="border-b bg-gray-50 px-2 py-1 text-left">
                  {children}
                </th>
              ),
              td: ({ children }) => (
                <td className="border-b px-2 py-1">{children}</td>
              ),
              strong: ({ children }) => (
                <strong className="font-semibold">{children}</strong>
              ),
              em: ({ children }) => <em className="italic">{children}</em>,
            }}
            rehypePlugins={[rehypeKatex, rehypeRaw]}
            remarkPlugins={[remarkMath, remarkGfm]}
          >
            {content}
          </Markdown>
        </div>
      </MathJax>
    </MathJaxContext>
  );
}

function CodeBlock({ node, inline, className, children, ...props }: any) {
  const match = /language-(\w+)/.exec(className || "");
  const code = String(children).trim();
  const [copied, setCopied] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(true);

  const copyToClipboard = React.useCallback(() => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }, [code]);
  if (inline) {
    return (
      <code
        className="rounded bg-gray-100 px-1 py-0.5 font-mono text-xs dark:bg-gray-800"
        {...props}
      >
        {children}
      </code>
    );
  }
  return match ? (
    <Collapsible
      className="my-2 rounded border border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800"
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <div className="flex items-center justify-between bg-gray-100 px-2 py-1 dark:bg-gray-700">
        <div className="flex items-center space-x-1">
          <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
            {match[1].toUpperCase()}
          </span>
          <CollapsibleTrigger asChild>
            <Button className="h-4 w-4 p-0" size="sm" variant="ghost">
              <ChevronDown
                className={cn("h-3 w-3 transition-transform", {
                  "rotate-180": !isOpen,
                })}
              />
              <span className="sr-only">Toggle code</span>
            </Button>
          </CollapsibleTrigger>
        </div>
        <Button
          className="h-4 w-4 p-0 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          size="sm"
          variant="ghost"
          onClick={copyToClipboard}
        >
          {copied ? (
            <Check className="h-3 w-3" />
          ) : (
            <Copy className="h-3 w-3" />
          )}
        </Button>
      </div>
      <CollapsibleContent>
        <div className="overflow-x-auto">
          <SyntaxHighlighter
            showLineNumbers
            PreTag="div"
            className="!m-0 !bg-transparent !p-2 text-xs"
            language={match[1]}
            style={oneDark}
            {...props}
          >
            {code}
          </SyntaxHighlighter>
        </div>
      </CollapsibleContent>
    </Collapsible>
  ) : (
    <code
      className="rounded bg-gray-100 px-1 py-0.5 font-mono text-xs text-black dark:bg-gray-800 dark:text-white"
      {...props}
    >
      {children}
    </code>
  );
}
