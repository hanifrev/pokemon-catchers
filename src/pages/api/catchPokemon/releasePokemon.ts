import { NextApiRequest, NextApiResponse } from "next";
import Cookies from "cookies";
import { MongoClient } from "mongodb";

const uri = process.env.MONGOURI as string;
const client = new MongoClient(uri);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "DELETE") {
    try {
      await client.connect();
      const database = client.db(process.env.DATABASE_NAME);

      if (!database) {
        throw new Error("Database not found");
      }

      const collectionName = process.env.COLLECTION_NAME;
      console.log(collectionName);

      if (!collectionName) {
        throw new Error(
          "Collection name is not defined in environment variables."
        );
      }

      const collection = database.collection(collectionName);

      const cookies = new Cookies(req, res);
      // const username = cookies.get("username");
      const username = req.cookies.username;

      const user = await collection.findOne({ username });

      if (!user) {
        return res.status(400).json({ error: "User not found" });
      }

      const { uid } = req.body;

      const pokemonIndex = user.myPokemon.findIndex(
        (pokemon: any) => pokemon.uid === uid
      );

      if (pokemonIndex !== -1) {
        user.myPokemon.splice(pokemonIndex, 1);

        await collection.updateOne(
          { username },
          { $set: { myPokemon: user.myPokemon } }
        );

        return res
          .status(200)
          .json({ message: "Pokemon removed successfully" });
      } else {
        return res.status(404).json({ error: "Pokemon not found" });
      }
    } catch (error) {
      console.error("Error while removing Pokémon:", error);
      return res.status(500).json({ error: "Error while removing Pokémon" });
    }
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}
