'use client'
import { logout } from '@/src/features/auth/auth.features'
import { useContext } from 'react'
import { UserContext } from '@/src/context/UserContext'
import AdminNav from './AdminNav'
import { useRouter } from 'next/navigation'
import { Models } from 'appwrite'
import { Role } from '@/src/types/index.types'
import EmployeeNav from './EmployeeNav'
import { ScreenType } from '@/src/types/dashboard.types'

const MobileMenu = () => {
  const userInfo= useContext(UserContext)
  if(!userInfo) return
  const setLoggedInUser = userInfo.setLoggedInUser as React.Dispatch<React.SetStateAction<Models.User<any> | null>>
  const router = useRouter()
  const companyName = userInfo?.company?.company_name
  const role = userInfo?.user?.role

  return (
    <div className='absolute top-[10%] left-0 bg-white w-full md:hidden'>
        <div className="flex flex-col justify-center">
            <div className="flex flex-col justify-center items-center p-8 border-b border-[#BDBDBD]">
                <div className='w-[60px] h-[60px] bg-amber-300 rounded-[50%]'></div>
                <div
                className="pt-6 text-[14px]">{companyName}</div>
            </div>

            <div className="w-full px-8 pt-15 pb-8 flex flex-col min-h-[73vh] justify-between">
              {role === Role.admin&&<AdminNav type={ScreenType.mobile}/>}
              {role === Role.employee&&<EmployeeNav type={ScreenType.mobile}/>}

            </div>
        </div>

    </div>
  )
}

export default MobileMenu