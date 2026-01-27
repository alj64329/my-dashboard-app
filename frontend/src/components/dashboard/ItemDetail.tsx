import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { FiEdit } from 'react-icons/fi'
import { GoTrash } from 'react-icons/go'

type Editable = string | number

type Props<T extends object> = {
    title:string
    nonEditKey:(keyof T)[]
    data:T | null,
    onDelete?:(id:string)=>void,
    onEdit?:(updates:T)=>void
}

const ItemDetail = <T extends Record<string, Editable>>({title, nonEditKey, data, onEdit, onDelete}: Props<T>) => {
    const [formData, setFormData] = useState<T|null>(data)
    const [isEditOn, setIsEditOn] = useState(false)
    
        const handleOnChange = (e:ChangeEvent<HTMLInputElement>)=>{
            const {name, value} = e.target
            const key = name as keyof T
    
            setFormData(prev=>({
                ...prev,
                [key]:value
            } as T))
        }
    
        const handleEditSubmit =(e:FormEvent<HTMLFormElement>)=>{
            e.preventDefault()

            if(!formData) return
            onEdit?.(formData)
        }

        const onDeleteItem = ()=>{
            if(!formData) return
            //alert

            //api call to delte
            onDelete?.(formData._id.toString())
        }

  return (
    <>
        <form
        onSubmit={handleEditSubmit}
        className="flex flex-col gap-6 w-[90%] max-w-[550px] h-[70%] max-h-[450px] border py-12 px-6 md:px-18 rounded-2xl">
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
            className={`flex justify-between ${key==="_id"&& "hidden"}`}>
                <div>{key.toString().toUpperCase()}: </div>
                
                {(isEditOn&&!nonEditKey.includes(key as keyof T))
                ?<input 
                type="text" 
                name={key.toString()}
                value={formData[key]??""}
                onChange={handleOnChange}
                className="ms-2 border-b w-[150px]"/>
                :<span
                className={`${!formData[key]&&"text-gray-400"}`}>
                    {formData[key]?formData[key]:"null"}</span>
                    }
            </div>
                ))
            }

            {isEditOn&&
            <button
            type="submit"
            className='cursor-pointer px-6 py-2 bg-black rounded-3xl text-white my-4'>
                Save</button>}
        </form>
    </>
  )
}

export default ItemDetail