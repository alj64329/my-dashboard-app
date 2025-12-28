"use client"
import { createContext, ReactNode, useEffect, useState } from "react";
import { account } from "../lib/appwrite";
import { CompanyRow, UserContentType, UserRow } from "../types/usercontent.types";
import { Models } from "appwrite";
import { getCompany, getUser } from "../utils/dashboad";
import { Page } from "../types/dashboard.types";

export const UserContext = createContext<UserContentType |null>(null)

export const UserProvider =({children}:{children:ReactNode})=>{
    const [loggedInUser, setLoggedInUser] = useState<Models.User<any>|null>(null)
    const [user, setUser] = useState<UserRow|null>(null)
    const [company, setCompany] = useState<CompanyRow|null>(null)
    const [page, setPage] = useState<Page>("Dashboard")

    useEffect(()=>{
        const getSession = async()=>{
            try{
                const userSession = await account.getSession({sessionId:'current'}).catch(()=>null)
                const loginUser = await account.get().catch(()=>null) 

                if(userSession && loginUser){
                    console.log("user is signed in")
                    setLoggedInUser(loginUser)

                    const userRow = await getUser(loginUser.$id)

                    if(!userRow) return
                    const userOne = userRow[0] as UserRow
                    setUser(userOne)

                    const comp = await getCompany(userOne.companyId) as CompanyRow
                    setCompany(comp)
                }else{
                    console.log("No active user")
                }
            }catch(err){
                console.log(err)
            }
        }
        getSession()
    }, [])

    const value = { loggedInUser, setLoggedInUser, user, setUser, company, setCompany , page, setPage}

    return(
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}

