import { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";

interface CaughtPokemon {
  uid: string;
  id: number;
  name: string;
  nickname: string;
  sprite: string;
  dateCaught: any;
}

interface UserDocument {
  username: string;
  myPokemon: CaughtPokemon[];
}

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

      const collection = database.collection<UserDocument>(collectionName);

      const username = req.cookies.username;

      const databaseCollection = await collection.findOne({ username });

      if (databaseCollection) {
        const { uid, id, name, nickname, sprite, dateCaught } = req.body;

        const caughtPokemon = {
          uid,
          id,
          name,
          nickname,
          sprite,
          dateCaught,
        };

        await collection.updateOne(
          { username },
          { $push: { myPokemon: caughtPokemon } }
        );

        return res.status(200).json({ message: "Pokemon added successfully" });
      } else {
        return res.status(400).json({ error: "User not found" });
      }
    } catch (error) {
      console.error("Error while adding caught Pokemon:", error);
      return res
        .status(500)
        .json({ error: "Error while adding caught Pokemon" });
    }
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}
