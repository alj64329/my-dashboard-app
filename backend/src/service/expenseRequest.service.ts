import { IExpenseRequest, ExpenseRequest } from "../models/expenseReq.model" 

//get all requests
const getEReqs = async()=>{
    return await ExpenseRequest.find()
}

//get request by Id
const getEReqById = async(reqId:string)=>{
    return await ExpenseRequest.findById(reqId)
    .populate({path:"userId"})
    .lean()
}

//get requestd by userId
const getUserEReq = async(userId:string)=>{
    return await ExpenseRequest.find({userId})
}

//get requests by companyId
const getCompEReq = async(companyId:string)=>{
    return await ExpenseRequest.find({companyId})
    .populate({path:"userId"})
    .lean()
}

//get requests by companyId and status
const getCompEReqByStatus = async(companyId:string,approvalStatus:string)=>{
    return await ExpenseRequest.find({
        companyId,
        approvalStatus
    })
}

//create request
const addERequest = async(newRequest:Partial<IExpenseRequest>)=>{
    const {title,amount,category,receipt, desc,userId,companyId} = newRequest

    if(!title||!amount||!category||!receipt||!userId||!companyId) return

    const status = "pending"

    return await ExpenseRequest.create({
        title,
        amount,
        category,
        receipt,
        desc,
        approvalStatus:status,
        userId,
        companyId
    })
}

//update request
const updateERequest = async(id:string, data:Partial<IExpenseRequest>)=>{
    return await ExpenseRequest.findByIdAndUpdate(id,data,{
        new:true
    })
}

//delete request
const removeERequest = async(id:string)=>{
    return await ExpenseRequest.findByIdAndDelete(id)
}

export default{
    getEReqs,
    getEReqById,
    getUserEReq,
    getCompEReq,
    getCompEReqByStatus,
    addERequest,
    updateERequest,
    removeERequest
}