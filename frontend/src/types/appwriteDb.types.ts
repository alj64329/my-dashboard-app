import { Role, User } from "./index.types"
import { ApprovalStatus, LeaveType } from "./service.types"

//appwrite leave_request
export interface LeaveReq{
    rowId: string,
    userId: string,//empId
    companyId:string,
    startDate: Date,
    endDate:Date,
    leaveType: LeaveType,
    approvalStatus:ApprovalStatus
}

//appwrite expense_request
export interface ExpenseReq{
    rowId:string,
    userId:string,//empId
    companyId:string,
    title:string,
    amount:number,
    category:string,
    desc:string,
    receipt:string,
    approvalStatus: ApprovalStatus
}

export interface APTUser extends User{
    position:Role,
    profilePic:string
}

export interface Project{
    rowId:string,
    companyId:string,
    projectName:string,
    managerId:string //userId
}