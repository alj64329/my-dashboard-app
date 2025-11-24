'use client'
import DashboardHead from '@/src/components/dashboard/DashboardHead'
import EventCard from '@/src/components/dashboard/EventCard'
import RequestBtn from '@/src/components/dashboard/RequestBtn'
import Sidebar from '@/src/components/dashboard/Sidebar'
import UserCard from '@/src/components/dashboard/UserCard'
import Welcome from '@/src/components/dashboard/Welcome'
import { UserContext } from '@/src/context/UserContext'
import { RequestType } from '@/src/types/dashboard.types'
import { Role } from '@/src/types/index.types'
import { useRouter } from 'next/navigation'

import React, { useContext, useEffect, useState } from 'react'

const layout = ({children}:{children:React.ReactNode}) => {
  const userInfo= useContext(UserContext)
  const router = useRouter()
  const loggedInUser = userInfo?.loggedInUser
  const role = userInfo?.user?.role
  
  // useEffect(()=>{
  //   if(!loggedInUser){
  //     router.push('/')
  //   }
  // },[loggedInUser])

  return (
    <div className='flex flex-col md:flex-row'>
        <Sidebar/>
        <div className='w-full py-4 px-8 md:px-12'>
          <DashboardHead/>
          <div className='pt-10'>
              {children}
          </div>
        </div>
    </div>
  )
}

export default layout