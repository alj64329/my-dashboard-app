'use client'
import { IoChevronBackOutline } from "react-icons/io5";
import ItemDetail, { FieldConfig } from "@/src/components/dashboard/ItemDetail"
import { useDashboard } from "@/src/stores/dashboard.store"
import { Project, Status, User } from "@/src/types/index.types"
import Link from "next/link"
import { useEffect, useState } from "react"
import { cleaningProjectDetailData } from "@/src/utils/dataClaenup";

export type TeamReturnType={
  _id:string,
  projectId:Project
  userId:User
  projectRole:string,
  state:string
}

export type ProjectDisplayType={
    _id:string, //projectId
    project_name:string,
    status:Status,
    members:{
        user:User
        projectRole:string,
        memberState:string,
        teamId:string
    }[]
}


type Props = {
    projectId:string
    data:TeamReturnType[]
}

const ClientProject = ({projectId,data}: Props) => {
    const [formData, setFormData]= useState<ProjectDisplayType|null>(null)

    const {setTeamList} = useDashboard()
    
    const title ="Project Detail"
    const nonEditKey : (keyof ProjectDisplayType)[] =[ "_id","members"]
    const fieldConfig:FieldConfig<ProjectDisplayType> ={
        status:{
            type:"select",
            options:[
                {label:"Active", value:Status.active},
                {label:"Completed", value:Status.completed},
                {label:"Planned", value:Status.planned},
            ]
        }
    }
    const seeTeamsLink =`/admin/teams?projectId=${projectId}`
    const backLink = "/admin/projects"

    const onEditRequest = async(updates:ProjectDisplayType) =>{
        const projectId = updates._id
        const updatedInfo ={
            project_name:updates.project_name,
            status:updates.status,
        }

        //create api function for projects and teams
        // const updatedUser = await (userId, updatedInfo)

        // if(!updatedUser){
        //     console.log("Error occurs")
        //     return false
        // }
        return true
    }


    useEffect(()=>{

        if(data){
            const cleanedData = cleaningProjectDetailData(data)
            console.log(cleanedData)
            if(!cleanedData) return
            const projectPayload:ProjectDisplayType ={
                _id:cleanedData.projectId,
                project_name:cleanedData.project_name,
                status:cleanedData.status,
                members:cleanedData.members,
            }

            setFormData(projectPayload)
            //set Store for team page
            setTeamList(projectPayload)
        }
    },[data])
  return (
    <>
        <div className="flex w-full p-4">
            <Link href={backLink}
            className="flex items-center gap-4 w-fit">
            <IoChevronBackOutline/> Back
            </Link>
        </div>
        <div
        className="flex pt-20 justify-center w-full h-full">
            {formData&&
            <ItemDetail 
            title={title} 
            nonEditKey={nonEditKey} 
            data={formData}
            fieldConfig={fieldConfig}
            onEdit={onEditRequest}
            hrefLink={seeTeamsLink}/>}
        </div>
    </>
  )
}

export default ClientProject