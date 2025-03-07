"use client";
import Link from "next/link";
import React from "react";
import { Button } from "@/components/core/common/button";

const mockContests = [
  {
    id: 1,
    name: "Code Battle 2025",
    creator: "admin",
    startTime: "2025-03-01 10:00 AM",
    participants: 20,
  },
  {
    id: 2,
    name: "AI Challenge",
    creator: "john_doe",
    startTime: "2025-04-15 14:00 PM",
    participants: 35,
  },
];

export default function ContestsPage() {
  return (
    <div>
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold">Manage Contests</h2>
        <Link href="/administration/contests/create">
          <Button variant="default">Create Contest</Button>
        </Link>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg bg-white shadow-md dark:bg-gray-800">
        <table className="w-full border-collapse">
          <thead className="bg-gray-200 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                Name
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                Creator
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                Start Time
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                Participants
              </th>
            </tr>
          </thead>
          <tbody>
            {mockContests.map((contest) => (
              <tr
                key={contest.id}
                className="border-b hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-700"
              >
                <td className="px-6 py-4 text-gray-900 dark:text-gray-200">
                  {contest.name}
                </td>
                <td className="px-6 py-4 text-gray-900 dark:text-gray-200">
                  {contest.creator}
                </td>
                <td className="px-6 py-4 text-gray-900 dark:text-gray-200">
                  {contest.startTime}
                </td>
                <td className="px-6 py-4 text-gray-900 dark:text-gray-200">
                  {contest.participants}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
