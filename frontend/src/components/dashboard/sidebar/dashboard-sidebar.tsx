import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton
} from "@/components/ui/sidebar"
import { CldImage } from 'next-cloudinary';
import { TbLogout } from "react-icons/tb";
import { CiSettings } from "react-icons/ci";

import { adminMenu, empMenu } from "@/src/constants/menuList.constant"
import { NavUlType } from "@/src/types/dashboard.types"
import { Role } from "@/src/types/index.types"
import Link from "next/link"
import { useEffect, useState } from "react"
import { defaultUser } from "@/src/constants/default.constants";

type Props={
  companyName:string,
  role:Role
}

export function DashBoardSidebar({companyName, role}:Props) {
  const [menu, setMenu] = useState<NavUlType[]>([])
  role = Role.admin
  companyName="ABC Company"

  useEffect(()=>{
    if(role === Role.admin){
      setMenu(adminMenu)
    }else{
      setMenu(empMenu)
    }

  },[role])

  const handleLogout=()=>{

  }

  return (
      <Sidebar
      className="px-4 py-8">
        <SidebarHeader>
          <div
          className="text-center">
            {companyName}
          </div>
        </SidebarHeader>
        <SidebarContent
        className="py-6">
          <SidebarGroup>
            <SidebarGroupLabel>Dashboard Menu</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {menu.map((item, index) => (
                    <SidebarMenuItem 
                    key={index}>
                      <SidebarMenuButton asChild>
                        <Link href={item.route}>

                          <item.icon />
                          <span>{item.page}</span>

                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

        </SidebarContent>

        <div
        className="text-md px-6 pb-6">
          <div className="flex items-center gap-5">
            <CiSettings/>
            <span>Setting</span>
          </div>
        </div>

        <SidebarFooter>
          <div
          className="flex items-center justify-between">
            <CldImage
            src={defaultUser.profilePic}
            alt={defaultUser.alt}
            width={30}
            height={30}
            className="rounded-xl"
            />
            <div>
              Username
            </div>

            <div
            onClick={handleLogout}
            className="cursor-pointer">
              <TbLogout
              className="text-lg"/>
            </div>
          </div>
        </SidebarFooter>
      </Sidebar>
  )
}