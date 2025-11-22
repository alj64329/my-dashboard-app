"use client"
import { UserContext } from '@/src/context/UserContext'
import { useContext } from 'react'

const page = () => {
  const userInfo = useContext(UserContext)

  const company = userInfo?.company
  const companyName = company?.company_name
  return (
    <div className='flex pt-16 px-8'>
      <h2 className='text-4xl ps-6'>
        Welcome to your dashboard{companyName&& `, ${companyName}`} 
      </h2>
    </div>
  )
}

export default page