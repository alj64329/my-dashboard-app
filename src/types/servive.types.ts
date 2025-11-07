export enum Priority{
    high,
    medium,
    low
}
export enum Progress{
    assigned,
    'in-progress',
    done
}

export interface Task{
    id:string,
    projectId:string,
    assignedTo:string[],
    title:string
    priority:Priority,
    progress: Progress,
    desc:string
    dueDate: Date
}

export enum ApprovalStatus{
    pending,
    approved,
    rejected
}

export enum LeaveType{
    vacation,
    sick
}

export interface LeaveReq{
    id: string,
    userId: string,//empId
    startDate: Date,
    endDate:Date,
    leaveType: LeaveType,
    approvalStatus:ApprovalStatus
}

export interface ExpenseReq{
    id:string,
    userId:string,//empId
    companyId:string,
    amount:number,
    category:string,
    desc:string,
    receipt:string,
    status: ApprovalStatus
}