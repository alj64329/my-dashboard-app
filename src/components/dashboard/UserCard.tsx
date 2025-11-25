'use client'
import {CldImage} from 'next-cloudinary'
import { useContext } from "react"
import { UserContext } from "@/src/context/UserContext"
import { defaultUser } from '@/src/constants/default.constants'

const UserCard = () => {
    const userInfo = useContext(UserContext)

    const username = userInfo?.user?.name
    const userPic = userInfo?.user?.profilePic

  return (
    <div className="box-shadow h-fit mt-6 md:mt-0 rounded-2xl hidden md:block">
        <div className="py-4 px-6">
          <div className="flex justify-between min-w-[200px]">
        <CldImage
        width={70}
        height={70}
        src={userPic?userPic:defaultUser.profilePic}
        alt={defaultUser.alt}
        className="rounded-[50%]"/>

            <div className="nonito-font pe-4 flex flex-col justify-center gap-[0.5rem]">
              <div className="text-[#404040] font-bold text-[14px]">{username}</div>
              <div className="text-[#565656] font-medium text-[12px]">Employee</div>
            </div>
          </div>
        </div>

    </div>
  )
}

export default UserCard