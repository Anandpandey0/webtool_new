import User from "@/Models/users";
import { connectMongoDB } from "@/lib/mongodb";

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      // Parse the request body
      const { name, email } = req.body;

      // Connect to MongoDB
      await connectMongoDB();
      
      // Create a new user
      await User.create({ name, email });

      // Return success response
      res.status(201).json({ status: 201, message: "User registered" });
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
