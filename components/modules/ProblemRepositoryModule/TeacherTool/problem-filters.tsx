"use client"

import { Search } from "lucide-react"
import { Input } from "@/components/core/common/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/core/common/select"

export function ProblemFilters() {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4">
        <Select defaultValue="all">
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Difficulty" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Difficulties</SelectItem>
            <SelectItem value="easy">Easy</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="hard">Hard</SelectItem>
          </SelectContent>
        </Select>
        <Select defaultValue="all">
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Topic" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Topics</SelectItem>
            <SelectItem value="arrays">Arrays</SelectItem>
            <SelectItem value="strings">Strings</SelectItem>
            <SelectItem value="dp">Dynamic Programming</SelectItem>
          </SelectContent>
        </Select>
        <Select defaultValue="attempts">
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="attempts">Most Attempted</SelectItem>
            <SelectItem value="recent">Recently Added</SelectItem>
            <SelectItem value="success">Success Rate</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

