
import { connectMongoDB } from "../../../lib/mongodb";
import SuperAdminManager from "@/managers/superAdminManager";




export default async function login(req, res) {
  if (req.method === 'POST') {
    try {
      // Parse the request body
      const { email, password} = req.body;

      // Connect to MongoDB
      await connectMongoDB();
      
      // Create a new user
      await User.create({ name, email, isSuperAdmin:true });

      // Return success response
      res.json({ status: 201, message: "User registered" });
    } catch (error) {
      // Return error response
      console.error(error);
      res.json({ status: 500, message: "Internal server error" });
    }
  } else {
    // Return method not allowed response for other HTTP methods
    res.status(405).end();
  }
}
