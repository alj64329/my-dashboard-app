'use client'
import { CldImage } from 'next-cloudinary'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { defaultUser } from '@/src/constants/default.constants'
import { ProfileSheetProps } from '@/src/types/dashboard.types'
import { useContext } from 'react'
import { UserContext } from '@/src/context/UserContext'

const DashboardHead = ({setProfileOpen}:ProfileSheetProps) => {
  const userInfo= useContext(UserContext)
  const userPic= userInfo?.user?.profilePic
  return (
    <div className='flex justify-between items-center'>
      <div className='flex gap-6 items-center'>
        <FontAwesomeIcon 
        icon ={faBars} />
        <div
        className='text-xl'>
            Dashboard</div>
      </div>
      <div>
        <CldImage
        width={40}
        height={40}
        src={`${userPic?userPic:defaultUser.profilePic}`}
        alt={defaultUser.alt}
        className="rounded-[50%] cursor-pointer"
        onClick={()=>setProfileOpen(true)}/>
      </div>
    </div>
  )
}

export default DashboardHead