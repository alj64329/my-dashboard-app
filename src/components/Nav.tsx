import { adminMenu, empMenu } from '@/src/constants/menuList.constant';
import { NavUlType, ScreenType } from '@/src/types/dashboard.types'
import { Role } from '@/src/types/index.types'
import React, { useEffect, useState } from 'react'

type Props = {
    role:Role
    type:ScreenType
}

const Nav = ({role, type}: Props) => {
    const [menu, setMenu] = useState<NavUlType[]>([])

    useEffect(()=>{
        if(role === Role.admin){
            setMenu(adminMenu)
        }else{
            setMenu(empMenu)
        }
    }, [role])

  return (
        <ul className={`flex flex-col gap-10 ${type==="desktop"&&'text-white'}`}>
            {
                menu.length>0&&menu.map((m,i)=>(
                    <li className='flex items-center gap-4 cursor-pointer' key={i}>
                        <m.icon/>
                        <div>{m.page}</div>
                    </li>
                ))
            }

        </ul>
  )
}

export default Nav