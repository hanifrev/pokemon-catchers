import { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";

const uri = process.env.MONGOURI as string;
const client = new MongoClient(uri);

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await client.connect();
    const database = client.db(process.env.DATABASE_NAME);
    const collectionName = process.env.COLLECTION_NAME;

    if (!database || !collectionName) {
      throw new Error("Database or collection name is not defined");
    }

    const collection = database.collection(collectionName);

    const users = await collection.find().toArray();

    res.status(200).json(users);
  } catch (error) {
    console.error("Error while fetching users:", error);
    res.status(500).json({ message: "Internal server error" });
  } finally {
    await client.close();
  }
};

export default handler;
