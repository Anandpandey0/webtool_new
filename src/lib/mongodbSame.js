import mongoose from "mongoose";
export const connectSampleMongoDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://anandpiitr:anandpiitr@cluster0.o00gebz.mongodb.net/farmer_details"
    );
    console.log("MongoDB Connected");
  } catch (error) {
    console.log("Error occured while connecting", error);
  }
};
