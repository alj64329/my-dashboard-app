import { Query } from "appwrite"
import { tableDB } from "../lib/appwrite"

const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string
const COMPANY_TABLE_ID = process.env.NEXT_PUBLIC_APPWRITE_COMPANY_TABLE_ID as string
const USER_TABLE_ID = process.env.NEXT_PUBLIC_APPWRITE_USER_TABLE_ID as string


//get user data
export const getUser = async(userId:string)=>{
    try{
        const user = await tableDB.listRows({
            databaseId:DATABASE_ID,
            tableId:USER_TABLE_ID,
            queries:[
                Query.equal("appwriteId",userId)
            ]
        })

        return user.rows
    }catch(err){
        console.log(err)
    }
}

//get company data
export const getCompany = async(companyId:string)=>{
    try{
        const company = await tableDB.getRow({
            databaseId:DATABASE_ID,
            tableId:COMPANY_TABLE_ID,
            rowId:companyId
        })
        return company.rows
    }catch(err){
        console.log(err)
    }
}