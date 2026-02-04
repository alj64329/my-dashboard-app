

import ConfirmDialog from '@/src/components/ConfirmDialog'
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { FiEdit } from 'react-icons/fi'
import { GoTrash } from 'react-icons/go'


type WithId = {
    _id:string
}

type FieldType =|"text"|"number"|"select"|"date"|"file"|"textarea"

export type FieldConfig<T>= Partial<{[K in keyof T]:{
    type?:FieldType
    options?:{label:string; value:T[K]}[]
    accept?:string
    isImage?:boolean
}}>

type Props<T extends WithId> = {
    title:string
    nonEditKey:(keyof T)[]
    data:T | null,
    fieldConfig?:FieldConfig<T>
    onDelete?:(id:string)=>void,
    onEdit?:(updates:T)=>Promise<boolean>
}

const ProjectItemDetail = <T extends WithId>({title, nonEditKey, data, fieldConfig, onEdit, onDelete}: Props<T>) => {
    const [formData, setFormData] = useState<T|null>(data)
    const [isEditOn, setIsEditOn] = useState(false)
    const [isConfirmOpen, setIsComfirmOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isConfirm, setIsComfirm] = useState<boolean>(false)
    
        const handleOnChange = (e:ChangeEvent<HTMLInputElement|HTMLSelectElement>)=>{
            const {name, value} = e.target
            const key = name as keyof T
    
            setFormData(prev=>({
                ...prev,
                [key]:value
            } as T))
        }
    
        const handleEditSubmit =async(e:FormEvent<HTMLFormElement >)=>{
            e.preventDefault()

            if(!formData) return
            setIsLoading(true)
            const res = await onEdit?.(formData)

            if(res){
                setIsEditOn(false)
                setIsLoading(false)
                return
            }  
        }

        const onDeleteItem = ()=>{
            if(!formData) return
            //alert
            setIsComfirmOpen(true)

            if(isConfirm){
                 //api call to delte
                onDelete?.(formData._id?.toString())
            }
        }

        const renderDisplayField =(key :keyof T)=>{
            if(Array.isArray(formData?.[key])){
                const arr = formData?.[key]

                return (
                    <ul
                    className='py-2 ps-25 flex flex-col gap-2'>
                        {arr.map((item)=>(
                            <li
                            key={item._id}>
                                {item.name}
                            </li>
                        ))}
                    </ul>
                )
            }
            return (
                <span
                className={`${!formData?.[key]&&"text-gray-400"}`}>
                    {formData?.[key]?formData[key] as string:"null"}
                    </span>
            )

        }

        const renderEditableField =(key :keyof T)=>{
            const config = fieldConfig?.[key]
            const type = config?.type ?? "text"

            switch(type){
                case "number":
                    return(
                        <input
                        type="number"
                        name={key.toString()}
                        value={formData?.[key] as string ?? ""}
                        onChange={handleOnChange}
                        className="ms-2 border-b w-[90%] max-w-[200px]"
                        />
                    )
                case "date":
                    return(
                        <input
                        type="date"
                        name={key.toString()}
                        value={formData?.[key] as string ?? ""}
                        onChange={handleOnChange}
                        className="ms-2 border-b w-[90%] max-w-[200px]"
                        />
                    )
                case "select":
                    return(
                        <select
                        name={key.toString()}
                        value={formData?.[key]as string }
                        onChange={handleOnChange}
                        className="ms-2 border-b w-[90%] max-w-[200px]"
                        >
                            {config?.options?.map(opt=>(
                                <option
                                key={(opt.value) as string}
                                value={(opt.value) as string}
                                >
                                    {opt.label}
                                </option>
                            ))}
                        </select>
                    )
                case "file":
                    return(
                        <input
                        type="file"
                        accept={config?.accept}
                        onChange={e=>{
                            const file = e.target.files?.[0]
                            if(!file) return

                            setFormData(prev=>({
                                ...prev,
                                [key]:file
                            }as T))
                        }}
                        className="ms-2 border-b w-[90%] max-w-[200px]"
                        />
                    )
                default:
                    return (
                        <input
                        type="text"
                        name={key.toString()}
                        value={formData?.[key] as string ?? ""}
                        onChange={handleOnChange}
                        className="ms-2 border-b w-[200px]"
                        />
                    )
            }
        }

        useEffect(()=>{
            console.log(data)
        },[data])

  return (
    <>
        <ConfirmDialog isConfirmOpen={isConfirmOpen} setIsComfirmOpen={setIsComfirmOpen} setIsComfirm={setIsComfirm}/>
        <form
        onSubmit={handleEditSubmit}
        className="flex flex-col gap-6 w-[90%] max-w-[550px] h-[70%] max-h-[450px] border py-12 px-6 md:px-18 rounded-2xl">
            <div
            className="flex justify-end gap-4 text-[16px]">
                <button
                type="button"
                onClick={()=>setIsEditOn(prev=>!prev)}
                className="cursor-pointer">
                    <FiEdit/>
                </button>
                <button
                type="button"
                className="cursor-pointer"
                onClick={onDeleteItem}>
                    <GoTrash/>
                </button>
            </div>
            <div className="py-4 text-xl text-center font-bold">
                {title}
            </div>
            {
                formData&&(Object.keys(formData) as (keyof T)[]).map((key)=>(
            <div
            key={key.toString()}
            className={`${!Array.isArray(formData[key])&&"flex justify-between"} ${key==="_id"&& "hidden"}`}>
                <div>{key.toString().toUpperCase()}: </div>
                
                {(isEditOn&&!nonEditKey.includes(key as keyof T))
                ?
                renderEditableField(key)
                :
                renderDisplayField(key)
                    }
            </div>
                ))
            }

            {isEditOn&&
            <button
            type="submit"
            className='cursor-pointer px-6 py-2 bg-black rounded-3xl text-white my-4'>
                {isLoading?"Saving ...":"Save"}</button>}
        </form>
    </>
  )
}

export default ProjectItemDetail