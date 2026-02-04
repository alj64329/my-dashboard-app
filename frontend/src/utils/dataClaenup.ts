import { TeamReturnType } from "../app/(dashboard)/admin/projects/[id]/page";
import { CleanedDataType } from "../app/(dashboard)/admin/projects/page";
import { Project, Status, Team, User } from "../types/index.types";

export interface TeamsReturnType extends Team{
    projects:Project
    users:User
}
export const cleaningProjectData = (data:TeamsReturnType[])=>{
    const projectMap = new Map<string, CleanedDataType>()

    data.forEach(item => {
        const projectId = item.projectId

        if(!projectMap.has(projectId)){
            projectMap.set(projectId,{
                _id:projectId,
                project_name:item.projects.project_name,
                status:item.projects.status as Status,
                members:1
            })
        }else{
            projectMap.get(projectId)!.members +=1
        }
        
    });

    const projects:CleanedDataType[] = Array.from(projectMap.values())

    return projects
}

export const cleaningProjectDetailData = (data:TeamReturnType[])=>{
    if(data.length===0) return null

    const {projectId} = data[0]

    return{
        projectId:projectId._id,
        project_name:projectId.project_name,
        status:projectId.status,
        members:data.map(t=>(
            {
                user:t.userId,
                projectRole:t.projectRole,
                memberState:t.state,
                teamId:t._id
            }
        ))
    }
}
