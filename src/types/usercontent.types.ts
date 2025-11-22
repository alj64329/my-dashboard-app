import { Models, Role } from "appwrite"

export interface UserContentType{
    loggedInUser:Models.User<any> |null,
    setLoggedInUser: React.Dispatch<React.SetStateAction<Models.User<any> | null>>,
    user:UserRow |null
    setUser: React.Dispatch<React.SetStateAction<UserRow|null>>
    company: CompanyRow | null,
    setCompany: React.Dispatch<React.SetStateAction<CompanyRow|null>>
}

export interface UserRow extends Models.DefaultRow{
    name:string,
    email:string,
    companyId: string,
    role: Role,
    appwriteId:string
}

export interface CompanyRow extends Models.DefaultRow{
    "company_name":string,
    "company_code": string,
    adminEmail: string,
    adminAppwriteId:string
}