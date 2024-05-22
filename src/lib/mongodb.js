import mongoose from "mongoose";
export const connectMongoDB = async ()=>{
    try {
        await mongoose.connect("mongodb+srv://anandpiitr:anandpiitr@cluster0.o00gebz.mongodb.net/google_auth_nextjs");
        console.log("MongoDB Connected");
        } catch (error) {
            console.log("Error occured while connecting",error);
        }

}
//reploy