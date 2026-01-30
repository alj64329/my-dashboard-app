import { Types } from "mongoose";
import { Project } from "../models/project.model";
import { ITeam, Team } from "../models/team.model";

//get all team
const getAllTeam = async()=>{
    return await Team.find()
}

//get team by id
const getTeamById = async(id:string)=>{
    return await Team.findById(id)
}

//create team
const addTeam = async(newTeam:Partial<ITeam>)=>{
    const {userId, projectId, projectRole, startDate, state} = newTeam

    if(!userId||!projectId||!projectRole ||!state||!startDate) return

    return await Team.create({
        userId:new Types.ObjectId(userId),
        projectId:new Types.ObjectId(projectId),
        projectRole,
        startDate: new Date(startDate),
        state
    })
}

//update team -role
const updateTeam = async(id:string, data:Partial<ITeam>)=>{
    return await Team.findByIdAndUpdate(id, data,{
        new:true
    })
}

//delete team
const removeTeam = async(id:string)=>{
    return await Team.findByIdAndDelete(id)
}

//get all team member by projectId (join with User)
const getMemberInProj = async(projectId:string)=>{
   return await Team.find({projectId})
    .populate({
        path:"userId",
        select:"name position"
    })
    .populate({
        path:"projectId",
        select:"project_name status"
    })
    .lean()
}

//get all project by userId 
const getMyProjects = async(userId:string)=>{
    return await Team.find({userId}).populate({path:"projectId"}).lean()
}

//get all project with members by companyid
const getConsolidateProjList = async(companyId:string)=>{
    return await Team.aggregate([
        {
            $lookup:{
                from:'projects',
                localField:'projectId',
                foreignField:'_id',
                as:'projects'
            }
        },
        {$unwind:'$projects'},
        {
            $match:{
                'projects.companyId':new Types.ObjectId(companyId)
            }
        },
        {
            $lookup:{
                from:'users',
                localField:'userId',
                foreignField:'_id',
                as:'users'
            }
        },
        { $unwind:'$users'},
    ])
}


export default{
    getAllTeam,
    getTeamById,
    addTeam,
    removeTeam,
    getMemberInProj,
    updateTeam,
    getMyProjects,
    getConsolidateProjList
}