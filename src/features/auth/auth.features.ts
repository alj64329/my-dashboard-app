import { account, tableDB } from "@/src/lib/appwrite"
import { User } from "@/src/types/index.types"
import { AppwriteException, ID, Query } from "appwrite"
import { nanoid } from "nanoid"

const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string
const COMPANY_TABLE_ID = process.env.NEXT_PUBLIC_APPWRITE_COMPANY_TABLE_ID as string
const USER_TABLE_ID = process.env.NEXT_PUBLIC_APPWRITE_USER_TABLE_ID as string

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

//send one time password to email address
export const sendOTP = async(email:string)=>{
    try{
        const sessionToken = await account.createEmailToken({
            userId:ID.unique(),
            email:email
        })
        console.log(sessionToken)
        return sessionToken
    }catch(err){
        console.log(err)
    }
}

//verify the one time password
export const otpVerification= async(userId:string, secret:string)=>{
    try{
        const session = await account.createSession({
            userId:userId,
            secret:secret
        })

        if(!session) return false
        console.log(session)
        return true
    }catch(err){
        console.log(err)
    }
}

//create comapny row in table
export const registerCompany = async (companyName:string, adminEmail:string, adminAppwriteId:string)=>{
    try{
        const code = nanoid(10)
        const company = await tableDB.createRow({
            databaseId: DATABASE_ID,
            tableId: COMPANY_TABLE_ID,
            rowId:ID.unique(),
            data:{
                company_name:companyName,
                company_code: code,
                adminEmail:adminEmail,
                adminAppwriteId:adminAppwriteId
            }
        })

        console.log("Company is successfully registered")
        return company
    }catch(err){
        console.log(err)
    }
}

//update auth password
export const updateAccount = async (password:string)=>{
    try{
         const updates = await account.updatePassword({
            password
        })
        console.log("Password successfully updated")
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

//add user row in user table
export const registerUser = async ({name, email, companyId, role, appwriteId}:Omit<User, 'userId'>)=>{
    try{
        const res = await tableDB.createRow({
            databaseId: DATABASE_ID,
            tableId: USER_TABLE_ID,
            rowId:ID.unique(),
            data:{
                name,
                email,
                companyId,
                role,
                appwriteId
            }
        })
        console.log("User is successfully registered")
        return res
    }catch(err){
        console.log(err)
    }
}

export const findCompany = async(companyCode:string)=>{
    try{
        const company = await tableDB.listRows({
            databaseId: DATABASE_ID,
            tableId: COMPANY_TABLE_ID,
            queries:[
                Query.equal("company_code",companyCode)
            ]
        })
       if(company.rows.length===0){
        return false
       }
       return company.rows
    }catch(err){
        console.log(err)
    }
}

export const logout = async()=>{
    try{
        await account.deleteSession({
            sessionId:'current'
        })
    }catch(err){
        if(err instanceof AppwriteException){
            if(err.code === 401){
                console.log("none has been logged in")
            }
        }
    }
}