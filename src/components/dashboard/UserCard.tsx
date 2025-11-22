'use client'

import Image from "next/image"
import defaultImg from '../../../public/default/default-user-img.jpg'
import { useContext } from "react"
import { UserContext } from "@/src/context/UserContext"

const UserCard = () => {
    const userInfo = useContext(UserContext)

    const username = userInfo?.user?.name

  return (
    <div className="box-shadow h-fit mt-6 md:mt-0 rounded-2xl">
        <div className="flex gap-10 p-4">
            <Image
           src={defaultImg}
           width={70}
           height={70}
           alt="Default Account Image"
           className='rounded-[50%]'/>

           <div className="nonito-font pe-4 flex flex-col justify-center gap-[0.5rem]">
            <div className="text-[#404040] font-bold text-[14px]">{username}</div>
            <div className="text-[#565656] font-medium text-[12px]">Employee</div>
           </div>
        </div>

    </div>
  )
}

export default UserCard