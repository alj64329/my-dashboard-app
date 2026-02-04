'use client'

import { DataTable } from '@/src/components/dashboard/data-table'
import { companyId } from '@/src/constants/test'
import useFetchCompanyData from '@/src/hooks/useFetchCompanyData'
import React, { useEffect, useMemo, useState } from 'react'

import Modal from '@/src/components/dashboard/Modal'
import { columns } from './columns'
import { Status } from '@/src/types/index.types'
import { cleaningProjectData } from '@/src/utils/dataClaenup'

export interface CleanedDataType{
  _id:string
  project_name:string
  status:Status,
  members:number
}


const ProjectsClient = () => {
  const {isLoading, errorMessage, data} = useFetchCompanyData("teams",companyId)
  const [isModalOpen, setIsModalOpen] =useState(false)
  const cleanedData = useMemo<CleanedDataType[]>(()=>{
    if(!data) return []
    return cleaningProjectData(data)
  },[data])

  const pageTitle ="Projects"

  const onClose = ()=>{
    setIsModalOpen(false)
  }

  const handleOnOpen =()=>{
    setIsModalOpen(true)
  }


  if(isLoading){
    return (
      <div
       className="w-full h-[90%] flex justify-center items-center">
        <div>
          Loading...
        </div>
      </div>
    )
  }

  if (errorMessage) {
    return <div>{errorMessage}</div>
  }

  return (
    <>
      {/* Header */}
      <div className='text-xl'>
        {pageTitle}
      </div>

      <div
      className='px-4 py-4 w-full flex justify-end'>
        <button>
          Create new project
        </button>
      </div>
      <DataTable columns={columns} data={cleanedData} />
      {isModalOpen&&<Modal isOpen={isModalOpen} setIsClose={onClose}/>}
    </>
  )
}

export default ProjectsClient