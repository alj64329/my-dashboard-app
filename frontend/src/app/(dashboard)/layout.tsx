'use client'
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { DashBoardSidebar } from "@/src/components/dashboard/sidebar/dashboard-sidebar"
import { UserContext } from '@/src/context/UserContext'
import { useRouter } from 'next/navigation'

import React, { useContext, useEffect, useState } from 'react'


const layout = ({children}:{children:React.ReactNode}) => {
  const userInfo= useContext(UserContext)
  const router = useRouter()
  const loggedInUser = userInfo?.loggedInUser
  const role = loggedInUser?.role
  const [open, setOpen] = useState(false)
  
  // useEffect(()=>{
  //   if(!loggedInUser){
  //     router.push('/')
  //   }
  // },[loggedInUser])

  return (
    <SidebarProvider>
      <DashBoardSidebar />
      <main>
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  )
}

export default layout