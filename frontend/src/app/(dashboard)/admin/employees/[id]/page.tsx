'use client'
import { IoChevronBackOutline } from "react-icons/io5";
import useFetchById from "@/src/hooks/useFetchById"
import { Role, User } from "@/src/types/index.types"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import ItemDetail from "@/src/components/dashboard/ItemDetail";
import { deleteEmployee, modifyUsers } from "@/src/features/employee.features"
import Link from "next/link"

//
type UserDisplayType={
    _id:string,
    name:string,
    email:string,
    position:string,
    role:Role
}

const page = () => {
    
    const empId = useParams().id?.toString()
    const {data, isLoading, errorMessage } = empId?useFetchById<User>("users",empId):
    {data:null, isLoading:false, errorMessage: "Missing employee user id"}
    const [formData, setFormData]= useState<UserDisplayType|null>(null)
    
    const title ="Employee Detail"
    const nonEditKey : (keyof UserDisplayType)[] =["name", "_id","email"]
    const backLink = "/admin/employees"

    const onEditUser = (updates:UserDisplayType) =>{
        const userId = updates._id
        const updatedInfo ={
            position:updates.position,
            role:updates.role
        }

        const updatedUser = modifyUsers(userId, updatedInfo)

        if(!updatedUser){
            console.log("Error occurs")
            return
        }

    }

    const onDeleteUser = (id:string)=>{
        const deletedUser = deleteEmployee(id)

        if(!deletedUser){
            console.log("Error occurs")
            return
        }
        console.log("successfully deleted")
    }

    useEffect(()=>{
        if(isLoading) return

        if(data){
        setFormData({
            _id:data?._id,
            name:data?.name,
            email:data?.email,
            position:data.position,
            role:data.role
        })
        }
    },[isLoading,data])

    if(isLoading){
        return(
            <div
            className="w-full h-full flex justify-center items-center">
                <div>
                    Loading...
                </div>
            </div>
        )
    }

    if(errorMessage || !data){
        return (
            <div
            className="w-full h-full flex justify-center items-center">
                <div>
                    Page Not Found
                </div>
            </div>
        )
    }

  return (
    <div>
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
            onDelete={onDeleteUser} 
            onEdit={onEditUser}/>}
        </div>

    </div>
  )
}

export default page




