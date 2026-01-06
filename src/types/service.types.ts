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
    cancel ="cancel",
    pending ="pending",
    approved ="approved",
    declined ="declined"
}

export enum LeaveType{
    vacation,
    sick
}

