import { Language } from "@/types/submitsion";

export function convertToMonacoLanguageName(language: Language | undefined) {
  return language?.name === "pypy"
    ? "python"
    : language?.name === "c++"
      ? "cpp"
      : language?.name;
}
