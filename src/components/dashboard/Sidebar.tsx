'use client'
import { logout } from '@/src/features/auth/auth.features'
import { useContext } from 'react'
import { UserContext } from '@/src/context/UserContext'
import AdminNav from './AdminNav'
import { useRouter } from 'next/router'
const Sidebar = () => {
  const userInfo= useContext(UserContext)
  
  const companyName = userInfo?.company?.company_name
  const role = userInfo?.user?.role

  const useLogout = ()=>{
    const router = useRouter()

    const handleLogout = async()=>{
      await logout()
      router.push("/")
    }

    return handleLogout
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
              <AdminNav/>

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