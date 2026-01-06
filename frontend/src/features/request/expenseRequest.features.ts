import { ID, tableDB } from "@/src/lib/appwrite"
import { ExpenseReq } from "@/src/types/appwriteDb.types"
import { Query } from "appwrite"

const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string
const EXPENSEREQUEST_TABLE_ID = process.env.NEXT_PUBLIC_APPWRITE_EXPENSEREQUEST_TABLE_ID as string

//create row
export const createExpenseRequest = async(data:Omit<ExpenseReq,'rowId'>)=>{
        try{
            const expenseRequest = await tableDB.createRow({
                databaseId: DATABASE_ID,
                tableId: EXPENSEREQUEST_TABLE_ID,
                rowId:ID.unique(),
                data:{
                    userId:data.userId,
                    companyId:data.companyId,
                    title:data.title,
                    category:data.category,
                    amount:data.amount,
                    desc:data.desc,
                    receipt:data.receipt,
                    approvalStatus:data.approvalStatus
                }
            })
    
            console.log("Expense request has been created")
            return expenseRequest
        }catch(err){
            console.log(err)
        }
}

//modify the request
export const modifyRequest = async (data:ExpenseReq)=>{
    try{
        const expenseRequest = await tableDB.updateRow({
            databaseId: DATABASE_ID,
            tableId: EXPENSEREQUEST_TABLE_ID,
            rowId:data.rowId,
            data:{
                userId:data.userId,
                companyId:data.companyId,
                title:data.title,
                category:data.category,
                amount:data.amount,
                desc:data.desc,
                receipt:data.receipt,
                approvalStatus:data.approvalStatus
            }
        })

        return expenseRequest
    }catch(err){
        console.log(err)
    }
}

//get all requests for a company
export const listExpenseRequests = async(companyId:string)=>{
    try{
        const expenseRequests = tableDB.listRows({
            databaseId:DATABASE_ID,
            tableId:EXPENSEREQUEST_TABLE_ID,
            queries:[
                Query.equal('companyId', companyId)
            ]
        })

        return expenseRequests
    }catch(err){
        console.log(err)
    }
}

//get pending request in a comapny
export const listPendingExpenseRequests = async(companyId:string)=>{
    try{
        const expenseRequests = tableDB.listRows({
            databaseId:DATABASE_ID,
            tableId:EXPENSEREQUEST_TABLE_ID,
            queries:[
                Query.equal('companyId', companyId),
                Query.equal('approvalStatus', 'pending')
            ]
        })

        return expenseRequests

    }catch(err){
        console.log(err)
    }
}

//get all request for a user
export const listEmpExpenseRequests = async(userId:string)=>{
    try{
        const expenseRequests = tableDB.listRows({
            databaseId:DATABASE_ID,
            tableId:EXPENSEREQUEST_TABLE_ID,
            queries:[
                Query.equal('userId', userId),
            ]
        })

        return expenseRequests

    }catch(err){
        console.log(err)
    }
}