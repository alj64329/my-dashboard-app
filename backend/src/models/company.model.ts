import mongoose, {Schema, Document} from "mongoose";

export interface ICompany extends Document{
    comapny_name:string,
    company_code:string,
    adminId:mongoose.Types.ObjectId
}

const CompanySchema :Schema = new Schema({
    comapny_name:{type:String, required:true},
    company_code:{type:String, required:true, select:false},
    adminId:{type: mongoose.Schema.Types.ObjectId, ref: 'User', required:false}
},{
    timestamps:true
})

export const Company = mongoose.model<ICompany>('Company', CompanySchema)