import fs from "fs";
import path from "path";
import { NextApiRequest, NextApiResponse } from "next";

const dbPath = path.resolve("./db.json");

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const rawData = fs.readFileSync(dbPath, "utf-8");
      const data = JSON.parse(rawData);

      // Get the username from the query parameters
      const username = req.cookies.username;

      const user = data.find((user: any) => user.username === username);

      if (user) {
        return res.status(200).json(user);
      } else {
        return res.status(404).json({ error: "User not found" });
      }
    } catch (error) {
      console.error("Error while reading data:", error);
      return res.status(500).json({ error: "Error while reading data" });
    }
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}
