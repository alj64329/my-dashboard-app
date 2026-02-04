"use client"

import { LeaveReq } from "@/src/types/index.types"
import { ColumnDef } from "@tanstack/react-table"

// export interface LeaveReq{
//     _id: string,
//     userId: string,
//     companyId:string,
//     fromDate: Date,
//     toDate:Date,
//     leaveType: LeaveType,
//     approvalStatus:ApprovalStatus
// }



export const columns: ColumnDef<LeaveReq>[] = [
  {
    accessorKey: "fromDate",
    header: "From",
  },
  {
    accessorKey: "toDate",
    header: "To",
  },
  {
    accessorKey: "leaveType",
    header: "Type",
  },
  {
    accessorKey: "approvalStatus",
    header: "Approval Status",
  },
  {
    accessorKey: "userId.name",
    header: "Name",
  },
]