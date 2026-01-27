"use client"

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  Row,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { BiDotsVertical } from "react-icons/bi";
import { User } from "@/src/types/index.types";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[],
  setIsModalOpen:()=>void,
  setUpdateEmp?:(emp:User)=>void,
}

export function DataTable<TData, TValue>({columns, data, setIsModalOpen, setUpdateEmp}: DataTableProps<TData, TValue>) {
    const [isOpen, setIsOpen] = useState(false)
    const router = useRouter()
    const pathname = usePathname()
    const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

//   const clickHandler = (row:Row<TData>)=>{
//     if(setUpdateEmp){
//         const emp = row.original as User
//         setUpdateEmp(emp)
//     }

//     setIsModalOpen()
//   }

    const showDetail = (row:Row<TData>)=>{
        const emp = row.original as User
        router.push(`${pathname}/${emp._id}`)
    }

  return (
    <div className="overflow-hidden rounded-md border w-full">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                className="cursor-pointer"
                onClick={()=>showDetail(row)}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell 
                  key={cell.id}
                  className={`${cell.getValue()===""&&"text-gray-300 italic"}`}>
                    {cell.getValue()===""?"n/a":flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
                </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}