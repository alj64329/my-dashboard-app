import { IProject, Project } from "../models/project.model";

//get all projects
const getAllProjects = async()=>{
    return await Project.find()
}

//get project by id
const getByProjectId = async(id:string) =>{
    return await Project.findById(id)
}

//get project by companyId
const getProjByCompanyId = async(companyId:string)=>{
    return await Project.find(
        {companyId}
    )
}

//get by status and companyId
const getProjbyStatus = async(companyId:string, status:string)=>{
    return await Project.find({
        companyId,
        status
    })
}

//add project
const addProject =  async(newProject:Partial<IProject>)=>{
    const {project_name, status, companyId} = newProject

    if(!project_name||!companyId||!status) return

    return await Project.create({
        companyId,
        project_name,
        status
    })
}

//update project
const updateProj = async(id:string, data:Partial<IProject>)=>{
    return await Project.findByIdAndUpdate(id, data,{
        new:true
    })
}

//delete project
const removeProj = async(id:string)=>{
    return await Project.findByIdAndDelete(id)
}


export default{
    getAllProjects,
    getByProjectId,
    getProjByCompanyId,
    getProjbyStatus,
    addProject,
    updateProj,
    removeProj,
}