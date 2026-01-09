import { Request, Response } from "express";
import { IExpenseRequest } from "../models/expenseReq.model"; 
import expenseRequestService from "../service/expenseRequest.service";

//Get all requests
const getAllExpenseReq = async(req: Request, res: Response) => {
  try{
    const requests = await expenseRequestService.getEReqs()
    res.status(200).json(requests)
  }catch (err) {
    console.error(err)
    res.status(500).json({ message: "Server error" })
  }
}

//Get ExpenseReq by id
const getExpenseReqById = async(req: Request<{id: string}>, res: Response) => {
  try{
    const request = await expenseRequestService.getEReqById(req.params.id)
    if(!request) {
      res.status(404).json({message: "ExpenseReq not found"})
      return
    }
    res.status(200).json(request)
  }catch (err) {
    console.error(err)
    res.status(500).json({ message: "Server error" })
  }
}

//Get ExpenseReq by query
const getExpenseReqByQuery= async(req: Request<{},{},{}, {userId: string, companyId:string,approvalStatus:string}>, res: Response) => {
    const {userId, companyId, approvalStatus} = req.query
  try{
    if(companyId && approvalStatus){
        const requests = await expenseRequestService.getCompEReqByStatus(companyId, approvalStatus)
        if(!requests) {
        res.status(404).json({message: "ExpenseReq not found"})
        return
        }
        res.status(200).json(requests)
    }else if(companyId){
        const requests = await expenseRequestService.getCompEReq(companyId)
        if(!requests) {
        res.status(404).json({message: "ExpenseReq not found"})
        return
        }
        res.status(200).json(requests)
    }else if(userId){
        const requests = await expenseRequestService.getUserEReq(userId)
        if(!requests) {
        res.status(404).json({message: "ExpenseReq not found"})
        return
        }
        res.status(200).json(requests)
    }else{
        res.status(500).json({messege:"No query found"})
    }
  }catch (err) {
    console.error(err)
    res.status(500).json({ message: "Server error" })
  }
}

// Create ExpenseReq
const addExpenseReq = async(req: Request<{}, IExpenseRequest>, res: Response) => {
  const {title,amount,category,receipt, desc,userId,companyId} = req.body

  try{
    const newRequest = await expenseRequestService.addERequest({title,amount,category,receipt, desc,userId,companyId})
    if(!newRequest) {
      res.status(500).json({message: "Unable to add ExpenseReq"})
      return
    }
    res.status(201).json(newRequest)
  }catch (err) {
    console.error(err)
    res.status(500).json({ message: "Server error" })
  }
  
}

//Update ExpenseReq by id
const updateExpenseReqById = async(req: Request<{id: string}, Partial<IExpenseRequest>>, res: Response) => {
  const {title,amount,category,receipt, desc,userId, approvalStatus} = req.body
  try{
    const updatedRequest = await expenseRequestService.updateERequest(req.params.id, {title,amount,category,receipt, desc,userId, approvalStatus})

    if(!updatedRequest) {
      res.status(500).json({message: "Unable to update ExpenseReq"})
      return
    }
    res.status(200).json(updatedRequest)
  }catch (err) {
    console.error(err)
    res.status(500).json({ message: "Server error" })
  }
}

// Delete ExpenseReq by id
const deleteExpenseReqById = async(req: Request<{id: string}>, res: Response) => {
  try{
    const deletedRequest= await expenseRequestService.removeERequest(req.params.id)
    if(!deletedRequest) {
      res.status(500).json({message: "Unable to delete ExpenseReq"})
      return
    }
    res.status(200).json(deletedRequest)
  }catch (err) {
    console.error(err)
    res.status(500).json({ message: "Server error" })
  }

}

export default{
    getAllExpenseReq,
    getExpenseReqById,
    getExpenseReqByQuery,
    addExpenseReq,
    updateExpenseReqById,
    deleteExpenseReqById
}