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

    if(!userId||!projectId||!projectRole||!startDate ||!state) return

    return await Team.create({
        userId,
        projectId,
        projectRole,
        startDate,
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
        path:"userId"
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
                from:'Project',
                localField:'projectId',
                foreignField:'_id',
                as:'project'
            }
        },
        {$unwind:'$project'},
        {
            $match:{
                'project.companyId':companyId
            }
        },
        {
            $lookup:{
                from:'User',
                localField:'userId',
                foreignField:'_id',
                as:'user'
            }
        },
        { $unwind:'$user'},

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