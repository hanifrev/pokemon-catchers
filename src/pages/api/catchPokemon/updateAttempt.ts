import fs from "fs";
import path from "path";
import { NextApiRequest, NextApiResponse } from "next";

const dbPath = path.resolve("./db.json");

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const rawData = fs.readFileSync(dbPath, "utf-8");
      const data = JSON.parse(rawData);

      // console.log(req.cookies.username);

      const username = req.cookies.username;
      // console.log(username);

      const userIndex = data.findIndex(
        (user: any) => user.username === username
      );

      // console.log("Data Array:", data);

      if (userIndex !== -1) {
        data[userIndex].attempt += 1;

        fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));

        return res
          .status(200)
          .json({ message: "Attempt updated successfully" });
      } else {
        return res.status(400).json({ error: "User not found" });
      }
    } catch (error) {
      console.error("Error while updating attempt:", error);
      return res.status(500).json({ error: "Error while updating attempt" });
    }
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}
