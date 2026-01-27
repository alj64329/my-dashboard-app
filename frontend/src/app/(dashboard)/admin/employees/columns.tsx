"use client"

import { User } from "@/src/types/index.types"
import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// export interface User{
//     _id:string,
//     name:string,
//     email:string,
//     companyId:string,
//     role: Role
//     position:string,
//     password:string,
//     profilePic:string
// }

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    accessorKey: "position",
    header: "Position",
  },
]