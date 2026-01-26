"use client"

import { UserContext } from '@/src/context/UserContext'
import { useContext, useEffect, useState } from 'react'

const page = () => {
  const userInfo = useContext(UserContext)
  const company = userInfo?.loggedInUser?.companyId
  const companyName = company?.company_name
  
  // useEffect(()=>{
  //   if(!modalData) return
    
  //   //setting datase
  //   if("expenseType" in modalData){
  //     setModalDataset(
  //       {
  //       type:"expense",
  //       data:modalData
  //     })
  //   }else if("from" in modalData){
  //     setModalDataset({
  //       type:"leave",
  //       data:modalData
  //       }
  //     )
    
  //   return
  //   }
  // },[modalData])

  return (
    <div className='py-8 ps-4'>
      <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>

      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 pt-10 gap-10'>

      </div>


    </div>
  )
}

export default page