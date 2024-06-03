// utils/db.js
import mongoose from 'mongoose';

export const connectMongoDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://anandpiitr:anandpiitr@cluster0.o00gebz.mongodb.net/userdb");
        console.log("MongoDB Connected");
    } catch (error) {
        console.log("Error occurred while connecting", error);
    }
};

// In your .env.local file, ensure you have the following:
// MONGODB_URI=mongodb+srv://anandpiitr:password@cluster0.o00gebz.mongodb.net/db_name
