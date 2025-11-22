'use client'

import { UserContext } from "@/src/context/UserContext"
import { useContext } from "react"

const Welcome = () => {
    const userInfo = useContext(UserContext)

    const username = userInfo?.user?.name
  return (
    <div className="text-grey-400 text-xl md:text-3xl">
        Welcome to your dashboard
        {username&&`, ${username}`}
    </div>
  )
}

export default Welcome