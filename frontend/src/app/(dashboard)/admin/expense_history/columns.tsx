"use client"

import { ExpenseReq, User } from "@/src/types/index.types"
import { ColumnDef } from "@tanstack/react-table"


export const columns: ColumnDef<ExpenseReq>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "userId.name",
    header: "Name",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "approvalStatus",
    header: "Approval Status",
  },
]