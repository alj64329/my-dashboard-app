"use client"
import AdminTable, { PendingTableExpense, PendingTableLeave } from '@/src/components/dashboard/admin/AdminTable'
import PendingReqForm from '@/src/components/dashboard/admin/PendingReqForm'
import SumCard from '@/src/components/dashboard/SumCard'
import Modal from '@/src/components/Modal'
import { UserContext } from '@/src/context/UserContext'
import { useContext, useEffect, useState } from 'react'

export type DatasetType= {
        type:"expense",
        data:PendingTableExpense
    }|
    {
        type:"leave",
        data:PendingTableLeave
    }


const page = () => {
  const userInfo = useContext(UserContext)
  const [isModalOpen, setIsModalOpen] =useState<boolean>(false)
  const [modalData, setModalData] = useState<PendingTableExpense|PendingTableLeave>()
  const [modalDataset,setModalDataset] = useState<DatasetType|null>()

  const onModaHandler =()=>{
    setIsModalOpen(curr=>!curr)
  }

  const dataSetter=(data:PendingTableExpense|PendingTableLeave)=>{
    setModalData(data)
  }

  const company = userInfo?.company
  const companyName = company?.company_name
  
  useEffect(()=>{
    if(!modalData) return
    
    //setting datase
    if("expenseType" in modalData){
      setModalDataset(
        {
        type:"expense",
        data:modalData
      })
    }else if("from" in modalData){
      setModalDataset({
        type:"leave",
        data:modalData
        }
      )
    
    return
    }
  },[modalData])

  return (
    <div className='py-8 ps-4'>
      <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
        <SumCard/>
        <SumCard/>
        <SumCard/>
        <SumCard/>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 pt-10 gap-10'>
        <AdminTable type="expense" onModaHandler={onModaHandler} dataSetter={dataSetter} />
        <AdminTable type="leave" onModaHandler={onModaHandler} dataSetter={dataSetter}/>
      </div>

      {(isModalOpen&&modalData)&&
      <Modal isOpen={isModalOpen} 
      setIsOpen={onModaHandler}
      ContentComponent={PendingReqForm}
      dataset={modalDataset}/>}

    </div>
  )
}

export default page