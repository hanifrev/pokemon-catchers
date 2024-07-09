import fs from "fs";
import path from "path";
import { NextApiRequest, NextApiResponse } from "next";

const dbPath = path.resolve("./db.json");

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "DELETE") {
    try {
      const rawData = fs.readFileSync(dbPath, "utf-8");
      const data = JSON.parse(rawData);

      const username = req.cookies.username;

      const userIndex = data.findIndex(
        (user: any) => user.username === username
      );

      if (userIndex !== -1) {
        const userPokemon = data[userIndex].myPokemon;

        const { uid } = req.body;

        const pokemonIndex = userPokemon.findIndex(
          (pokemon: any) => pokemon.uid === uid
        );

        if (pokemonIndex !== -1) {
          userPokemon.splice(pokemonIndex, 1);

          fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));

          return res
            .status(200)
            .json({ message: "Pokemon removed successfully" });
        } else {
          return res.status(404).json({ error: "Pokemon not found" });
        }
      } else {
        return res.status(400).json({ error: "User not found" });
      }
    } catch (error) {
      console.error("Error while removing Pokémon:", error);
      return res.status(500).json({ error: "Error while removing Pokémon" });
    }
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}
