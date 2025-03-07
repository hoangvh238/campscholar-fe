"use client"

import type React from "react"
import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/core/common/card"
import { Button } from "@/components/core/common/button"

interface CollapsibleProps {
  title: string
  children: React.ReactNode
  defaultOpen?: boolean
}

export function Collapsible({ title, children, defaultOpen = false }: CollapsibleProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <Card className="w-full mb-4 transition-all duration-300 ease-in-out">
      <CardHeader
        className="flex flex-row items-center justify-between p-4 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <CardTitle className="text-xl font-semibold">{title}</CardTitle>
        <Button variant="ghost" size="sm" className="p-0">
          {isOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
        </Button>
      </CardHeader>
      <CardContent
        className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"}`}
      >
        {children}
      </CardContent>
    </Card>
  )
}

