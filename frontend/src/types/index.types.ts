import { ApprovalStatus, LeaveType } from "./service.types"

export type OtpProps={
    data: AdminData|EmployeeData|undefined,
    route:string
}

export type AdminData={
    role:Role.admin,
    company_name:string,
    name:string,
    email:string
}

export type EmployeeData ={
    role:Role.employee,
    name:string,
    email:string,
    companyId:string,
}

export interface Company{
    _Id: string,
    company_name:string,
    company_code:string,
}
export enum Role{
    admin="admin",
    manager = "manager",
    employee = "employee"
}

export interface User{
    _id:string,
    name:string,
    email:string,
    companyId:string,
    role: Role
    position:string,
    password:string,
    profilePic:string
}

export enum Status{
    planned,
    active,
    completed
}

export interface Project{
    _id: string,
    companyId: string,
    status:string
}

export interface Team{
    _id:string,
    userId:string,
    projectId:string,
    startDate:Date,
    endDate:Date,
    state:string
}

export interface LeaveReq{
    _id: string,
    userId: string,
    companyId:string,
    fromDate: Date,
    toDate:Date,
    leaveType: LeaveType,
    approvalStatus:ApprovalStatus
}

//appwrite expense_request
export interface ExpenseReq{
    _id:string,
    userId:string,
    companyId:string,
    title:string,
    amount:number,
    category:string,
    desc:string,
    receipt:string,
    approvalStatus: ApprovalStatus
}