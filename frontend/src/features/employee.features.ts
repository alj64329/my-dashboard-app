import { User } from "../types/index.types"


const BACKEND_ENDPOINT = `${process.env.NEXT_PUBLIC_BACKEND_ENDOPOINT}/users`
//get user by id
export const fetchUserById = async(userId:string)=>{
    try{        
        const res = await fetch(`${BACKEND_ENDPOINT}/${userId}`,{
            method:"GET",
        })

        const data = res.json()
        return data
    }catch(err){
       console.log(err)
       return null
    }
}
//update users
export const modifyUsers = async (userId:string,updates:Partial<User>)=>{
    console.log(updates)
    try{
        const res = await fetch(`${BACKEND_ENDPOINT}/${userId}`,{
            method:"PUT",
            headers:{
                "Content-type" :"application/json",
            },
            body:JSON.stringify(
                updates
            ),
        })

        const data = await res.json()
        console.log("Date",data)

        return data
    }catch(err){
        console.log(err)
    }
}

//delete users
export const deleteEmployee = async (userId:string)=>{
    try{
        const res = await fetch(`${BACKEND_ENDPOINT}/${userId}`,{
            method:"DELETE"
        })

        const data = await res.json()

        console.log(`${data} has been deleted form comapny`)
        return data
    }catch(err){
        console.log(err)
    }
}

//list users by company Id
export const listUsersByCompany = async(companyId:string)=>{
    try{
        const res = await fetch(`${BACKEND_ENDPOINT}/search?companyId=${companyId}`,{
            method:"GET"
        })

        const data = await res.json()

        return data
    }catch(err){
        console.log(err)
    }
}
