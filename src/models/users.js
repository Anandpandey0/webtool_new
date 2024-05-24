import mongoose from "mongoose";
import { Schema } from "mongoose";

const UserSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String , required:true},
    isAdmin:{type:Boolean,default:false},
    isSuperAdmin:{type:Boolean,default:false}
 
},{timestamps:true});
mongoose.models = {};
const User =  mongoose.model("User", UserSchema);

export default User;