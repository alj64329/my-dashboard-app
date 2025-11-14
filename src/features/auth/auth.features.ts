import { account, tableDB } from "@/src/lib/appwrite"
import { ID, Query } from "appwrite"
import { nanoid } from "nanoid"

const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string
const COMPANY_TABLE_ID = process.env.NEXT_PUBLIC_APPWRITE_COMPANY_TABLE_ID as string

//Check if the company exist in table or not
export const companyExist = async (comapnyName:string, adminEmail:string)=>{
    try{
        const res = await tableDB.listRows({
            databaseId: DATABASE_ID,
            tableId: COMPANY_TABLE_ID,
            queries:[
                Query.equal("company_name",comapnyName)
            ]
        })
       if(res.rows.length===0){
        return false
       }
       return true
    }catch(err){
        console.log(err)
    }
}

//create comapny row in table
export const registerCompany = async (companyName:string, adminEmail:string)=>{
    try{
        const code = nanoid(10)
        const res = await tableDB.createRow({
            databaseId: DATABASE_ID,
            tableId: COMPANY_TABLE_ID,
            rowId:ID.unique(),
            data:{
                company_name:companyName,
                company_code: code,
                adminEmail:adminEmail
            }
        })

        console.log("Company is successfully registered")
        return res
    }catch(err){
        console.log(err)
    }
}

//create auth
export const createAccount = async (name:string, email:string,password:string)=>{
    try{
         const res = await account.create({
            userId:ID.unique(),
            name:name,
            email,
            password
        })
        return true
    }catch(err){
        console.log(err)
        return false
    }
}

export const login= async(email:string, password:string)=>{
    try{
        await account.createEmailPasswordSession({
            email,
            password
        })
        const loggedInUser = await account.get()
        if(!loggedInUser) return false
        return loggedInUser

    }catch(err){
        console.log(err)
        return false
    }
}

//create user row in user table
export const registerUser = async (companyName:string, adminEmail:string)=>{
    try{
        const code = nanoid(10)
        const res = await tableDB.createRow({
            databaseId: DATABASE_ID,
            tableId: COMPANY_TABLE_ID,
            rowId:ID.unique(),
            data:{
                company_name:companyName,
                comapny_code: code,
                adminEmail:adminEmail
            }
        })

        if(!res.ok){
            console.log("somethig went wrong")
            return false
        }
        console.log("Company is successfully registered")
        return true
    }catch(err){
        console.log(err)
    }
}