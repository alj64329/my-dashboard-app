"use client"

import { ExpenseReq } from "@/src/types/index.types"
import { ColumnDef } from "@tanstack/react-table"


export const columns: ColumnDef<ExpenseReq>[] = [
  {
    accessorKey: "title",
    header: "Request Title",
  },
    {
    accessorKey: "approvalStatus",
    header: "Status",
  },
  {
    accessorKey: "category",
    header: "Expense Category",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
  {
    accessorKey: "desc",
    header: "Description",
  }

]