'use client'
import { logout } from '@/src/features/auth/auth.features'
import { useContext } from 'react'
import { UserContext } from '@/src/context/UserContext'
import { useRouter } from 'next/navigation'
import { Models } from 'appwrite'
import { Role } from '@/src/types/index.types'
import { ScreenType } from '@/src/types/dashboard.types'
import Nav from '../Nav'

type Props={
  onClose:()=>void
}

const MobileMenu = ({onClose}:Props) => {
  const userInfo= useContext(UserContext)
  if(!userInfo) return
  const setLoggedInUser = userInfo.handleSetLoggedInUser 
  const router = useRouter()
  const companyName = userInfo?.loggedInUser?.companyId.company_name
  const role = userInfo?.loggedInUser?.role

    const useLogout = async()=>{
    //log out from Appwrite
      await logout()

      //clear cookies
      await fetch('/api/auth/logout',{method:"POST"})

      setLoggedInUser(null)
      router.push("/")
  }

  return (
    <div className='absolute top-[10%] left-0 bg-white w-full md:hidden h-srceen z-10'>
        <div className="flex flex-col justify-center">
            <div className="flex flex-col justify-center items-center p-8 border-b border-[#BDBDBD]">
                <div className='w-[60px] h-[60px] bg-amber-300 rounded-[50%]'></div>
                <div
                className="pt-6 text-[14px]">{companyName}</div>
            </div>

            <div className="w-full px-8 pt-15 pb-8 flex flex-col md:min-h-[73vh] justify-between">
              {role === Role.admin&&<Nav role={Role.admin} type ={ScreenType.mobile} onMobileMenuClose={onClose}/>}
              {role === Role.employee&&<Nav role={Role.admin} type ={ScreenType.mobile} onMobileMenuClose={onClose}/>}
            </div>

            <div className='flex justify-center'>
                <button 
                className="bg-second-green py-3 px-12 rounded-2xl text-white font-karla font-bold cursor-pointer"
                onClick={useLogout}>
                  Log out</button>
              </div>
        </div>

    </div>
  )
}

export default MobileMenu