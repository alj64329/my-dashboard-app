import mongoose, {Schema, Document} from "mongoose";

export interface ILeaveRequest extends Document{
    fromDate:Date,
    toDate:Date,
    leaveType:string,
    approvalStatus:string,
    userId:mongoose.Types.ObjectId
    companyId:mongoose.Types.ObjectId
}

const LeaveRequestSchema :Schema = new Schema({
    fromDate:{type:Date, required:true},
    toDate:{type:Date, required:true},
    leaveType:{type:String, required:true},
    approvalStatus:{type:String, required:true},
    userId:{type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    companyId:{type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true}
},{
    timestamps:true
})

export const LeaveRequest = mongoose.model<ILeaveRequest>('LeaveRequest', LeaveRequestSchema)