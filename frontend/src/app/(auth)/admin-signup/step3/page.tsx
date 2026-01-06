"use client"
import AuthFormBase from '@/src/components/AuthFormBase'
import { AdminData, EmployeeData } from '@/src/types/index.types'
import { useEffect, useState } from 'react'


const page = () => {
  const [registrationData, setRegistrationData] =
  useState<AdminData | EmployeeData | undefined>(undefined)


  useEffect(()=>{
    const stored =localStorage.getItem("registrationData")
    if(stored){
      setRegistrationData(JSON.parse(stored))
    }
  },[])

  return (
    <AuthFormBase h2Title='Choose your password' authFormType="signup-step2" data ={registrationData}/>
  )
}

export default page