// "use client"

// import type { ColumnDef } from "@tanstack/react-table"
// import { Badge } from "@/components/core/common/badge"
// import { Button } from "@/components/core/common/button"
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/core/common/dropdown-menu"
// import { MoreHorizontal, Pencil, Eye, BarChart2 } from "lucide-react"

// export const columns: ColumnDef<any>[] = [
//   {
//     accessorKey: "title",
//     header: "Title",
//   },
//   {
//     accessorKey: "difficulty",
//     header: "Difficulty",
//     cell: ({ row }) => {
//       const difficulty = row.getValue("difficulty")
//       const colorMap = {
//         Easy: "bg-green-500",
//         Medium: "bg-yellow-500",
//         Hard: "bg-red-500",
//       }
//       return <Badge className={`${colorMap[difficulty as keyof typeof colorMap]}`}>{difficulty}</Badge>
//     },
//   },
//   {
//     accessorKey: "topic",
//     header: "Topic",
//   },
//   {
//     accessorKey: "attempts",
//     header: "Attempts",
//     cell: ({ row }) => {
//       const attempts = row.getValue("attempts")
//       return (
//         <div className="font-medium">
//           {attempts}
//           <span className="ml-1 text-xs text-muted-foreground">times</span>
//         </div>
//       )
//     },
//   },
//   {
//     accessorKey: "successRate",
//     header: "Success Rate",
//     cell: ({ row }) => {
//       const rate = row.getValue("successRate")
//       return <div className="font-medium">{rate}%</div>
//     },
//   },
//   {
//     accessorKey: "lastAttempted",
//     header: "Last Attempted",
//     cell: ({ row }) => {
//       return (
//         <div className="text-sm text-muted-foreground">
//           {new Date(row.getValue("lastAttempted")).toLocaleDateString()}
//         </div>
//       )
//     },
//   },
//   {
//     id: "actions",
//     cell: ({ row }) => {
//       return (
//         <DropdownMenu>
//           <DropdownMenuTrigger asChild>
//             <Button variant="ghost" className="h-8 w-8 p-0">
//               <MoreHorizontal className="h-4 w-4" />
//             </Button>
//           </DropdownMenuTrigger>
//           <DropdownMenuContent align="end">
//             <DropdownMenuItem>
//               <Eye className="mr-2 h-4 w-4" />
//               Preview
//             </DropdownMenuItem>
//             <DropdownMenuItem>
//               <Pencil className="mr-2 h-4 w-4" />
//               Edit
//             </DropdownMenuItem>
//             <DropdownMenuItem>
//               <BarChart2 className="mr-2 h-4 w-4" />
//               View Analytics
//             </DropdownMenuItem>
//           </DropdownMenuContent>
//         </DropdownMenu>
//       )
//     },
//   },
// ]

