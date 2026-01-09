import mongoose, {Schema, Document} from "mongoose";

export interface ITeam extends Document{
  userId: mongoose.Types.ObjectId,
  projectId: mongoose.Types.ObjectId,
  projectRole:string
  startDate: Date,
  endDate:Date,
  state:string
}

const TeamSchema: Schema = new Schema({
  userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
  projectId: {type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true},
  projectRole:{type:String, required:true},
  startDate:{type:Date},
  endDate :{type:Date},
  state:{type:String, required:true}
}, {
  timestamps: true
})

export const Team = mongoose.model<ITeam>('Team', TeamSchema)