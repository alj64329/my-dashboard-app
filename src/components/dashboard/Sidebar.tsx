'use client'
import { logout } from '@/src/features/auth/auth.features'
import { useContext } from 'react'
import { UserContext } from '@/src/context/UserContext'
import AdminNav from './AdminNav'
import { useRouter } from 'next/navigation'
import { Models } from 'appwrite'
import { Role } from '@/src/types/index.types'
import EmployeeNav from './EmployeeNav'

const Sidebar = () => {
  const userInfo= useContext(UserContext)
  if(!userInfo) return
  const setLoggedInUser = userInfo.setLoggedInUser as React.Dispatch<React.SetStateAction<Models.User<any> | null>>
  const router = useRouter()
  const companyName = userInfo?.company?.company_name
  const role = userInfo?.user?.role
  
  const useLogout = async()=>{
      await logout()
      setLoggedInUser(null)
      router.push("/")
  }


  return (
    <aside className='sidebar bg-main-green h-[100vh] w-[65%] min-w-[250px] sm:w-[20%] max-w-[280px]'>
        <div className="flex flex-col justify-center">
            <div className="flex flex-col justify-center items-center p-8 border-b border-[#BDBDBD]">
                <div className='w-[60px] h-[60px] bg-amber-300 rounded-[50%]'></div>
                <div
                className="pt-6 text-white text-[14px]">{companyName}</div>
            </div>

            <div className="w-full px-8 pt-15 pb-8 flex flex-col min-h-[73vh] justify-between">
              {role === Role.admin&&<AdminNav/>}
              {role === Role.employee&&<EmployeeNav/>}

              <div className='flex justify-center'>
                <button 
                className="bg-second-green py-3 px-12 rounded-2xl text-white font-karla font-bold cursor-pointer"
                onClick={useLogout}>
                  Log out</button>
              </div>
            </div>
        </div>

    </aside>
  )
}

export default Sidebar