'use client'
import Sidebar from '@/src/components/dashboard/Sidebar'
import { UserContext } from '@/src/context/UserContext'
import { getCompany, getUser } from '@/src/utils/dashboad'
import React, { useContext } from 'react'

const layout = ({children}:{children:React.ReactNode}) => {
      const userInfo= useContext(UserContext)
    
      const loggedInUser = userInfo?.loggedInUser
      const appwriteId = loggedInUser?.$id

      if(!appwriteId) return

      //get company name and user name
      const user = getUser(appwriteId)
      if(!user) return

    //   const companyId = user[0].companyId
      const company = getCompany
  return (
    <div className='flex'>
        <Sidebar/>
        <div>{children}</div>
    </div>
  )
}

export default layout