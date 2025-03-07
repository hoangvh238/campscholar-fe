"use client";

import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import * as React from "react";

import { Button } from "../button";

import { ThemeContext } from "./editor-theme";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/core/common/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/core/common/command";
import { cn } from "@/utils/cn";

export type Theme = {
  name: string;
  fetch: string;
};

export function EditorThemeSelector({ themes }: { themes: Theme[] }) {
  const { theme: currentTheme, setTheme } = React.useContext(ThemeContext);
  const [open, setOpen] = React.useState(false);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          aria-expanded={open}
          className="w-[200px] justify-between"
          role="combobox"
          variant="outline"
        >
          {themes.find((theme) => currentTheme?.name === theme.name)?.name ||
            "Select theme"}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput className="h-9" placeholder="Search our themes..." />
          <CommandEmpty>No theme found.</CommandEmpty>
          <CommandGroup className="max-h-52 overflow-y-scroll">
            {themes.map((theme) => (
              <CommandItem
                key={theme.name}
                value={theme.name}
                onSelect={() => {
                  setTheme(theme);
                  localStorage.setItem("editor-theme", theme.name);
                  setOpen(false);
                }}
              >
                {theme.name}
                <CheckIcon
                  className={cn(
                    "ml-auto h-4 w-4",
                    currentTheme?.name === theme.name
                      ? "opacity-100"
                      : "opacity-0",
                  )}
                />
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
