import { DataTable } from '@/src/components/dashboard/data-table'
import { companyId } from '@/src/constants/test'
import useFetchCompanyData from '@/src/hooks/useFetchCompanyData'
import React, { useEffect, useState } from 'react'
import{ columns} from "./columns"
import Modal from '@/src/components/dashboard/Modal'

type Props = {}

const page = () => {
  const {isLoading, errorMessage, data} = useFetchCompanyData("expense-requests",companyId)
  const [isModalOpen, setIsModalOpen] =useState(false)
  const pageTitle ="Expense REquest"

  const formComponent =[

  ]
  const onClose = ()=>{
    setIsModalOpen(false)
  }

  const handleOnOpen =()=>{
    setIsModalOpen(true)
  }

  useEffect(()=>{

  },[isLoading])

  if(isLoading){
    return (
      <div
       className="w-full h-full flex justify-center items-center">
        <div>
          Loading...
        </div>
      </div>
    )
  }
  return (
    <div
    className="py-5 px-6 lg:px-10">
      {/* Header */}
      <div className='text-xl'>
        {pageTitle}
      </div>

      <div
      className='px-4 py-4 w-full flex justify-end'>

        <button
        className='py-1 px-3 font-bold text-white bg-red-700 rounded-md text-md cursor-pointer'
        onClick={handleOnOpen}>
          Add New
        </button>
      </div>
      <DataTable columns={columns} data={data} />
      {isModalOpen&&<Modal isOpen={isModalOpen} setIsClose={onClose}/>}
    </div>
  )
}