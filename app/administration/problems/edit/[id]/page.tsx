"use client";

import { useState } from "react";

import { Separator } from "@/components/core/common/separator";
import { Toaster } from "@/components/core/common/toaster";
import UpdateProblemForm from "@/components/modules/UpdateProblemModule";
import CreateTestcaseForm from "@/components/modules/TestCaseModule";

function FormPage() {
  const [selectedTab, setSelectedTab] = useState("problems");
  return (
    <div className="flex w-full">
      <aside className="h-screen w-1/5 border-r p-6">
        <nav className="flex flex-col space-y-4">
          <div
            className={`cursor-pointer rounded-md border-2 border-transparent p-3 transition ${
              selectedTab === "problems"
                ? "font-bold"
                : "hover:border-gray-400 dark:text-white"
            }`}
            onClick={() => setSelectedTab("problems")}
          >
            Problems
          </div>
          <div
            className={`cursor-pointer rounded-md border-2 border-transparent p-3 transition ${
              selectedTab === "test-case"
                ? "font-bold"
                : "hover:border-gray-400 dark:text-white"
            }`}
            onClick={() => setSelectedTab("test-case")}
          >
            Test Case
          </div>
        </nav>
      </aside>

      <div className="flex-1 space-y-6 p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h3 className="text-lg font-medium">
              {selectedTab === "problems"
                ? "Contribute Problems to Campscholar"
                : "Manage Test Cases"}
            </h3>
            <p className="text-sm text-muted-foreground">
              {selectedTab === "problems"
                ? "Fill out the fields below to update a problem."
                : "Fill out the fields below to create test cases."}
            </p>
          </div>
        </div>

        <Separator />

        <div className="max-w-5xl">
          {selectedTab === "problems" ? (
            <UpdateProblemForm />
          ) : (
            <CreateTestcaseForm />
          )}
        </div>

        <Toaster />
      </div>
    </div>
  );
}

export default FormPage;
