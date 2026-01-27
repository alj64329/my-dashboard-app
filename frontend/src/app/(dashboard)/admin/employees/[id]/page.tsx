'use client'
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { FiEdit } from "react-icons/fi";
import { GoTrash } from "react-icons/go";
import useFetchById from "@/src/hooks/useFetchById"
import { User } from "@/src/types/index.types"
import { useParams } from "next/navigation"
import { ChangeEvent, FormEvent, useEffect, useState } from "react"

const page = () => {
    const empId = useParams().id?.toString()
    const {data, isLoading, errorMessage } = empId?useFetchById<User>("users",empId):
    {data:null, isLoading:false, errorMessage: "MIssing employee user id"}
    const [formData, setFormData]= useState<Partial<User>|null>()
    const [isEditOn, setIsEditOn] = useState(false)
    
    const title ="Employee Detail"
    const nonEditKey =["name", "_id","email"]


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
    },[isLoading])

    const handleOnChange = (e:ChangeEvent<HTMLInputElement>)=>{
        const {name, value} = e.target

        setFormData(prev=>({
            ...prev,
            [name]:value
        }))
    }

    const handleEditSubmit =(e:FormEvent)=>{
        e.preventDefault()
    }

    if(errorMessage && !data){
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
        <div
        className="flex pt-20 justify-center w-full h-full">

            <form
            onSubmit={handleEditSubmit}
            className="flex flex-col gap-6 w-fit border py-8 px-6 md:px-18 rounded-2xl">
                <div
                className="flex justify-end gap-4 text-[16px]">
                    <button
                    type="button"
                    onClick={()=>setIsEditOn(true)}
                    className="cursor-pointer">
                        <FiEdit/>
                    </button>
                    <button
                    type="button"
                    className="cursor-pointer">
                        <GoTrash/>
                    </button>
                </div>
                <div className="py-4 text-xl text-center font-bold">
                    {title}
                </div>
                {
                    formData&&Object.keys(formData).map((key)=>(
                <div
                key={key}
                className={`flex justify-between ${key==="_id"&& "hidden"}`}>
                    <div>{key.toUpperCase()}: </div>
                    {(isEditOn&&!nonEditKey.includes(key))
                    ?<input 
                    type="text" 
                    name={key}
                    value={formData[key as keyof User]}
                    onChange={handleOnChange}
                    className="ms-2 border-b w-[150px]"/>
                    :<span
                    className={`${!formData[key as keyof User]&&"text-gray-400"}`}>
                        {formData[key as keyof User]?formData[key as keyof User]:"null"}</span>
                        }
                </div>
                    ))
                }

                {isEditOn&&
                <button
                type="submit">Save</button>}
            </form>
        </div>

    </div>
  )
}

export default page




