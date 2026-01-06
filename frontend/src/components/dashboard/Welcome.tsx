'use client'

import { UserContext } from "@/src/context/UserContext"
import { Role } from "@/src/types/index.types"
import { useContext } from "react"

const Welcome = () => {
    const userInfo = useContext(UserContext)
    const company = userInfo?.company?.company_name
    const role = userInfo?.user?.role

    const username = userInfo?.user?.name
  return (
    <div className="text-grey-400 text-xl md:text-3xl">
        Welcome to your dashboard
        {role ===Role.admin ?`, ${company}`:`, ${username}`}
    </div>
  )
}

export default Welcome