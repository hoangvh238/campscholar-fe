"use client";

import React, { useState } from "react";
import { toast } from "sonner";

import { useCreateUsersFromExcelMutation } from "@/store/queries/admin";
import { Button } from "@/components/core/common/button";
import { Input } from "@/components/core/common/input";

export function GenAccountsForm() {
  const [file, setFile] = useState<File | null>(null);
  const [createUsersFromExcel, { isLoading }] =
    useCreateUsersFromExcelMutation();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (!file) {
      toast.error("Please upload a file before submitting.");
      return;
    }

    try {
      const result = await createUsersFromExcel(file).unwrap();

      const { fileContents, contentType, fileDownloadName } = result;
      const byteCharacters = atob(fileContents);
      const byteNumbers = Array.from(byteCharacters, (char) =>
        char.charCodeAt(0),
      );
      const blob = new Blob([new Uint8Array(byteNumbers)], {
        type: contentType,
      });

      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = fileDownloadName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast.success("File downloaded successfully!");
    } catch (error) {
      toast.error("An error occurred while generating accounts.");
    }
  };
  return (
    <div>
      <Input
        accept=".xlsx"
        className="mb-4"
        type="file"
        onChange={handleFileUpload}
      />
      <Button
        className="bg-osu text-white hover:bg-osubrown dark:bg-osu dark:hover:bg-osubrown"
        disabled={isLoading}
        onClick={handleSubmit}
      >
        {isLoading ? "Processing..." : "Generate Accounts"}
      </Button>
    </div>
  );
}
