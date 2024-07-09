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
        data[userIndex].catched += 1;

        fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));

        return res
          .status(200)
          .json({ message: "Catched updated successfully" });
      } else {
        return res.status(400).json({ error: "User not found" });
      }
    } catch (error) {
      console.error("Error update catched");
      return res.status(500).json({ error: "Error while updating attempt" });
    }
  } else {
    return res.status(450).json({ error: "Method not allowed" });
  }
}
