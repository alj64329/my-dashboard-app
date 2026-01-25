
import { User } from "@/src/types/index.types"
import { nanoid } from "nanoid"
import { useRouter } from "next/navigation"

const BACKEND_ENDPOINT = process.env.NEXT_PUBLIC_BACKEND_ENDOPOINT as string

//Check if the company exist in table or not
export const companyExist = async (comapnyName:string, adminEmail:string)=>{
    const encodeName = encodeURIComponent(comapnyName)
    try{
        const res = await fetch(`${BACKEND_ENDPOINT}/companies/registered/search?company_name=${encodeName}:&email=:${adminEmail}`,{
            method:"GET"
        })
        const data = await res.json() as []

       if(data.length === 0){
        return false
       }
       return true
    }catch(err){
        console.log(err)
    }
}

//send one time password to email address
export const sendOTP = async(email:string):Promise<boolean>=>{
    try{
        const res = await fetch(`${BACKEND_ENDPOINT}/otp/generate-otp`,{
            method:"POST",
            headers:{
                "Content-type" :"application/json",
            },
            body:JSON.stringify({
                email
            }),
        })

        const data = await res.json()
        return true
    }catch(err){
        console.log(err)
        return false
    }
}

// //verify the one time password
export const otpVerification= async(email:string, otp:string)=>{
    try{
        const res = await fetch(`${BACKEND_ENDPOINT}/otp/verify-otp`,{
            method:"POST",
            headers:{
                "Content-type" :"application/json",
            },
            body:JSON.stringify({
                email,
                otp
            }),
        })

        const data = await res.json()

        if(!res.ok){
            return console.log('Something went wrong')
        }
        return true
    }catch(err){
        console.log(err)
    }
}

//create comapny
export const registerCompany = async (company_name:string)=>{
    try{

        const res = await fetch(`${BACKEND_ENDPOINT}/companies`,{
            method:"POST",
            headers:{
                "Content-type" :"application/json",
            },
            body:JSON.stringify({
                company_name,
            }),
        })

        const data = await res.json()
        console.log(data)

        if(!res.ok){
            return console.log('Something went wrong')
        }

        console.log("Company is successfully registered")
        return data
    }catch(err){
        console.log(err)
    }
}

//update company with adminId
export const assignAdmin = async(companyId:string,adminId:string)=>{
    try{
        const res = await fetch(`${BACKEND_ENDPOINT}/companies/${companyId}`,{
            method:"PUT",
            headers:{
                "Content-type" :"application/json",
            },
            body:JSON.stringify({
                adminId,
            }),
        })

        if(!res.ok){
            return console.log("Error occur in assigning admin to company")
        }
        const data = await res.json()
        return data
    }catch(err){
        console.error(err)
    }
}

//update auth password
export const updateAccount = async (userId:string, newData:Partial<User>)=>{
    try{
         const res = await fetch(`${BACKEND_ENDPOINT}/${userId}`,{
            method:"PUT",
            headers:{
               "Content-type" :"application/json",
            },
            body: JSON.stringify({
                newData
            }),
         })

         if(!res.ok){
            console.log("error in update")
            return
         }

        const data = await res.json()
        console.log(data)
        console.log("Password successfully updated")
        return true
    }catch(err){
        console.log(err)
        return false
    }
}

export const login= async(email:string, password:string)=>{
    try{
        const res = await fetch(`${BACKEND_ENDPOINT}/users/login`,{
            method:"POST",
            headers:{
                "Content-type" :"application/json",
            },
            body:JSON.stringify({
                email,
                password
            }),
            credentials:"include"
        })

        const data = await res.json()

        if(!res.ok){
            return false
        }

        const loggedInUser = data.user
        return loggedInUser

    }catch(err){
        console.log(err)
        return false
    }
}

//add user 
export const registerUser = async ({name, email, companyId, role, password}:Partial<User>)=>{
    try{
        const res = await fetch(`${BACKEND_ENDPOINT}/users/signup`,{
            method:"POST",
            headers:{
                "Content-type" :"application/json",
            },
            body:JSON.stringify({
                email,
                password,
                companyId,
                role,
                name
            }),
        })

        if(!res.ok){
            console.log("Error in registerUser")
            return
        }
        const data = await res.json()
        console.log("User is successfully registered")
        return data
    }catch(err){
        console.log(err)
    }
}

export const findCompany = async(company_code:string)=>{
    try{
        const res = await fetch(`${BACKEND_ENDPOINT}/companies/search?company_code=${company_code}`,{
            method:"GET"
        })

        const data = await res.json()
        console.log(data)
       if(!res.ok){
        return false
       }
       return data
    }catch(err){
        console.log(err)
    }
}

//Log out
export const logout = async()=>{
    try{
        const res = await fetch(`${BACKEND_ENDPOINT}users/logout`,{
            credentials:"include"
        })

        if(!res.ok){
            console.log("Error in logout")
            return false
        }

        return true

    }catch(err){
        console.error("logout failed")
        return false
    }
}
