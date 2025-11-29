import { Dispatch } from "react"

export enum TableType {
    projects="projects",
    tasks ="tasks",
    leaveReq ="leaveReq",
    expenseReq="expenseReq"
}

export interface PropsTableType{
    type: TableType
}

export enum RequestType{
    expense ="expense",
    leave ="leave",
}
export interface RequestBtnType{
    requestType: RequestType
}

export type ProfileSheetProps={
  setProfileOpen: Dispatch<React.SetStateAction<boolean>>,
  open?:boolean
}

export interface PropsMenuType{
    type:ScreenType
}

export enum ScreenType{
    desktop ="desktop",
    mobile = "mobile"
}