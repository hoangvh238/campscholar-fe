"use client";

import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import * as React from "react";

import { Button } from "@/components/core/common/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/core/common/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/core/common/popover";
import { Language } from "@/types/submitsion";
import { cn } from "@/utils/cn";

interface EditorLanguageSelectProps {
  languages: Language[];
  onLanguageSelect: (language: Language) => void;
  defaultLanguage: Language;
}

export function EditorLanguageSelect({
  languages,
  onLanguageSelect,
  defaultLanguage,
}: EditorLanguageSelectProps) {
  const [open, setOpen] = React.useState(false);
  const [currentLanguage, setCurrentLanguage] =
    React.useState<Language>(defaultLanguage);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          aria-expanded={open}
          className="w-[200px] justify-between"
          role="combobox"
          variant="outline"
        >
          {currentLanguage
            ? `${currentLanguage.name} (${currentLanguage.version})`
            : "Select a language"}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput className="h-9" placeholder="Search languages..." />
          <CommandEmpty>No language found.</CommandEmpty>
          <CommandGroup className="max-h-52 overflow-y-scroll">
            {languages.map((language: Language) => (
              <CommandItem
                key={language.id}
                value={language.name}
                onSelect={() => {
                  onLanguageSelect(language);
                  setCurrentLanguage(language);
                  setOpen(false);
                }}
              >
                <div className="flex w-full justify-between">
                  <span>{language.name}</span>
                  <span className="text-sm text-gray-500 opacity-70">
                    {language.version}
                  </span>
                </div>
                <CheckIcon
                  className={cn(
                    "ml-auto h-4 w-4",
                    currentLanguage?.id === language.id
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
