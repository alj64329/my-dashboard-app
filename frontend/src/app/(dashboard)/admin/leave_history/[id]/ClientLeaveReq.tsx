'use client'
import { IoChevronBackOutline } from "react-icons/io5";
import ItemDetail, { FieldConfig } from "@/src/components/dashboard/ItemDetail"
import { modifyRequest } from "@/src/features/request/leaveRequest.features"
import { User } from "@/src/types/index.types"
import { ApprovalStatus, LeaveType } from "@/src/types/service.types"
import Link from "next/link"
import { useEffect, useState } from "react"

export type LRReturnType={
    _id: string,
    userId: User,
    companyId:string,
    fromDate: string,
    toDate:string,
    leaveType: LeaveType,
    approvalStatus:ApprovalStatus
}

type LRDisplayType={
    _id: string,
    name: string,
    fromDate: string,
    toDate:string,
    leaveType: LeaveType,
    approvalStatus:ApprovalStatus
}

type Props = {
    data:LRReturnType
}

const ClientLeaveReq = ({data}: Props) => {
    const [formData, setFormData]= useState<LRDisplayType|null>(null)
    
    const title ="Leave Request Detail"
    const nonEditKey : (keyof LRDisplayType)[] =["name", "_id","fromDate", "toDate","leaveType"]
    const fieldConfig:FieldConfig<LRDisplayType> ={
        approvalStatus:{
            type:"select",
            options:[
                {label:"Approved", value:ApprovalStatus.approved},
                {label:"Declied", value:ApprovalStatus.declined},
                {label:"Pending", value:ApprovalStatus.pending},
                {label:"Cancel", value:ApprovalStatus.cancel},
            ]
        }
    }
    const backLink = "/admin/leave_history"

    useEffect(()=>{

        if(data){
        setFormData({
            _id:data?._id,
            name:data?.userId.name,
            fromDate:data.fromDate,
            toDate:data.toDate,
            leaveType:data.leaveType,
            approvalStatus:data.approvalStatus,
        })
        }
    },[data])
    const onEditRequest = async(updates:LRDisplayType) =>{
        const userId = updates._id
        const updatedInfo ={
            approvalStatus:updates.approvalStatus,
        }

        const updatedUser = await modifyRequest(userId, updatedInfo)

        if(!updatedUser){
            console.log("Error occurs")
            return false
        }
        return true
    }
  return (
    <>
        <div className="flex w-full p-4">
            <Link href={backLink}
            className="flex items-center gap-4 w-fit">
            <IoChevronBackOutline/> Back
            </Link>
        </div>
        <div
        className="flex pt-20 justify-center w-full h-full">
            {formData&&
            <ItemDetail 
            title={title} 
            nonEditKey={nonEditKey} 
            data={formData} 
            fieldConfig={fieldConfig}
            onEdit={onEditRequest}/>}
        </div>

    </>
  )
}

export default ClientLeaveReq