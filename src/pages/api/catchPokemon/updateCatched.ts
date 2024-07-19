import { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";

const uri = process.env.MONGOURI as string;

const client = new MongoClient(uri);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      await client.connect();
      const database = client.db(process.env.DATABASE_NAME);
      if (!database) {
        throw new Error("Database is not found");
      }
      const collectionName = process.env.COLLECTION_NAME;
      if (!collectionName) {
        throw new Error(
          "Collection name is not defined in environment variables."
        );
      }

      const collection = database.collection(collectionName);

      const username = req.cookies.username;

      const user = await collection.findOne({ username });

      if (!user) {
        return res.status(400).json({ error: "User not found" });
      }

      await collection.updateOne({ username }, { $inc: { catched: 1 } });

      return res.status(200).json({ message: "Catched updated successfully" });
    } catch (error) {
      console.error("Error update catched", error);
      return res.status(500).json({ error: "Error while updating catched" });
    }
  } else {
    return res.status(450).json({ error: "Method not allowed" });
  }
}
