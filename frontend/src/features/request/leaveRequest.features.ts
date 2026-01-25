import { LeaveReq } from "@/src/types/index.types"

const BACKEND_ENDPOINT = `${process.env.NEXT_PUBLIC_BACKEND_ENDOPOINT}/leave-requests`

//create row
export const createLeaveRequest = async(request:Partial<LeaveReq>)=>{
        try{
            const res = await fetch(`${BACKEND_ENDPOINT}`,{
                method:"POST",
                headers:{
                    "Content-type" :"application/json",
                },
                body:JSON.stringify({
                    request
                }),
            })

            const data = await res.json()
    
            console.log("Leave request has been created")
            return data
        }catch(err){
            console.log(err)
        }
}

//modify the request
export const modifyRequest = async (requestId:string,update:LeaveReq)=>{
    try{
        const res = await fetch(`${BACKEND_ENDPOINT}/${requestId}`,{
            method:"PUT",
            headers:{
                "Content-type" :"application/json",
            },
            body:JSON.stringify({
                update
            }),
        })

        const data = await res.json()

        return data
    }catch(err){
        console.log(err)
    }
}

//get all requests for a company
export const listLeaveRequests = async(companyId:string)=>{
    try{
        //get all leaveRequests
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
export const listPendingLeaveRequests = async(companyId:string)=>{
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
export const listEmpLeaveRequests = async(userId:string)=>{
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