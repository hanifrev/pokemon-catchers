import fs from "fs";
import path from "path";
import { NextApiRequest, NextApiResponse } from "next";

const dbPath = path.resolve("./db.json");

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const rawData = fs.readFileSync(dbPath, "utf-8");
      const data = JSON.parse(rawData);

      const username = req.cookies.username;
      const user = data.find((user: any) => user.username === username);

      if (user) {
        const { uid, id, name, nickname, sprite, dateCaught } = req.body;

        const caughtPokemon = {
          uid,
          id,
          name,
          nickname,
          sprite,
          dateCaught,
        };

        user.myPokemon.push(caughtPokemon);

        fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));

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
