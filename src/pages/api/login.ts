import { NextApiRequest, NextApiResponse } from "next";
import crypto from "crypto";
import Cookies from "cookies";
import bcrypt from "bcrypt";
import { MongoClient } from "mongodb";

const uri = process.env.MONGOURI as string;

const client = new MongoClient(uri);

type User = {
  accessToken: string;
  username: string;
  password: string;
};

const generateAccessToken = () => {
  return crypto.randomBytes(32).toString("hex");
};

const login = async (req: NextApiRequest, res: NextApiResponse) => {
  const { username, password }: User = req.body;

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

    const collection = database.collection(collectionName);

    const user = await collection.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const accessToken = generateAccessToken();
    await collection.updateOne({ username }, { $set: { accessToken } });

    const cookies = new Cookies(req, res);
    cookies.set("accessToken", accessToken, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7 * 1000, // 7 days in milliseconds
      path: "/",
    });
    cookies.set("username", username, {
      maxAge: 60 * 60 * 24 * 7 * 1000, // 7 days in milliseconds
      path: "/",
    });

    res
      .status(200)
      .json({ message: "Login successful", accessToken, username });
  } catch (error) {
    console.error("Error while logging in:", error);
    res.status(500).json({ message: "Internal server error" });
  } finally {
    await client.close();
  }
};

export default login;
