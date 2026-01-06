import { ID, tableDB } from "@/src/lib/appwrite"
import { LeaveReq } from "@/src/types/appwriteDb.types"
import { Query } from "appwrite"

const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string
const LEAVEREQUEST_TABLE_ID = process.env.NEXT_PUBLIC_APPWRITE_LEAVEREQUEST_TABLE_ID as string

//create row
export const createLeaveRequest = async(data:Omit<LeaveReq,'rowId'>)=>{
        try{
            const leaveRequest = await tableDB.createRow({
                databaseId: DATABASE_ID,
                tableId: LEAVEREQUEST_TABLE_ID,
                rowId:ID.unique(),
                data:{
                    userId:data.userId,
                    companyId:data.companyId,
                    startDate:data.startDate,
                    endDate:data.endDate,
                    leaveType:data.leaveType,
                    approvalStatus:data.approvalStatus
                }
            })
    
            console.log("Leave request has been created")
            return leaveRequest
        }catch(err){
            console.log(err)
        }
}

//modify the request
export const modifyRequest = async (data:LeaveReq)=>{
    try{
        const leaveRequest = await tableDB.updateRow({
            databaseId: DATABASE_ID,
            tableId: LEAVEREQUEST_TABLE_ID,
            rowId:data.rowId,
            data:{
                userId:data.userId,
                companyId:data.companyId,
                startDate:data.startDate,
                endDate:data.endDate,
                leaveType:data.leaveType,
                approvalStatus:data.approvalStatus
            }
        })

        return leaveRequest
    }catch(err){
        console.log(err)
    }
}

//get all requests for a company
export const listLeaveRequests = async(companyId:string)=>{
    try{
        //get all leaveRequests
        const leaveRequestsRes = await tableDB.listRows({
            databaseId:DATABASE_ID,
            tableId:LEAVEREQUEST_TABLE_ID,
            queries:[
                Query.equal('companyId', companyId)
            ]
        })

        const leaveRequests = leaveRequestsRes.rows


        return leaveRequests
    }catch(err){
        console.log(err)
    }
}

//get pending request in a comapny
export const listPendingLeaveRequests = async(companyId:string)=>{
    try{
        const leaveRequests = await tableDB.listRows({
            databaseId:DATABASE_ID,
            tableId:LEAVEREQUEST_TABLE_ID,
            queries:[
                Query.equal('companyId', companyId),
                Query.equal('approvalStatus', 'pending')
            ]
        })


        return leaveRequests

    }catch(err){
        console.log(err)
    }
}

//get all request for a user
export const listEmpLeaveRequests = async(userId:string)=>{
    try{
        const leaveRequests = await tableDB.listRows({
            databaseId:DATABASE_ID,
            tableId:LEAVEREQUEST_TABLE_ID,
            queries:[
                Query.equal('userId', userId),
            ]
        })

        return leaveRequests

    }catch(err){
        console.log(err)
    }
}