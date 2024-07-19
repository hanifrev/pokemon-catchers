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
      const username = req.cookies.username;

      const collection = database.collection(collectionName);

      const user = await collection.findOne({ username });

      if (user) {
        let updateField;
        switch (req.body.pokeBallType) {
          case "Poke Ball":
            updateField = { pokeBall: -1 };
            break;
          case "Great Ball":
            updateField = { greatBall: -1 };
            break;
          case "Master Ball":
            updateField = { masterBall: -1 };
            break;
          default:
            return res.status(400).json({ error: "Invalid Poke Ball type" });
        }

        await collection.updateOne({ username }, { $inc: updateField });

        return res
          .status(200)
          .json({ message: "Poke Balls updated successfully" });
      } else {
        return res.status(400).json({ error: "User not found" });
      }
    } catch (error) {
      console.error("Error while updating Poke Balls:", error);
      return res.status(500).json({ error: "Error while updating Poke Balls" });
    }
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}
