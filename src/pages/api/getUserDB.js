import User from "@/models/users";
import { connectMongoDB } from "@/lib/mongodb";

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      // Parse the request body

      // Connect to MongoDB
      await connectMongoDB();
      
      // Create a new user
      const userDB = await User.find();

      // Return success response
      res.status(201).json({ status: 201, message: "User list " ,users:userDB });
    } catch (error) {
      // Return error response
      console.error(error);
      res.status(500).json({ status: 500, message: "Internal server error" });
    }
  } else {
    // Return method not allowed response for other HTTP methods
    res.status(405).end();
  }
}
