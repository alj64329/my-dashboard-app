'use client'

import { useRouter } from "next/navigation"
import { useEffect, useRef } from "react"
import { account } from "../lib/appwrite"


const AutoLogout = () => {
    const router = useRouter()
    const timeRef = useRef<NodeJS.Timeout|null>(null)

    const resetTimer = ()=>{
        if(timeRef.current) clearTimeout(timeRef.current)
        
            timeRef.current = setTimeout(async()=>{
                try{
                    await account.deleteSession({
                        sessionId:'current'
                    })
                    router.push("/")
                }catch(err){
                    console.log("Logout failed", err)
                }
            }, 60*60*1000)
    }

    useEffect(()=>{
        resetTimer()

        const events =["mousemove","keypress","click","scroll"]
        events.forEach((event)=>window.addEventListener(event, resetTimer))

        return()=> events.forEach((event)=> window.removeEventListener(event, resetTimer))
    },[])

  return (
    null
  )
}

export default AutoLogout