'use client'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { PropsTableType, TableType } from "@/src/types/dashboard.types"
import { useEffect, useState } from "react"


const DTable = ({type}:PropsTableType) => {
    const [heading, setHeading] = useState("")
    const [tableHead, setTableHead] = useState<String[]|null>([])

    useEffect(()=>{
        if(type === TableType.projects){
            setHeading("Active Project")
            const titles = ['Project Name','Member','Progress']
            setTableHead(titles)
        }
        if(type === TableType.tasks){
            setHeading("My Tasks")
            const titles =["Task", "Status", "Deadline"]
            setTableHead(titles)
        }
        return
    },[])
  return (
        <div className="kumbh-font box-shadow py-5 rounded-2xl">
            <div className="text-grey-900 font-bold text-md ps-4">
                {heading}</div>
            <Table>
            <TableHeader className="bg-[#E2E8F0]">
                <TableRow>
                    {tableHead&& tableHead.map((title,index)=>(
                        <TableHead key ={index} className="w-[100px] font-bold">{title}</TableHead>
                    ))}
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow className="font-medium">
                <TableCell>File Management App</TableCell>
                <TableCell>Paid</TableCell>
                <TableCell>$250.00</TableCell>
                </TableRow>
            </TableBody>
            </Table>
            <div className="py-4 text-center">
            View All {type[0].toUpperCase()+type.slice(1)}</div>
        </div>

  )
}

export default DTable