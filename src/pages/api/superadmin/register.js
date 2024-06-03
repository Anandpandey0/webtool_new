
import { connectMongoDB } from "../../../lib/mongodb";
import SuperAdminManager from "@/managers/superAdminManager";

const superAdminUser = new SuperAdminManager();

export default async function register(req, res) {
  if (req.method === 'POST') {
    try {
     await connectMongoDB();
      // Parse the request body
      const {username , email , password} = req.body;
      // Create a new SuperAdmin
      const response = await superAdminUser.registerSuperAdmin(username, email, password)
      res.status(200).json({
        status: 200,
        message: response.message,
        data: response.data,
    })
    console.log(response);
    return ;

    } catch (error) {
      // Return error response
      console.error(error);
      res.json({ status: 500, message: "Internal server error" });
    }
  } else {
    // Return method not allowed response for other HTTP methods
    res.status(405).json({
      method:"GET",
      message:"Method not allowed"
    }).end();
  }
}
