"use client"

import { DataTable } from "@/src/components/dashboard/data-table"
import { useUser } from "@/src/stores/user.store"
import { ColumnDef } from "@tanstack/react-table"
import useFetchCompanyData from "@/src/hooks/useFetchCompanyData"
import { useEffect, useState } from "react"

import { companyId } from "@/src/constants/test"
import Modal from "@/src/components/dashboard/Modal"

type TablePageClientProps<TData,TValue> = {
  title: string
  endpoint: string
  columns: ColumnDef<TData, TValue>[]
}

export default function TablePageClient<TData,TValue>({
  title,
  endpoint,
  columns,
}: TablePageClientProps<TData,TValue>) {
  // const { loggedInUser } = useUser()
  // if (!loggedInUser) return null

  const { isLoading, errorMessage, data } = useFetchCompanyData(endpoint,companyId)
  console.log(data)
  const [isModalOpen, setIsModalOpen] =useState(false)

  const onClose = ()=>{
    setIsModalOpen(false)
  }


  if (isLoading) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        Loading...
      </div>
    )
  }

  if (errorMessage) {
    return <div>{errorMessage}</div>
  }

  return (
    <>
      <div className="text-xl mb-4">{title}</div>
    <div
      className='px-4 py-4 w-full flex justify-end'>

      </div>
      <DataTable columns={columns} data={data ?? []} />
    {isModalOpen&&<Modal isOpen={isModalOpen} setIsClose={onClose}/>}
    </>
  )
}
