'use client'
import DTable from "@/src/components/dashboard/DTable"
import EventCard from "@/src/components/dashboard/EventCard"
import RequestBtn from "@/src/components/dashboard/RequestBtn"
import UserCard from "@/src/components/dashboard/UserCard"
import Welcome from "@/src/components/dashboard/Welcome"
import { UserContext } from "@/src/context/UserContext"
import { RequestType, TableType } from "@/src/types/dashboard.types"
import { Role } from "@/src/types/index.types"
import { useContext } from "react"

const page = () => {
  const userInfo= useContext(UserContext)
  const role = userInfo?.user?.role

  return (
    <div className='flex justify-between'>
        <div className='md:w-[65%]'>
          <Welcome/>
          <div className="py-8 ps-4">
            <div className="flex flex-col gap-12">
              <DTable type={TableType.projects} />
              <DTable type={TableType.tasks} />
            </div>
            </div>
        </div>
        <div>
          <UserCard />
          <EventCard/>
          {role !== Role.admin && 
          <div className='flex flex-col gap-4 pt-6'>
            <RequestBtn requestType={RequestType.expense}/>
            <RequestBtn requestType={RequestType.leave}/>
          </div>}
        </div>
    </div>
  )
}

export default page