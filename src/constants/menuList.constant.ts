import { CiCalendar, CiDesktop, CiSettings } from "react-icons/ci";
import { NavUlType } from "../types/dashboard.types";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { LiaFileInvoiceDollarSolid } from "react-icons/lia";
import { VscProject } from "react-icons/vsc";
import { GoTasklist } from "react-icons/go";

export const adminMenu:NavUlType[] = [
    {page:"Dashboard", icon:CiDesktop},
    // {page:"Calender", icon:CiCalendar},
    {page:"Employees", icon:HiOutlineUserGroup },
    {page:"Projects", icon:VscProject},
    {page:"Expense History", icon:LiaFileInvoiceDollarSolid},
    {page:"Leave History",icon:CiCalendar},
    {page:"Setting",icon:CiSettings}
]

export const empMenu:NavUlType[]=[
    {page:"Dashboard", icon:CiDesktop},
    {page:"Tasks",icon:GoTasklist},
    {page:"Projects",icon:VscProject},
    {page:"Expense History", icon:LiaFileInvoiceDollarSolid},
    {page:"Leave History",icon:CiCalendar},
    {page:"Setting", icon:CiSettings}
]