import { Request, Response } from "express";
import { ILeaveRequest } from "../models/leaveReq.model";
import leaveRequestService from "../service/leaveRequest.service";

//Get all requests
const getAllLeaveReq = async(req: Request, res: Response) => {
  try{
    const requests = await leaveRequestService.getLReqs()
    res.status(200).json(requests)
  }catch (err) {
    console.error(err)
    res.status(500).json({ message: "Server error" })
  }
}

//Get LeaveReq by id
const getLeaveReqById = async(req: Request<{id: string}>, res: Response) => {
  try{
    const leaveReq = await leaveRequestService.getLReqById(req.params.id)
    if(!leaveReq) {
      res.status(404).json({message: "LeaveReq not found"})
      return
    }
    res.status(200).json(leaveReq)
  }catch (err) {
    console.error(err)
    res.status(500).json({ message: "Server error" })
  }
}

//Get LeaveReq by query
const getLeaveReqByQuery= async(req: Request<{},{},{}, {userId: string, companyId:string,approvalStatus:string}>, res: Response) => {
    const {userId, companyId, approvalStatus} = req.query
  try{
    if(companyId && approvalStatus){
        const leaveReq = await leaveRequestService.getCompLReqByStatus(companyId, approvalStatus)
        if(!leaveReq) {
        res.status(404).json({message: "LeaveReq not found"})
        return
        }
        res.status(200).json(leaveReq)
    }else if(companyId){
        const leaveReq = await leaveRequestService.getCompLReq(companyId)
        if(!leaveReq) {
        res.status(404).json({message: "LeaveReq not found"})
        return
        }
        res.status(200).json(leaveReq)
    }else if(userId){
        const leaveReq = await leaveRequestService.getUserLReq(userId)
        if(!leaveReq) {
        res.status(404).json({message: "LeaveReq not found"})
        return
        }
        res.status(200).json(leaveReq)
    }else{
        res.status(500).json({messege:"No query found"})
    }
  }catch (err) {
    console.error(err)
    res.status(500).json({ message: "Server error" })
  }
}

// Create LeaveReq
const addLeaveReq = async(req: Request<{}, ILeaveRequest>, res: Response) => {
  const {fromDate,toDate,leaveType,userId,companyId} = req.body

  try{
    const newLeaveReq = await leaveRequestService.addLRequest({fromDate,toDate,leaveType,userId,companyId})
    if(!newLeaveReq) {
      res.status(500).json({message: "Unable to add LeaveReq"})
      return
    }
    res.status(201).json(newLeaveReq)
  }catch (err) {
    console.error(err)
    res.status(500).json({ message: "Server error" })
  }
  
}

//Update LeaveReq by id
const updateLeaveReqById = async(req: Request<{id: string}, Partial<ILeaveRequest>>, res: Response) => {
  const {fromDate,toDate,leaveType,userId} = req.body
  try{
    const updatedLeaveReq = await leaveRequestService.updateLRequest(req.params.id, {fromDate,toDate,leaveType,userId})

    if(!updatedLeaveReq) {
      res.status(500).json({message: "Unable to update LeaveReq"})
      return
    }
    res.status(200).json(updatedLeaveReq)
  }catch (err) {
    console.error(err)
    res.status(500).json({ message: "Server error" })
  }
}

// Delete LeaveReq by id
const deleteLeaveReqById = async(req: Request<{id: string}>, res: Response) => {
  try{
    const deletedLeaveReq = await leaveRequestService.removeLRequest(req.params.id)
    if(!deletedLeaveReq) {
      res.status(500).json({message: "Unable to delete LeaveReq"})
      return
    }
    res.status(200).json(deletedLeaveReq)
  }catch (err) {
    console.error(err)
    res.status(500).json({ message: "Server error" })
  }

}

export default{
    getAllLeaveReq,
    getLeaveReqById,
    getLeaveReqByQuery,
    addLeaveReq,
    updateLeaveReqById,
    deleteLeaveReqById
}