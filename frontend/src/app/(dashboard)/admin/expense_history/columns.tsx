"use client"

import { ExpenseReq, User } from "@/src/types/index.types"
import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// export interface ExpenseReq{
//     _id:string,
//     userId:string,
//     companyId:string,
//     title:string,
//     amount:number,
//     category:string,
//     desc:string,
//     receipt:string,
//     approvalStatus: ApprovalStatus
// }

export const columns: ColumnDef<ExpenseReq>[] = [
  {
    accessorKey: "tile",
    header: "Title",
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