'use client'
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Role } from "@/src/types/index.types"
import { FormEvent, useState } from "react"

type AdminFormValues = {
  name: string
  email: string
  companyName: string
}

type EmployeeFormValues = {
  name: string
  email: string
  companyCode: string
}

type FormValuesByRole = {
  admin: AdminFormValues
  employee: EmployeeFormValues
}

export type FormFieldConfig<T>={
    id:keyof T,
    label:string,
    placeholder:string,
    type:string
}

type Props<T extends object> = {
    role:Role
    subtext:string
    formFieldConfig:FormFieldConfig<FormValuesByRole>[]
    emptyData:T
    aipFn:(comapnyName:string, adminEmail:string)=>Promise<boolean|undefined>
}

type FormValues = Record<string, string>

const SignupForm1 = <T extends FormValues> ({subtext, formFieldConfig, emptyData}: Props<T> ) => {
    const [formData,setFormData]= useState<T>(emptyData)

    const handleSubmit=async(e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault()

        const isFormCompleted = Object.values(formData).every(value=> value.trim()!== "")

        if(!isFormCompleted){
            console.log("All fields are required")
            return
        }

        

        
    }
  return (
        <form
    className="w-[85%] md:w-[50%] max-w-[400px] px-6 py-8 bg-white">
        <div
        className="text-center pb-4">
            {subtext}
        </div>
        <FieldGroup>
            {formFieldConfig.map((item, i)=>(
            <Field key={i}>
                <FieldLabel htmlFor={`fieldgroup-${String(item.id)}`}>{item.label}</FieldLabel>
                <Input 
                id={`fieldgroup-${String(item.id)}`} 
                placeholder={item.placeholder}
                type={item.type}
                value={formData[item.id]}
                onChange={(e)=>setFormData(prev=>({
                    ...prev,
                    [item.id]:e.target.value
                    }))}/>
            </Field>
            ))}

        <Field orientation="horizontal">
            <Button type="reset" variant="outline">
            Reset
            </Button>
            <Button type="submit">Submit</Button>
        </Field>
        </FieldGroup>

    </form>
  )
}

export default SignupForm1