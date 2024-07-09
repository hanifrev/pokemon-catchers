import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";

const dbPath = "db.json";

type User = {
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
};

const signup = (req: NextApiRequest, res: NextApiResponse) => {
  const { username, email, password }: User = req.body;
  const coins = 500;
  const pokeBall = 5;
  const greatBall = 5;
  const masterBall = 1;
  const catched = 0;
  const attempt = 0;
  const myPokemon: any = [];

  let users: User[] = [];
  if (fs.existsSync(dbPath)) {
    const dbData = fs.readFileSync(dbPath, "utf-8");
    users = JSON.parse(dbData);
  }

  const userExists = users.find((user) => user.username === username);
  if (userExists) {
    return res.status(409).json({ message: "User already exists" });
  }

  const newUser: User = {
    username,
    email,
    password,
    coins,
    pokeBall,
    greatBall,
    masterBall,
    catched,
    attempt,
    myPokemon,
  };
  users.push(newUser);

  fs.writeFileSync(dbPath, JSON.stringify(users));

  res.status(200).json({ message: "Signup successful" });
};

export default signup;
