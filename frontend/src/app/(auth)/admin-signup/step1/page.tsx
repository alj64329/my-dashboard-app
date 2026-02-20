import { FormFieldConfig } from "@/src/components/auth/SignUpForm1"
import Step1Form, { AdminFormValues } from "./Step1Form"

const page = () => {
    const headtext ="Welcome, create your company account"
    const subtext="It is our great pleasure to have you on board!"
    const emptyData:AdminFormValues={
        name:"",
        email:"",
        company_name:""
    }
    const fieldConfig :FormFieldConfig<AdminFormValues>[] =[
      {
          id:"name",
          label:"Name",
          placeholder:"Jordan Lee",
          type:"text"
      },
      {
          id:"company_name",
          label:"Company Name",
          placeholder:"Comapny ABC",
          type:"text"
      },
      {
          id:"email",
          label:"Email",
          placeholder:"name@example.com",
          type:"email"
      }
    ]
  return (
    <div
    className="w-full h-screen flex flex-col justify-center items-center gap-8 bg-[#FCFAFA]">
        <h1
        className="text-xl text-center">{headtext}</h1>
        <Step1Form
        subtext={subtext}
        emptyData={emptyData}
        fieldConfig={fieldConfig}
        />
    </div>
  )
}

export default page