export type AuthFormprops ={
    h2Title:string,
    authFormType:  "signup-step1"|"signup-step2"|"login",
    data?:AdminData| EmployeeData
}

export type OtpProps={
    data: AdminData|EmployeeData|undefined,
    route:string
}

export type AdminData={
    role:"admin",
    company:string,
    name:string,
    email:string
    appwriteId:string
}

export type EmployeeData ={
    role:"employee",
    name:string,
    email:string,
    companyCode:string,
    appwriteId:string
}

export interface Company{
    companyId: string,
    companyName:string,
    companyCode:string

}
export enum Role{
    admin="admin",
    manager = "manager",
    employee = "employee"
}

export interface User{
    userId:string,
    name:string,
    email:string,
    companyId:string,
    role: Role
    appwriteId:string
}

export enum Status{
    planned,
    active,
    completed
}

export interface Project{
    projId: string,
    companyId: string,
    managerId:string,
    member:string[],//array of empIds
    projName:string,
    desc:string,
    startData:Date,
    endDate:Date,
    status: Status
}
