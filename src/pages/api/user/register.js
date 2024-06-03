
import UserManager from "@/managers/userManager";
import { connectMongoDB } from '../../../lib/mongodb';

const userManager = new UserManager();

export default async function register(req, res) {
  if (req.method === 'POST') {
    try {
        await connectMongoDB();
        const { email, password, username, organization_name, contact_number } = req.body;
        const userData = {
            email, password, username, organization_name, contact_number
        }
        const response = await userManager.registerUser(userData)
        res.status(200).json({
            status: 200,
            message: response.message,
            data: response.data,
        })
        console.log(response);
        return ;
    
    } catch (error) {
        console.log(new Error(errror))
        res.status(500).json({ status: 500, message: "Internal server error" });
    }
  } else {
    // Return method not allowed response for other HTTP methods
    // await connectMongoDB();
    res.status(200).json({
        method:"GET"
    })
    return 
  }
}
