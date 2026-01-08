import { Request, Response } from "express";
import { IProject } from "../models/project.model"; 
import projectService from "../service/project.service";

//Get all projects
const getAllProject = async(req: Request, res: Response) => {
  try{
    const projects = await projectService.getAllProjects()
    res.status(200).json(projects)
  }catch (err) {
    console.error(err)
    res.status(500).json({ message: "Server error" })
  }
}

//Get Project by id
const getProjectById = async(req: Request<{id: string}>, res: Response) => {
  try{
    const project = await projectService.getByProjectId(req.params.id)
    if(!project) {
      res.status(404).json({message: "Project not found"})
      return
    }
    res.status(200).json(project)
  }catch (err) {
    console.error(err)
    res.status(500).json({ message: "Server error" })
  }
}

//Get Project by query
const getProjectByQuery = async(req: Request<{},{},{}, {companyId: string, status:string }>, res: Response) => {
  try{
    const {companyId, status} = req.query
    
    if(!status){
        const projects = await projectService.getProjByCompanyId(companyId)
        if(!projects) {
            res.status(404).json({message: "Projecys not found"})
            return
        }
        res.status(200).json(projects)
    }else{
        const projects = await projectService.getProjbyStatus(companyId, status)

        if(!projects){
            res.status(404).json({message:"Projects not found"})
            return
        }
        res.status(200).json(projects)
    }
  }catch (err) {
    console.error(err)
    res.status(500).json({ message: "Server error" })
  }
}

// Create Project
const addProject = async(req: Request<{}, IProject>, res: Response) => {
  const {project_name, status, companyId} = req.body

  if(!project_name||!status||!companyId) return

  try{
    const newProject = await projectService.addProject({project_name, status, companyId})
    if(!newProject) {
      res.status(500).json({message: "Unable to add Project"})
      return
    }
    res.status(201).json(newProject)
  }catch (err) {
    console.error(err)
    res.status(500).json({ message: "Server error" })
  }
  
}

//Update Project by id
const updateProjectById = async(req: Request<{id: string}, Partial<IProject>>, res: Response) => {
  const {project_name, status} = req.body
  try{
    const updatedProject = await projectService.updateProj(req.params.id, {project_name, status})

    if(!updatedProject) {
      res.status(500).json({message: "Unable to update Project"})
      return
    }
    res.status(200).json(updatedProject)
  }catch (err) {
    console.error(err)
    res.status(500).json({ message: "Server error" })
  }
}

// Delete Project by id
const deleteProjectById = async(req: Request<{id: string}>, res: Response) => {
  try{
    const deletedProject = await projectService.removeProj(req.params.id)
    if(!deletedProject) {
      res.status(500).json({message: "Unable to delete Project"})
      return
    }
    res.status(200).json(deletedProject)
  }catch (err) {
    console.error(err)
    res.status(500).json({ message: "Server error" })
  }

}

export default{
    getAllProject,
    getProjectById,
    getProjectByQuery,
    addProject,
    updateProjectById,
    deleteProjectById
}