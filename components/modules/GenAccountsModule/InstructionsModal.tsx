"use client";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "@/components/core/common/dialog";
import { Button } from "@/components/core/common/button";

export function InstructionsModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="text-sm" variant="outline">
          Instructions
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogTitle>File Format Instructions</DialogTitle>
        <div className="mt-4 space-y-2 text-sm text-gray-600 dark:text-gray-300">
          <p>
            Please upload an Excel file with the following format to ensure
            proper account generation:
          </p>
          <ul className="list-disc pl-5">
            <li>
              <strong>Header Row:</strong> The first row must include the
              following columns: <code>Name</code>, <code>Code</code>, and{" "}
              <code>Email</code>.
            </li>
            <li>
              <strong>Column Details:</strong>
              <ul className="list-inside pl-4">
                <li>
                  <strong>Name:</strong> Full name of the user (e.g., John Doe).
                </li>
                <li>
                  <strong>Code:</strong> A unique identifier, e.g., DE170364.
                </li>
                <li>
                  <strong>Email:</strong> A valid email address, e.g.,
                  example@gmail.com.
                </li>
              </ul>
            </li>
            <li>
              Save the file in <strong>.xlsx</strong> format.
            </li>
          </ul>
          <p>Here is an example of the correct format:</p>
          <table className="mt-2 w-full border border-gray-300 text-left text-sm dark:border-gray-700">
            <thead>
              <tr>
                <th className="border border-gray-300 px-2 py-1 dark:border-gray-700">
                  Name
                </th>
                <th className="border border-gray-300 px-2 py-1 dark:border-gray-700">
                  Code
                </th>
                <th className="border border-gray-300 px-2 py-1 dark:border-gray-700">
                  Email
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-2 py-1 dark:border-gray-700">
                  John Doe
                </td>
                <td className="border border-gray-300 px-2 py-1 dark:border-gray-700">
                  DE170364
                </td>
                <td className="border border-gray-300 px-2 py-1 dark:border-gray-700">
                  example@gmail.com
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-2 py-1 dark:border-gray-700">
                  Jane Smith
                </td>
                <td className="border border-gray-300 px-2 py-1 dark:border-gray-700">
                  DE170365
                </td>
                <td className="border border-gray-300 px-2 py-1 dark:border-gray-700">
                  jane.smith@gmail.com
                </td>
              </tr>
            </tbody>
          </table>
          <p>
            If you need a sample file, click{" "}
            <a className="text-osu hover:underline" href="/files/sample.xlsx">
              here
            </a>{" "}
            to download.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
