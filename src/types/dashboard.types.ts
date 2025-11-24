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