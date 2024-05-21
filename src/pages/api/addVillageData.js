
import { connectSampleMongoDB } from "@/lib/mongodbSame";
import { villageData } from "@/data/villages";
import Village from "@/Models/village";
export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      // Parse the request body
      await connectSampleMongoDB();

      const insertData = await Village.insertMany(villageData);
      res.status(200).json({success:true,data:insertData})
 
    } catch (error) {
      // Return error response
      console.error(error);
      res.json({ status: 500, message: "Internal server error" });
    }
  } else {
    // Return method not allowed response for other HTTP methods
    res.status(405).end();
  }
  if(req.method ==='GET'){
    try {
      // Parse the request body
      await connectSampleMongoDB();
      const insertData = await Village.find();
      res.status(200).json({success:true,data:insertData})
  }
  catch(error){
    // Return error response
    console.error(error);
    res.json({ status: 500, message: "Internal server error" });
  }
}
}
