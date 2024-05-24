import mongoose from "mongoose";

const connectDb = async () => {
  await mongoose.connect(
   "mongodb+srv://anandpiitr:anandpiitr@cluster0.o00gebz.mongodb.net/google_auth_nextjs"
  );
  console.log("Connected to database");
};

export default connectDb;