import { adminMenu, empMenu } from '@/src/constants/menuList.constant';
import { NavUlType, ScreenType } from '@/src/types/dashboard.types'
import { Role } from '@/src/types/index.types'
import { useRouter } from 'next/navigation';

import React, { useEffect, useState } from 'react'

type Props = {
    role:Role
    type:ScreenType
    onMobileMenuClose?:()=> void
}

const Nav = ({role, type, onMobileMenuClose}: Props) => {
    const [menu, setMenu] = useState<NavUlType[]>([])

    const router = useRouter()

    useEffect(()=>{
        if(role === Role.admin){
            setMenu(adminMenu)
        }else{
            setMenu(empMenu)
        }
    }, [role])


    const linkClickHandler =(m:NavUlType)=>{
        router.push(m.route)

        if(onMobileMenuClose){
            onMobileMenuClose()
        }
    }

  return (
        <ul className={`flex flex-col gap-10 ${type==="desktop"?'text-white':'text-[17px]'}`}>
            {
                menu.length>0&&menu.map((m,i)=>(
                    <li className={`flex items-center gap-4 cursor-pointer ${type!=="desktop"&&'justify-center'}`} key={i}>
                        <m.icon/>
                        <div
                        onClick={()=>linkClickHandler(m)}>
                            {m.page}
                        </div>
                    </li>
                ))
            }

        </ul>
  )
}

export default Nav