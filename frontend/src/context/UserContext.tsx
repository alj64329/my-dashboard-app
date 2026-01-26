"use client"
import { createContext, ReactNode, useEffect, useState } from "react";
import { LoggedInUser, UserContentType } from "../types/usercontent.types";
import { Page } from "../types/dashboard.types";
// import { cookies } from "next/headers";

export const UserContext = createContext<UserContentType |null>(null)

export const UserProvider =({children}:{children:ReactNode})=>{
    const [loggedInUser, setLoggedInUser] = useState<LoggedInUser|null>(null)
    const [page, setPage] = useState<Page>("Dashboard")

    const handleSetLoggedInUser = (user:LoggedInUser|null)=>{
        setLoggedInUser(user)
    }

    const handleSetPage =(newpage:Page)=>{
        setPage(newpage)
    }

    useEffect(()=>{
        const getSession = async()=>{
            try{

            }catch(err){
                console.log(err)
            }
        }
        getSession()
    }, [])

    const value = { loggedInUser,handleSetLoggedInUser , page, handleSetPage}

    return(
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}

