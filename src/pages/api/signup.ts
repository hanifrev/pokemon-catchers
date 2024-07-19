import { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";
import bcrypt from "bcrypt";

const uri = process.env.MONGOURI as string;

const client = new MongoClient(uri);

interface User {
  username: string;
  email: string;
  password: string;
  coins: number;
  pokeBall: number;
  greatBall: number;
  masterBall: number;
  catched: number;
  attempt: number;
  myPokemon: [];
}

const signup = async (req: NextApiRequest, res: NextApiResponse) => {
  const { username, email, password }: User = req.body;
  const coins = 500;
  const pokeBall = 5;
  const greatBall = 5;
  const masterBall = 1;
  const catched = 0;
  const attempt = 0;
  const myPokemon: any = [];

  try {
    await client.connect();
    const database = client.db(process.env.DATABASE_NAME);

    if (!database) {
      throw new Error("Database is not found");
    }

    const collectionName = process.env.COLLECTION_NAME;
    console.log(collectionName);

    if (!collectionName) {
      throw new Error(
        "Collection name is not defined in environment variables."
      );
    }

    const collection = database.collection(collectionName);

    const userExists = await collection.findOne({ username });

    if (userExists) {
      return res.status(409).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser: User = {
      username,
      email,
      password: hashedPassword,
      coins,
      pokeBall,
      greatBall,
      masterBall,
      catched,
      attempt,
      myPokemon,
    };

    await collection.insertOne(newUser);

    res.status(200).json({ message: "Signup successful" });
  } catch (error) {
    console.error("Error while signing up:", error);
    res.status(500).json({ message: "Internal server error" });
  } finally {
    await client.close();
  }
};

export default signup;
