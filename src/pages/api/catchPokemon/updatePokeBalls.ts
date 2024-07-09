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
      const userIndex = data.findIndex(
        (user: any) => user.username === username
      );

      if (userIndex !== -1) {
        switch (req.body.pokeBallType) {
          case "Poke Ball":
            data[userIndex].pokeBall -= 1;
            break;
          case "Great Ball":
            data[userIndex].greatBall -= 1;
            break;
          case "Master Ball":
            data[userIndex].masterBall -= 1;
            break;
          default:
            return res.status(400).json({ error: "Invalid Poke Ball type" });
        }

        fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));

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
