'use client'
import DTable from "@/src/components/dashboard/DTable"
import { TableType } from "@/src/types/dashboard.types"

const page = () => {

  return (
    <div className="py-8 ps-4">
        <div className="flex flex-col gap-12">
          <DTable type={TableType.projects} />
          <DTable type={TableType.tasks} />
        </div>

    </div>
  )
}

export default page