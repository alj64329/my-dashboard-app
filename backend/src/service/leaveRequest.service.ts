import { Types } from "mongoose";
import { ILeaveRequest, LeaveRequest } from "../models/leaveReq.model";

//get all requests
const getLReqs = async()=>{
    return await LeaveRequest.find()
}

//get request by Id
const getLReqById = async(reqId:string)=>{
    return await LeaveRequest.findById(reqId)
    .populate({path:"userId"})
    .lean()
}

//get requestd by userId
const getUserLReq = async(userId:string)=>{
    return await LeaveRequest.find({userId})
}

//get requests by companyId
const getCompLReq = async(companyId:string)=>{
    return await LeaveRequest.find({companyId})
    .populate({path:"userId"})
    .lean()
}

//get pending requests by companyId
const getCompLReqByStatus = async(companyId:string, approvalStatus:string)=>{
    return await LeaveRequest.find({
        companyId,
        approvalStatus
    })
}

//create request
const addLRequest = async(newRequest:Partial<ILeaveRequest>)=>{
    const {fromDate,toDate,leaveType,userId,companyId} = newRequest

    if(!fromDate||!toDate||!leaveType||!userId||!companyId) return

    const status = "pending"

    return await LeaveRequest.create({
        fromDate:new Date(fromDate),
        toDate: new Date(toDate),
        leaveType,
        approvalStatus:status,
        userId,
        companyId
    })
}

//update request
const updateLRequest = async(id:string, data:Partial<ILeaveRequest>)=>{
    return await LeaveRequest.findByIdAndUpdate(id,data,{
        new:true
    })
}

//delete request
const removeLRequest = async(id:string)=>{
    return await LeaveRequest.findByIdAndDelete(id)
}

export default{
    getLReqs,
    getLReqById,
    getUserLReq,
    getCompLReq,
    getCompLReqByStatus,
    addLRequest,
    updateLRequest,
    removeLRequest
}