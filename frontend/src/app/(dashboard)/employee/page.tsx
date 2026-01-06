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
          <div className="py-2 md:py-7 ps-4">
            <div className="flex flex-col gap-12">
              <div className="md:hidden">
                <EventCard/>
                {role !== Role.admin && 
                <div className='flex gap-4 pt-6'>
                  <RequestBtn requestType={RequestType.expense}/>
                  <RequestBtn requestType={RequestType.leave}/>
                </div>}
              </div>
              <DTable type={TableType.projects} />
              <DTable type={TableType.tasks} />
            </div>
          </div>
        </div>
        <div className="hidden md:block">
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