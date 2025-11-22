export enum TableType {
    projects="projects",
    tasks ="tasks"
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