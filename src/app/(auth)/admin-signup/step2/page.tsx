'use client'
import OTPForm from '@/src/components/OTPForm'
import { AdminData, EmployeeData } from '@/src/types/index.types'
import React, { useEffect, useState } from 'react'

const page = () => {
  const route = "/admin-signup/step3"
  const [registrationData, setRegistrationData] =
  useState<AdminData | EmployeeData | undefined>(undefined)

  useEffect(()=>{
    const stored =localStorage.getItem("registrationData")
    if(stored){
      setRegistrationData(JSON.parse(stored))
    }
  },[])

  return (
      <div className="bg-grey-25 min-h-screen">
        <div className="flex justify-center flex-col w-fit mx-auto bg-white py-16 px-16">
            <h3 className="text-center font-bold text-[24px] text-grey-500 pb-13 pt-10">
                Please enter OTP
            </h3>
            <OTPForm data ={registrationData} route={route}/>
        </div>
    </div>
  )
}

export default page