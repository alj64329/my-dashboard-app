'use client'
import { IoChevronBackOutline } from "react-icons/io5";
import ItemDetail, { FieldConfig } from "@/src/components/dashboard/ItemDetail"
import { modifyRequest } from "@/src/features/request/expenseRequest.features"
import { ApprovalStatus } from "@/src/types/service.types"
import { useEffect, useState } from "react"
import { ERReturnType } from "./page"
import Link from "next/link"

type ERDisplayType={
    _id:string,
    title:string,
    name:string,
    desc:string,
    amount:number,
    receipt:string,
    approvalStatus:ApprovalStatus
}


type Props = {
    data:ERReturnType
}

const ClientExpenseReq = ({data}: Props) => {
    const [formData, setFormData]= useState<ERDisplayType|null>(null)
    
    const title ="Employee Detail"
    const nonEditKey : (keyof ERDisplayType)[] =["name", "_id","receipt", "title","receipt"]
    const fieldConfig:FieldConfig<ERDisplayType> ={
        desc:{
            type:"textarea"
        },
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
    const backLink = "/admin/expense_history"

    const onEditRequest = async(updates:ERDisplayType) =>{
        const userId = updates._id
        const updatedInfo ={
            approvalStatus:updates.approvalStatus,
            desc: updates.desc
            
        }

        const updatedUser = await modifyRequest(userId, updatedInfo)

        if(!updatedUser){
            console.log("Error occurs")
            return false
        }
        return true
    }


    useEffect(()=>{

        if(data){
        setFormData({
            _id:data?._id,
            title:data.title,
            name:data?.userId.name,
            amount:data.amount,
            approvalStatus:data.approvalStatus,
            receipt:data.receipt,
            desc:data.desc
        })
        }
    },[data])

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

export default ClientExpenseReq