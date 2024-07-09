import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import crypto from "crypto";
import Cookies from "js-cookie";

const dbPath = "db.json";

type User = {
  accessToken: string;
  username: string;
  password: string;
};

const generateAccessToken = () => {
  return crypto.randomBytes(32).toString("hex");
};

const login = (req: NextApiRequest, res: NextApiResponse) => {
  const { username, password }: User = req.body;

  // Read the existing users from db.json
  if (fs.existsSync(dbPath)) {
    const dbData = fs.readFileSync(dbPath, "utf-8");
    const users: User[] = JSON.parse(dbData);

    // Find the user in the list
    const user = users.find(
      (user) => user.username === username && user.password === password
    );

    if (user) {
      const accessToken = generateAccessToken();
      user.accessToken = accessToken;
      fs.writeFileSync(dbPath, JSON.stringify(users));
      res.setHeader(
        "Set-Cookie",
        `accessToken=${accessToken}; HttpOnly; Max-Age=${
          60 * 60 * 24 * 7
        }; Path=/`
      );
      Cookies.set("username", username);
      res.status(200).json({ message: "Login successful", accessToken });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
};

export default login;
