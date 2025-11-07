export interface Company{
    companyId: string,
    companyName:string,
    companyCode:string

}
export enum Role{
    admin,
    manager,
    employee
}

export interface User{
    userId:string,
    firstname:string,
    lastname:string,
    email:string,
    companyId:string,
    role: Role
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
