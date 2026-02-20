import { create } from "zustand"
import { persist } from "zustand/middleware";
import { Role } from "../types/index.types";

export type SignupData={
    companyId:string,
    email:string,
    name:string,
    role:Role | null
}
type SignupStore ={
    signupData:SignupData
    setSignupData:(data:SignupData)=>void,
}


export const useSignupData = create<SignupStore>()(
persist(
    ((set, get)=>({
        signupData:{
            companyId:"",
            email:"",
            name:"",
            role:null
        },
        setSignupData:(signup:SignupData)=>{
            set({signupData:signup})
        },

})),{
    name:"signup-storage"
}
)
)