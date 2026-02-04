"use client"


import { LeaveReq } from "@/src/types/index.types"
import { ColumnDef } from "@tanstack/react-table"


export const columns: ColumnDef<LeaveReq>[] = [
  {
    accessorKey: "leaveType",
    header: "Leave Type",
  },
    {
    accessorKey: "fromDate",
    header: "From",
  },
  {
    accessorKey: "toDate",
    header: "To",
  },
  {
    accessorKey: "approvalStatus",
    header: "Approval Status",
  },
]