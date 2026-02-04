'use client'
import { IoChevronBackOutline } from "react-icons/io5";
import { DataTable } from '@/src/components/dashboard/data-table'
import { useDashboard } from '@/src/stores/dashboard.store'
import { navigate } from 'next/dist/client/components/segment-cache/navigation'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useState } from 'react'
import { columns } from './columns'
import Modal from '@/src/components/dashboard/Modal'
import Link from 'next/link'

const TeamsClient = () => {
    const team = useDashboard((state)=>state.teamList)
    const projectId = useSearchParams().get('projectId')
    const navigate = useRouter()

    if(!team){
        //navigate("")
        return 
    }

    const [isModalOpen, setIsModalOpen] = useState(false)

    const {members, project_name, status}=team
    const pageTitle = `${project_name} (${status}) - Team Members`

    const onClose =()=>{
        setIsModalOpen(false)
    }
  return (
    <>
      <div className='text-xl pb-6'>
        {pageTitle}
      </div>

      <div
      className='px-4 py-4 w-full flex justify-between'>
        <Link href={`/admin/projects/${projectId}`}
        className="flex gap-4 items-center">
            <IoChevronBackOutline/>
            Back to Project
        </Link>
        <button
        onClick={()=>setIsModalOpen(true)}>
            Add Member</button>
      </div>
      <DataTable columns={columns} data={members} />
        {isModalOpen&&<Modal isOpen={isModalOpen} setIsClose={onClose}/>}
    </>
  )
}

export default TeamsClient