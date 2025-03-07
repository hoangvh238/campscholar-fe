"use client";
import { useEffect, useState } from "react";
import { Loader2, X, SortAsc, SortDesc } from "lucide-react";

import { mockComps } from "../PracticeAreaModule/data/topic";

import { ContestCard } from "./card";

import { Input } from "@/components/core/common/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/core/common/select";
import { Badge } from "@/components/core/common/badge";
import { Button } from "@/components/core/common/button";

function ContestModule() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const filteredContests = mockComps
    .filter((contest) => {
      const matchesSearch = contest.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesFilter = filterType === "all" || contest.type === filterType;
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      return sortOrder === "asc"
        ? new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
        : new Date(b.startTime).getTime() - new Date(a.startTime).getTime();
    });

  const clearFilters = () => {
    setSearchTerm("");
    setFilterType("all");
  };

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };
  return (
    <>
      <div className="mx-8 w-full max-w-7xl flex-1 flex-col space-y-4 p-8 md:flex">
        <div className="flex items-center justify-between space-y-4">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold tracking-tight">Contests</h2>
            <p className="text-muted-foreground">
              Check out the upcoming contests.
            </p>
          </div>
          <Badge className="text-sm" variant="secondary">
            {filteredContests.length} contest
            {filteredContests.length !== 1 ? "s" : ""}
          </Badge>
        </div>
        <div className="flex flex-col items-end gap-4 md:flex-row">
          <div className="flex-1">
            <label className="sr-only" htmlFor="search-contests">
              Search contests
            </label>
            <Input
              className="max-w-sm"
              id="search-contests"
              placeholder="Search contests..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div>
            <label className="sr-only" htmlFor="filter-type">
              Filter by type
            </label>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-[180px]" id="filter-type">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="coding">Coding</SelectItem>
                <SelectItem value="design">Design</SelectItem>
                <SelectItem value="data">Data Science</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button
            aria-label={`Sort by date ${sortOrder === "asc" ? "ascending" : "descending"}`}
            size="icon"
            variant="outline"
            onClick={toggleSortOrder}
          >
            {sortOrder === "asc" ? (
              <SortAsc className="h-4 w-4" />
            ) : (
              <SortDesc className="h-4 w-4" />
            )}
          </Button>
          {(searchTerm || filterType !== "all") && (
            <Button className="h-10" variant="ghost" onClick={clearFilters}>
              <X className="mr-2 h-4 w-4" /> Clear filters
            </Button>
          )}
        </div>
        {isLoading ? (
          <div className="flex h-64 items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : filteredContests.length > 0 ? (
          <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
            {filteredContests.map((contest: any, index: number) => (
              <ContestCard key={index} contest={contest} />
            ))}
          </div>
        ) : (
          <div className="py-12 text-center">
            <p className="text-xl font-semibold">No contests found</p>
            <p className="mt-2 text-muted-foreground">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>
    </>
  );
}

export default ContestModule;
