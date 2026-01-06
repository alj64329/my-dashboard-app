import { Query } from "appwrite"
import { tableDB } from "../lib/appwrite"
import { APTUser } from "../types/appwriteDb.types"

const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string
const EMPLOYEE_TABLE_ID = process.env.NEXT_PUBLIC_APPWRITE_EMPLOYEE_TABLE_ID as string

//update users
export const modifyUsers = async (data:APTUser)=>{
    try{
        const user = await tableDB.updateRow({
            databaseId: DATABASE_ID,
            tableId: EMPLOYEE_TABLE_ID,
            rowId:data.rowId,
            data:{
                name:data.name,
                email:data.email,
                companyId:data.companyId,
                role:data.role,
                appwriteId:data.appwriteId,
                position:data.position,
                profilePic:data.profilePic
            }
        })

        return user
    }catch(err){
        console.log(err)
    }
}

//delete users
export const deleteEmployee = async (userId:string)=>{
    try{
        const deletedUser = await tableDB.deleteRow({
            databaseId: DATABASE_ID,
            tableId: EMPLOYEE_TABLE_ID,
            rowId:userId,
        })

        console.log(`${deletedUser} has been deleted form comapny`)
        return deleteEmployee
    }catch(err){
        console.log(err)
    }
}

//list users by company Id
export const listUsersByCompany = async(companyId:string)=>{
    try{
        const users = tableDB.listRows({
            databaseId:DATABASE_ID,
            tableId:EMPLOYEE_TABLE_ID,
            queries:[
                Query.equal('companyId', companyId)
            ]
        })

        return users
    }catch(err){
        console.log(err)
    }
}
