import BhoomiScore from "@/models/bhoomiscore";
// import { connectMongoDB } from "@/lib/mongodb";
import { connectSampleMongoDB } from "@/lib/mongodbSame";

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            await connectSampleMongoDB();
            const bhoomiScoreDb  = await BhoomiScore.find();
            res.status(200).json(bhoomiScoreDb);
        } catch (error) {
            console.error(new Error(error))
            res.status(500).json({ status: 500, message: "Internal server error" });
        }
    }
    else {
        // Return method not allowed response for other HTTP methods
        res.status(405).end();
      }



}