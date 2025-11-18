'use client'
import Sidebar from '@/src/components/dashboard/Sidebar'
import React, { useContext, useEffect, useState } from 'react'

const layout = ({children}:{children:React.ReactNode}) => {
  return (
    <div className='flex'>
        <Sidebar/>
        <div>{children}</div>
    </div>
  )
}

export default layout