import { CiCalendar, CiDesktop, CiSettings } from "react-icons/ci";
import { NavUlType } from "../types/dashboard.types";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { LiaFileInvoiceDollarSolid } from "react-icons/lia";
import { VscProject } from "react-icons/vsc";
import { GoTasklist } from "react-icons/go";

export const adminMenu:NavUlType[] = [
    {page:"Dashboard", icon:CiDesktop, route:"/admin"},
    // {page:"Calender", icon:CiCalendar},
    {page:"Employees", icon:HiOutlineUserGroup, route:"/admin/employees" },
    {page:"Projects", icon:VscProject, route:"/admin/projects"},
    {page:"Expense History", icon:LiaFileInvoiceDollarSolid, route:"/admin/expense_history"},
    {page:"Leave History",icon:CiCalendar, route:"/admin/leave_history"},
    {page:"Setting",icon:CiSettings,route:"/admin/setting"}
]

export const empMenu:NavUlType[]=[
    {page:"Dashboard", icon:CiDesktop, route:"/employee"},
    {page:"Tasks",icon:GoTasklist, route:"/employee/tasks"},
    {page:"Projects",icon:VscProject, route:"/employee/projects"},
    {page:"Expense History", icon:LiaFileInvoiceDollarSolid, route:"/employee/expense_history"},
    {page:"Leave History",icon:CiCalendar, route:"/employee/leave_history"},
    {page:"Setting", icon:CiSettings, route:"/employee/setting"}
]