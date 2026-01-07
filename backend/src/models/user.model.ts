import mongoose, {Schema, Document} from "mongoose";

export interface IUser extends Document{
    email:string,
    password:string,
    name:string,
    position:string,
    role:string,
    profilePic:string
    companyId:mongoose.Types.ObjectId
}

const UserSchema :Schema = new Schema({
    email:{type:String, required:true},
    password:{type:String, required:true, select:false},
    name:{type:String, default:''},
    position:{type:String, default:''},
    role:{type:String, default:''},
    profilePic:{type:String, default:''},
    companyId:{type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true}
},{
    timestamps:true
})

export const User = mongoose.model<IUser>('User',UserSchema)