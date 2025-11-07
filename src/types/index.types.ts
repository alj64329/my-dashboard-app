export interface Company{
    companyId: string,
    companyName:string,
    companyCode:string

}
export enum Role{
    admin,
    pm,
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