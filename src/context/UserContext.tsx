"use client"
import { createContext, ReactNode, useEffect, useState } from "react";
import { account } from "../lib/appwrite";
import { UserContentType } from "../types/usercontent.types";
import { Models } from "appwrite";

export const UserContext = createContext<UserContentType |null>(null)

export const UserProvider =({children}:{children:ReactNode})=>{
    const [loggedInUser, setLoggedInUser] = useState<Models.User<any>|null>(null)

    useEffect(()=>{
        const getSession = async()=>{
            try{
                const userSession = await account.getSession({sessionId:'current'}).catch(()=>null)
                const user = await account.get().catch(()=>null) 

                if(userSession && user){
                    console.log("user is signed in")
                    setLoggedInUser(user)
                }else{
                    console.log("No active user")
                }
            }catch(err){
                console.log(err)
            }
        }
        getSession()
    }, [])

    const value = { loggedInUser, setLoggedInUser}

    return(
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}

