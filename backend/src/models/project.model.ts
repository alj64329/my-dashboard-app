import mongoose, {Schema, Document} from "mongoose";

export interface IProject extends Document{
    project_name:string,
    status:string
    companyId:mongoose.Types.ObjectId
}

const ProjectSchema :Schema = new Schema({
    project_name:{type:String, required:true},
    status:{type:String, required:true},
    companyId:{type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true}
},{
    timestamps:true
})

export const Project = mongoose.model<IProject>('Project', ProjectSchema)