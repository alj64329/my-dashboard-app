"use client"
import SumCard from '@/src/components/dashboard/SumCard'
import { UserContext } from '@/src/context/UserContext'
import { useContext } from 'react'


const page = () => {
  const userInfo = useContext(UserContext)

  const company = userInfo?.company
  const companyName = company?.company_name
  return (
    <div className='py-8 ps-4'>
      <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
        <SumCard/>
        <SumCard/>
        <SumCard/>
        <SumCard/>
      </div>

    </div>
  )
}

export default page