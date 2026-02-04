"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CleanedDataType } from "./page"




export const columns: ColumnDef<CleanedDataType>[] = [
  {
    accessorKey: "project_name",
    header: "Project Name",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "members",
    header: "Members",
  },
]