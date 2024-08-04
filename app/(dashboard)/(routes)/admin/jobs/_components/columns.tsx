"use client"

import { cn } from "@/lib/utils"
import { ColumnDef } from "@tanstack/react-table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { MoreHorizontalIcon } from "lucide-react"


export type JobsColumns = {
  id: string
  title: string
  company: string
  category: string
  createdAt: string
  isPublished: boolean
}

export const columns: ColumnDef<JobsColumns>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "isPublished",
    header: "Published",
    cell: ({ row }) => {
      const { isPublished } = row.original
      return (
        <div className={cn("border px-2 py-2 text-xs rounded-md w-24 text-center", isPublished ? "border-emerald-500 bg-emerald-100/80" : "border-red-500 bg-red-100/80")}>
          {isPublished ? "Published" : "Unpublished"}
        </div>
      )
    }
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "company",
    header: "Company",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id: "action",
    cell: ({ row }) => {
      const { id } = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={'ghost'} size={"icon"}>
              <MoreHorizontalIcon className="h-4 w-4"/>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Team</DropdownMenuItem>
            <DropdownMenuItem>Subscription</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

      )
    }
  }

]
