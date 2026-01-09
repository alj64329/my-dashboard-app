import mongoose, {Schema, Document} from "mongoose";

export interface ITodo extends Document{
    title:string,
    desc:string,
    due:Date,
    status:string,
    priority:string,
    userId:mongoose.Types.ObjectId
}

const TodoSchema :Schema = new Schema({
    title:{type:String, required:true},
    desc:{type:String, required:true},
    due:{type:Date, default:Date.now},
    status:{type:String, required:true},
    priority:{type:String, required:true},
    userId:{type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}
},{
    timestamps:true
})

export const Todo = mongoose.model<ITodo>('Todo', TodoSchema)