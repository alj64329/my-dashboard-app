import { ExpenseReq } from "@/src/types/index.types"

const BACKEND_ENDPOINT = `${process.env.NEXT_PUBLIC_BACKEND_ENDOPOINT}/expense-requests`

//create expense-requests
export const createExpenseRequest = async(request:Partial<ExpenseReq>)=>{
        try{
            const res = await fetch(BACKEND_ENDPOINT,{
                method:"POST",
                headers:{
                    "Content-type" :"application/json",
                },
                body:JSON.stringify({
                    request
                }),
            })

            const data = await res.json()

            console.log("Expense request has been created")
            return data
        }catch(err){
            console.log(err)
        }
}

//modify the request
export const modifyRequest = async (expenseReqId:string, updates:Partial<ExpenseReq>)=>{
    try{
        const res = await fetch(`${BACKEND_ENDPOINT}/${expenseReqId}`,{
            method:"PUT",
            headers:{
                "Content-type" :"application/json",
            },
            body:JSON.stringify({
                updates
            }),
        })

        const data = await res.json()

        return data
    }catch(err){
        console.log(err)
    }
}

//get all requests for a company
export const listExpenseRequests = async(companyId:string)=>{
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

//get pending request in a comapny
export const listPendingExpenseRequests = async(companyId:string)=>{
    try{
        const res = await fetch(`${BACKEND_ENDPOINT}/search?companyId=${companyId}&approvalStatus=pending`,{
            method:"GET"
        })

        const data = await res.json()

        return data
    }catch(err){
        console.log(err)
    }
}

//get all request for a user
export const listEmpExpenseRequests = async(userId:string)=>{
    try{
        const res = await fetch(`${BACKEND_ENDPOINT}/search?userId=${userId}`,{
            method:"GET"
        })

        const data = await res.json()

        return data
    }catch(err){
        console.log(err)
    }
}