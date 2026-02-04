'use client'

import { IoChevronBackOutline } from "react-icons/io5";
import ItemDetail, { FieldConfig } from "@/src/components/dashboard/ItemDetail"
import { deleteEmployee, modifyUsers } from "@/src/features/employee.features"
import { Role } from "@/src/types/index.types"
import Link from "next/link"

type Props= {
    data:UserDisplayType
}

type UserDisplayType={
    _id:string,
    name:string,
    email:string,
    position:string,
    role:Role
}
const ClientEmployee = ({data}: Props) => {
        const formData:UserDisplayType={
                _id:data?._id,
                name:data?.name,
                email:data?.email,
                position:data.position,
                role:data.role
        }
        
        const title ="Employee Detail"
        const nonEditKey : (keyof UserDisplayType)[] =["name", "_id","email"]
        const fieldConfig:FieldConfig<UserDisplayType> ={
            role:{
                type:"select",
                options:[
                    {label:"Admin", value:Role.admin},
                    {label:"Employee", value:Role.employee},
                ]
            }
        }
        const backLink = "/admin/employees"
    
        //Delete and edit need to be client
        const onEditUser = async(updates:UserDisplayType) =>{
            const userId = updates._id
            const updatedInfo ={
                position:updates.position,
                role:updates.role
            }
    
            const updatedUser = await modifyUsers(userId, updatedInfo)
    
            if(!updatedUser){
                console.log("Error occurs")
                return false
            }
            console.log("Updated successfully")
            return true
        }
    
        const onDeleteUser = (id:string)=>{
            const deletedUser = deleteEmployee(id)
    
            if(!deletedUser){
                console.log("Error occurs")
                return
            }
            console.log("successfully deleted")
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
            onDelete={onDeleteUser} 
            onEdit={onEditUser}/>}
        </div>
    </>
  )
}

export default ClientEmployee