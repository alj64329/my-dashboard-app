"use client"

import { DataTable } from "@/src/components/dashboard/data-table"
import { useUser } from "@/src/stores/user.store"
import useFetchByQuery from "@/src/hooks/useFetchByQuery"
import { ColumnDef } from "@tanstack/react-table"

type TablePageClientProps<TData, TValue> = {
  title: string
  endpoint: string
  columns: ColumnDef<TData, TValue>[]
}

export default function TablePageClient<TData, TValue>({title, endpoint, columns,}: TablePageClientProps<TData, TValue>) {
  const { loggedInUser } = useUser()
  if (!loggedInUser) return null

  const { isLoading, errorMessage, data } =
    useFetchByQuery<TData[]>(endpoint, `userId=${loggedInUser._id}`)

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
    </>
  )
}
