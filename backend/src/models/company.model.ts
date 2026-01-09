import mongoose, {Schema, Document} from "mongoose";

export interface ICompany extends Document{
    company_name:string,
    company_code:string,
    adminId:mongoose.Types.ObjectId
}

const CompanySchema :Schema = new Schema({
    company_name:{type:String, required:true},
    company_code:{type:String, required:true},
    adminId:{type: mongoose.Schema.Types.ObjectId, ref: 'User', required:false}
},{
    timestamps:true
})

export const Company = mongoose.model<ICompany>('Company', CompanySchema)