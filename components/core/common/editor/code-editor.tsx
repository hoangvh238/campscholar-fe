"use client";

import Editor, { Monaco } from "@monaco-editor/react";
import { editor } from "monaco-editor";
import { useContext, useMemo, useRef, useState } from "react";
import { ReloadIcon } from "@radix-ui/react-icons";

import { Button } from "../button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../tooltip";

import { EditorLanguageSelect } from "./editor-language-select";
import { EditorThemeSelector } from "./editor-theme-select";
import { ThemeContext } from "./editor-theme";

import { Language } from "@/types/submitsion";
import { defaultEditorOptions } from "@/helpers/data/constant";
import { convertToMonacoLanguageName } from "@/utils/convertCPLanguage";

const templates: Record<string, string> = {
  "c++": ``,
  java: ``,
  c: ``,
  kotlin: ``,
  typescript: ``,
  python: ``,
  pypy: ``,
};
function getLanguageTemplateCode(language: Language): string {
  if (templates[language.name]) {
    return templates[language.name];
  } else if (language.name === "javascript") {
    return templates["typescript"];
  } else {
    return "";
  }
}

export default function CodeEditor({
  languages,
  themes,
  problemId,
  setSubmissionId,
  code,
  setCode,
  submissionLoading,
  error,
  submissionId,
  handleSubmitCode,
  handleFinalSubmitCode,
}: {
  languages: Language[];
  themes: any;
  problemId: string;
  setSubmissionId: (submissionId: number) => void;
  code: string;
  setCode: (code: string) => void;
  submissionLoading: boolean;
  error: string | null;
  submissionId: number | null;
  handleSubmitCode: (language: string, problemId: string) => Promise<void>;
  handleFinalSubmitCode: (language: string, problemId: string) => Promise<void>;
}) {
  //   const [code, setCode] = useState<string>(templates["TypeScript"]);
  const { theme, setTheme } = useContext(ThemeContext);
  const [currentLanguage, setCurrentLanguage] = useState<Language>(
    languages?.[0],
  );

  // Need to wait to do this - it updates parent component otherwise causing a crash
  // setCode(templates[normalizeLanguageKey(languages[0].name)]);

  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);

  const getEditorValue = () => {
    return editorRef.current?.getValue();
  };

  const handleEditorDidMount = (
    editor: editor.IStandaloneCodeEditor,
    monaco: Monaco,
  ) => {
    editor.focus();

    // add support for process
    monaco.languages.typescript.javascriptDefaults.setEagerModelSync(true);
    monaco.languages.typescript.typescriptDefaults.addExtraLib(
      `declare var process: NodeJS.Process;`,
    );
    monaco.languages.typescript.typescriptDefaults.addExtraLib(
      "node:readline/promises",
    );
    monaco.languages.typescript.typescriptDefaults.addExtraLib(
      "node_modules/@types/node/index.d.ts",
    );
  };

  const handleLanguageSelect = (language: Language) => {
    if (currentLanguage) {
      const curr_template_stripped = getLanguageTemplateCode(currentLanguage)
        .replace(/\s/g, "")
        .trim();

      const curr_code_stripped = code.replace(/\s/g, "").trim();
      if (curr_code_stripped === curr_template_stripped) {
        setCode(getLanguageTemplateCode(language));
      }
    } else {
      setCode(getLanguageTemplateCode(language));
    }

    setCurrentLanguage(language);
  };

  const editorOptions = useMemo(
    () => ({
      ...defaultEditorOptions,
    }),
    [],
  );

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await handleSubmitCode(currentLanguage?.id, problemId);
  };

  const handleSubmitFinal = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await handleFinalSubmitCode(currentLanguage?.id, problemId);
  };
  return (
    <div className="h-full min-w-full">
      <div className="flex justify-between">
        <div className="my-2 justify-start px-2">
          <EditorLanguageSelect
            defaultLanguage={currentLanguage}
            languages={languages}
            onLanguageSelect={handleLanguageSelect}
          />
        </div>
        <div className="my-2 flex justify-center gap-2 px-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  className="w-full"
                  disabled={submissionLoading}
                  variant={error ? "destructive" : "ghost"}
                  onClick={handleSubmit}
                >
                  {submissionLoading ? (
                    <div className="flex items-center justify-center gap-2">
                      <ReloadIcon className="h-6 w-6 animate-spin" />
                      <p>Loading...</p>
                    </div>
                  ) : (
                    <>
                      {error ? (
                        <div className="text-center text-sm">{error}</div>
                      ) : (
                        <>Run Code</>
                      )}
                    </>
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Click to execute the code with only 3 testcase</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  className="w-full"
                  disabled={submissionLoading}
                  variant={error ? "destructive" : "ghost"}
                  onClick={handleSubmitFinal}
                >
                  {submissionLoading ? (
                    <div className="flex items-center justify-center gap-2">
                      <ReloadIcon className="h-6 w-6 animate-spin" />
                      <p>Loading...</p>
                    </div>
                  ) : (
                    <>
                      {error ? (
                        <div className="text-center text-sm">{error}</div>
                      ) : (
                        <>Submit Code</>
                      )}
                    </>
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Click to execute the code with only fully testcase</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className="my-2 justify-end px-2">
          <EditorThemeSelector themes={themes} />
        </div>
      </div>
      <Editor
        className="min-h-screen w-[100%] overflow-y-scroll"
        defaultLanguage={currentLanguage?.name}
        language={convertToMonacoLanguageName(currentLanguage)}
        loading={
          <ReloadIcon className="h-6 w-6 animate-spin text-orange-700" />
        }
        options={editorOptions}
        theme={theme?.name}
        value={code}
        onChange={(value) => {
          // @ts-ignore
          setCode(value);
        }}
        onMount={handleEditorDidMount}
      />
    </div>
  );
}
