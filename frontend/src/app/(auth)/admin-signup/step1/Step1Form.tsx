'use client'
import { Button } from "@/components/ui/button"
import toast from 'react-hot-toast';
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { FormFieldConfig } from "@/src/components/auth/SignUpForm1"
import { companyExist, registerCompany } from "@/src/features/auth/auth.features"
import { FormEvent, useState } from "react"
import { SignupData, useSignupData } from "@/src/stores/signup.store";
import { companyId } from "@/src/constants/test";
import { Company } from "@/src/types/index.types";
import { redirect, useRouter } from "next/navigation";


type Props={
    subtext:string,
    emptyData:AdminFormValues,
    fieldConfig:FormFieldConfig<AdminFormValues>[]
}

export type AdminFormValues = {
  name: string
  email: string
  company_name: string
}

const Step1Form = ({subtext, emptyData, fieldConfig}:Props) => {
    const {setSignupData}= useSignupData()
    const [formData,setFormData]= useState<AdminFormValues>(emptyData)
    const [errorMsg, setErrorMsg] = useState<string>("")

    const handleSubmit=async(e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        const {email, company_name}= formData

        const isCompanyRegister:boolean=await companyExist(company_name, email)

        if(!isCompanyRegister){
            setErrorMsg("Company exists on our record")
            return
        }
        //register company with no admin id 
        const newCompany= await registerCompany(company_name) 

        if(!newCompany){
            //toaster
            toast("Something went wrong while registering a compnay. Please try again")
            return
        }

        const signupData :SignupData = {
            companyId:(newCompany as Company)._Id,
            name:formData.name,
            email:formData.email
        }

        setSignupData(signupData)
        redirect("/admin-signup/step2")

    }

  return (
        <form
    className="w-[85%] md:w-[50%] max-w-[400px] px-6 py-8 bg-white"
    onSubmit={handleSubmit}>
        <div
        className="text-center pb-4">
            {subtext}
        </div>

        {errorMsg&&(
            <div
            className="text-sm text-red-700 py-4">
                {errorMsg}
            </div>
        )}
        <FieldGroup>
            {fieldConfig.map((item, i)=>(
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

export default Step1Form