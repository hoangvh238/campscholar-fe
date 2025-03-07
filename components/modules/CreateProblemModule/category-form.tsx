"use client";

import { useState } from "react";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/core/common/dropdown-menu";
import { Button } from "@/components/core/common/button";
import { Checkbox } from "@/components/core/common/checkbox";
import { Input } from "@/components/core/common/input";
import { useGetCategoryQuery } from "@/store/queries/category";

interface Category {
  id: string;
  name: string;
}

export default function CategorySelectionPopup({
  selectedCategories,
  setSelectedCategories,
}: {
  selectedCategories: string[];
  setSelectedCategories: React.Dispatch<React.SetStateAction<string[]>>;
}) {
  const [searchTerm, setSearchTerm] = useState("");

  const { data, error, isLoading } = useGetCategoryQuery(undefined);

  const categories: Category[] = data?.result ?? [];

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId],
    );
  };

  const filteredCategories: Category[] = Array.isArray(categories)
    ? categories.filter((category) =>
        category.name.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    : [];

  const selectedCategoryObjects: Category[] = selectedCategories
    .map((id) => categories.find((c) => c.id === id))
    .filter((category): category is Category => category !== undefined);
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            className="flex w-full items-center justify-between space-x-4"
            variant="outline"
          >
            <div className="flex flex-wrap items-center gap-1">
              {selectedCategories.length === 0 && (
                <span>Select Categories</span>
              )}
              {selectedCategories.length > 0 && (
                <span className="text-xs text-gray-500">
                  Selected categories: {selectedCategories.length}
                </span>
              )}
            </div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 p-2">
          <div className="p-2">
            <Input
              className="w-full rounded border px-3 py-2 text-sm"
              placeholder="Search categories..."
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {isLoading ? (
            <p className="p-2 text-sm text-gray-500">Loading categories...</p>
          ) : error ? (
            <p className="p-2 text-sm text-red-500">
              Error loading categories.
            </p>
          ) : (
            <div className="max-h-48 overflow-y-auto">
              {filteredCategories.length > 0 ? (
                filteredCategories.map((category: Category) => (
                  <label
                    key={category.id}
                    className="flex cursor-pointer items-center space-x-2 rounded p-2"
                  >
                    <Checkbox
                      checked={selectedCategories.includes(category.id)}
                      onCheckedChange={() => toggleCategory(category.id)}
                    />
                    <span className="text-sm">{category.name}</span>
                  </label>
                ))
              ) : (
                <p className="p-2 text-sm text-gray-500">
                  No categories found.
                </p>
              )}
            </div>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      <div className="mt-2 flex flex-wrap">
        {selectedCategoryObjects.length === 0 ? (
          <span className="text-[0.8rem] text-muted-foreground">
            No category selected
          </span>
        ) : (
          selectedCategoryObjects.map((category) => (
            <div
              key={category.id}
              className="m-1 flex items-center rounded border border-gray-300 px-2 py-1 text-sm"
            >
              <span>{category.name}</span>
              <button
                className="ml-2 text-primary"
                onClick={() => toggleCategory(category.id)}
              >
                X
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
