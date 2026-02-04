"use client"
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
} from "@/components/ui/item"

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
      className="px-3 py-8">
        <SidebarHeader>
          <div
          className="text-center text-lg font-semibold">
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
        <ItemGroup className="max-w-sm">
            <Item variant="outline"
            className="p-2">
              <ItemMedia>
                <Avatar>
                  <AvatarImage src={defaultUser.url} />
                  <AvatarFallback>{("username").charAt(0)}</AvatarFallback>
                </Avatar>
              </ItemMedia>
              <ItemContent className="gap-1">
                <ItemTitle>username</ItemTitle>
                <ItemDescription></ItemDescription>
              </ItemContent>
              <ItemActions>
                <Button variant="ghost" size="icon" 
                className="rounded-full"
                onClick={handleLogout}>
                  <TbLogout />
                </Button>
              </ItemActions>
            </Item>
        </ItemGroup>
        </SidebarFooter>
      </Sidebar>
  )
}