import mongoose from "mongoose";
import { Schema } from "mongoose";

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  assigned_to: { type: String , default:'No one'},
  created_by : {type:String},
  created_on: { type: Date , default: Date.now()},
  status:{type:String,default:'Pending'},
  completed_on :{type:Date}
 
});
mongoose.models = {};
const Tasks = mongoose.model("Tasks", TaskSchema);

export default Tasks;