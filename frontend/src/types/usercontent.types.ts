import { Page } from "./dashboard.types"
import { Company, Role } from "./index.types"

export interface UserContentType{
    loggedInUser:LoggedInUser |null,
    handleSetLoggedInUser: (user:LoggedInUser|null)=>void,
    page:Page,
    handleSetPage:(newpage:Page)=>void
}

export interface LoggedInUser{
    _id:string
    name:string,
    email:string,
    companyId:Company,
    role: Role,
    position:string,
    profilePic:string
}
