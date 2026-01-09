import { Request, Response } from "express";
import { ITeam } from "../models/team.model";
import teamService from "../service/team.service";

//Get all Teams
const getAllTeam = async(req: Request, res: Response) => {
  try{
    const teams = await teamService.getAllTeam()
    res.status(200).json(teams)
  }catch (err) {
    console.error(err)
    res.status(500).json({ message: "Server error" })
  }
}

//Get Team by id
const getTeamById = async(req: Request<{id: string}>, res: Response) => {
  try{
    const team = await teamService.getTeamById(req.params.id)
    if(!team) {
      res.status(404).json({message: "Team not found"})
      return
    }
    res.status(200).json(team)
  }catch (err) {
    console.error(err)
    res.status(500).json({ message: "Server error" })
  }
}

//Get Team by query (get all team member/get all project by userId/get all project with members by companyid)
const getTeamByQuery = async(req: Request<{},{},{}, {companyId: string, projectId:string, userId:string}>, res: Response) => {
    const {companyId, projectId, userId} = req.query
    console.log(companyId)

    if(!companyId && !projectId && !userId){
      return res.status(400).json({message:"At least one query is required"})
    }
  try{
    
    if(companyId){
        const projects = await teamService.getConsolidateProjList(companyId)
        if(!projects) {
            res.status(404).json({message: "Projects not found"})
            return
        }
        res.status(200).json(projects)
        return
    }else if(projectId){
        const team = await teamService.getMemberInProj(projectId)

        if(!team){
            res.status(404).json({message:"Teams not found"})
            return
        }
        res.status(200).json(team)
        return
    }else if(userId){
        const myProjects = await teamService.getMyProjects(userId)

        if(!myProjects){
            res.status(404).json({message:"Teams not found"})
            return
        }
        res.status(200).json(myProjects) 
        return
    }

    res.status(500).json({message:"No query passed"})
  }catch (err) {
    console.error(err)
    res.status(500).json({ message: "Server error" })
  }
}

// Create Team
const addTeam = async(req: Request<{}, ITeam>, res: Response) => {
  const {userId, projectId, projectRole, startDate, state} = req.body

  if(!projectRole||!userId||!projectId ||!state) return

  try{
    const newTeam = await teamService.addTeam({userId, projectId, projectRole,startDate, state})
    if(!newTeam) {
      res.status(500).json({message: "Unable to add Team"})
      return
    }
    res.status(201).json(newTeam)
  }catch (err) {
    console.error(err)
    res.status(500).json({ message: "Server error" })
  }
  
}

//Update Team by id
const updateTeamById = async(req: Request<{id: string}, Partial<ITeam>>, res: Response) => {
  const {userId, projectId, projectRole, startDate, state, endDate} = req.body
  try{
    const updatedTeam = await teamService.updateTeam(req.params.id, {userId, projectId, projectRole, startDate, state, endDate})

    if(!updatedTeam) {
      res.status(500).json({message: "Unable to update Team"})
      return
    }
    res.status(200).json(updatedTeam)
  }catch (err) {
    console.error(err)
    res.status(500).json({ message: "Server error" })
  }
}

// Delete Team by id
const deleteTeamById = async(req: Request<{id: string}>, res: Response) => {
  try{
    const deletedTeam = await teamService.removeTeam(req.params.id)
    if(!deletedTeam) {
      res.status(500).json({message: "Unable to delete Team"})
      return
    }
    res.status(200).json(deletedTeam)
  }catch (err) {
    console.error(err)
    res.status(500).json({ message: "Server error" })
  }

}

export default{
    getAllTeam,
    getTeamById,
    getTeamByQuery,
    addTeam,
    updateTeamById,
    deleteTeamById
}