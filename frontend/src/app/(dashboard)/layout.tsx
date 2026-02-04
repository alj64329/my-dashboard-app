
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { DashBoardSidebar } from "@/src/components/dashboard/sidebar/dashboard-sidebar"
import { Role } from "@/src/types/index.types"


import React, { useContext, useEffect, useState } from 'react'


const layout = ({children}:{children:React.ReactNode}) => {


  const companyName =""
  
  // useEffect(()=>{
  //   if(!loggedInUser){
  //     router.push('/')
  //   }
  // },[loggedInUser])

  return (
    <SidebarProvider className="bg-sidebar">
      <DashBoardSidebar companyName={companyName} role={Role.employee} />

      <main className="w-full h-screen">
        <SidebarTrigger
        className="absolute bg-white rounded-full border p-1 left-[5%] md:left-[270px] top-[10px] z-3" />
        <div 
        className="h-[50px] w-full bg-gray-200"></div>
        {children}
      </main>
    </SidebarProvider>
  )
}

export default layout