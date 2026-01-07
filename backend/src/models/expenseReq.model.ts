import mongoose, {Schema, Document} from "mongoose";

export interface IExpenseRequest extends Document{
    title:string,
    amount:number,
    category:string,
    desc:string,
    receipt:string,
    userId:mongoose.Types.ObjectId
    companyId:mongoose.Types.ObjectId
    approvalStatus:string
}

const ExpenseRequestSchema :Schema = new Schema({
    title:{type:String, required:true},
    amount:{type:Number, required:true},
    category:{type:String, required:true},
    desc:{type:String},
    receipt:{type:String, required:true},
    approvalStatus:{type:String, required:true},
    userId:{type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    companyId:{type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true}
},{
    timestamps:true
})

export const ExpenseRequest = mongoose.model<IExpenseRequest>('ExpenseRequest', ExpenseRequestSchema)