import { UserContext } from '@/src/context/UserContext'
import { ExpenseReq } from '@/src/types/index.types'
import React, { useContext, useEffect, useState } from 'react'


const page = () => {
  const userInfo = useContext(UserContext)
  const comapnyId = userInfo?.loggedInUser?.companyId._Id
  const [expenseReqs,setExpenseReqs] = useState<ExpenseReq|null>(null)

  useEffect(()=>{

  },[comapnyId])



  if(!comapnyId) return null
  return (
    <div>page</div>
  )
}

export default page