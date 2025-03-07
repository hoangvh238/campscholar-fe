"use client";
import { loader } from "@monaco-editor/react";
import React, { useEffect, useState } from "react";

import { useThemesLoader } from "@/hooks/useThemeLoader";

export interface ThemeProviderProps {
  children: React.ReactNode;
}

export interface Theme {
  name: string;
  fetch: string;
}

export interface ThemeContextType {
  theme: Theme | null;
  setTheme: (theme: Theme | null) => void;
}

const defaultThemes = {
  dark: { name: "brilliance-black", fetch: "/themes/brilliance-black.json" },
  light: { name: "github-light", fetch: "/themes/github-light.json" },
  builtin_dark: { name: "vs-dark", fetch: "" },
  builtin_light: { name: "light", fetch: "" },
} as const;
export const ThemeContext = React.createContext<ThemeContextType>({
  theme: null,
  setTheme: () => {},
});

export const EditorThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
}) => {
  const [theme, setTheme] = useState<Theme | null>(null);
  const { themes, loading } = useThemesLoader();
  useEffect(() => {
    if (loading) return;

    const savedThemeName = localStorage.getItem("editor-theme");
    if (savedThemeName) {
      const savedTheme = themes.find((t) => t.name === savedThemeName);
      if (savedTheme) {
        setTheme(savedTheme);
        return;
      }
    }

    setTheme(defaultThemes.builtin_light);
  }, [loading, themes]);

  const setCustomTheme = (selectedTheme: Theme | null) => {
    if (selectedTheme) {
      setTheme(selectedTheme);
      localStorage.setItem("editor-theme", selectedTheme.name);
      loader.init().then((monaco) => {
        monaco.editor.setTheme(selectedTheme.name);
      });
    }
  };
  if (loading) return null;
  return (
    <ThemeContext.Provider value={{ theme, setTheme: setCustomTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
