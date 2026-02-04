"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ProjectDisplayType } from "../projects/[id]/page"
import { User } from "@/src/types/index.types"

type TeamMemberCol={
    user:User
    projectRole:string,
    memberState:string,
    teamId:string
}




export const columns: ColumnDef<TeamMemberCol>[] = [
  {
    accessorKey: "user.name",
    header: "Name",
  },
  {
    accessorKey: "projectRole",
    header: "Project Role",
  },
  {
    accessorKey: "memberState",
    header: "State",
  },
]