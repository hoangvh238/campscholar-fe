"use client";
import { useEffect, useState, useMemo } from "react";

import MarkdownRenderer from "../markdown-renderer";

import { EditorThemeProvider } from "./editor-theme";
import EditorComponent from "./editor-layout";

import { Category, Language, Problem } from "@/types/submitsion";
import { BUCKET_TYPE } from "@/settings/bucketType";
import { useDownloadFileQuery } from "@/store/queries/minioStorage";

interface EditorProps {
  details: Problem;
  testCases: Problem["test_cases"];
  tags: Category[];
  languages: Language[];
}

export function Editor({ details, testCases, tags, languages }: EditorProps) {
  const [markdownString, setMarkdownString] = useState<string>("");

  const { data, error, isLoading } = useDownloadFileQuery({
    bucketName: BUCKET_TYPE.PROBLEMS,
    objectName: details.id + ".md",
  });
  useEffect(() => {
    const fetchFile = async () => {
      try {
        if (data && data.type?.includes("text")) {
          const text = await data.text();
          setMarkdownString(text);
        }
      } catch (err) {
        console.error("Failed to fetch and convert file:", err);
      }
    };
    if (data) {
      fetchFile();
    }
  }, [data]);

  const tagNames = useMemo(() => tags.map((tag) => tag.name), [tags]);
  return (
    <EditorThemeProvider>
      <EditorComponent
        details={details}
        languages={languages}
        slot={<MarkdownRenderer content={markdownString} />}
        tags={tagNames}
        testCases={testCases}
      />
    </EditorThemeProvider>
  );
}
