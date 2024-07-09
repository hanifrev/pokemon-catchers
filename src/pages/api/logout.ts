import { NextApiRequest, NextApiResponse } from "next";

const logout = (_req: NextApiRequest, res: NextApiResponse) => {
  // Set the accessToken cookie to an empty value and expire it
  res.setHeader("Set-Cookie", `accessToken=; HttpOnly; Max-Age=0; Path=/`);

  res.status(200).json({ message: "Logout successful" });
};

export default logout;
