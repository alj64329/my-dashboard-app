'use client'
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { DashBoardSidebar } from "@/src/components/dashboard/sidebar/dashboard-sidebar"
import { UserContext } from '@/src/context/UserContext'
import { Role } from "@/src/types/index.types"
import { useRouter } from 'next/navigation'

import React, { useContext, useEffect, useState } from 'react'


const layout = ({children}:{children:React.ReactNode}) => {
  const userInfo= useContext(UserContext)
  const router = useRouter()
  const loggedInUser = userInfo?.loggedInUser
  const role = loggedInUser?.role
  const [open, setOpen] = useState(false)
  const companyName =""
  
  // useEffect(()=>{
  //   if(!loggedInUser){
  //     router.push('/')
  //   }
  // },[loggedInUser])

  return (
    <SidebarProvider className="bg-sidebar">
      <DashBoardSidebar companyName={companyName} role={role??Role.admin} />

      <main className="w-full">
        <SidebarTrigger
        className="absolute bg-white rounded-full border p-1 left-[5%] lg:left-[270px] top-[10px] z-3" />
        <div 
        className="h-[50px] w-full bg-gray-200"></div>
        {children}
      </main>
    </SidebarProvider>
  )
}

export default layout