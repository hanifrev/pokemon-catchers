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
        const group = req.body.theCoins;
        const coins = group == 75 ? 75 : group == 150 ? 150 : 600;

        user.coins += coins;

        fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));

        return res.status(200).json({ message: "Coins updated successfully" });
      } else {
        return res.status(400).json({ error: "User not found" });
      }
    } catch (error) {
      console.error("Error while updating coins:", error);
      return res.status(500).json({ error: "Error while updating coins" });
    }
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}
