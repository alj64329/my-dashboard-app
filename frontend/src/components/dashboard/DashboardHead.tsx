'use client'
import { CldImage } from 'next-cloudinary'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons'
import { defaultUser } from '@/src/constants/default.constants'
import { ProfileSheetProps } from '@/src/types/dashboard.types'
import { useContext, useState } from 'react'
import { UserContext } from '@/src/context/UserContext'
import MobileMenu from './MobileMenu'

const DashboardHead = ({setProfileOpen}:ProfileSheetProps) => {
  const userInfo= useContext(UserContext)
  const userPic= userInfo?.loggedInUser?.profilePic
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const menuOnClose =()=>{
    setMobileMenuOpen(false)
  }
  return (
    <div className='flex justify-between items-center'>
      <div className='flex gap-6 items-center'>
        <div
        className='md:hidden'>
        {!mobileMenuOpen&&
        <FontAwesomeIcon 
        icon ={faBars}
        onClick={()=>setMobileMenuOpen(true)} />}
        {mobileMenuOpen&&
        <FontAwesomeIcon
        icon={faXmark}
        onClick={()=>setMobileMenuOpen(false)}/>}
        </div>
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
      {mobileMenuOpen&& <MobileMenu onClose={menuOnClose}/>}
    </div>
  )
}

export default DashboardHead