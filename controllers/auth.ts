import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import User from "../models/user";

function login(req: Request, res: Response) {
  const { email, password } = req.body;
  console.log("email", email, password);
  User.findOne({ where: { email } })
    .then((user) => {
      if (!user || !user.validPassword(password)) {
        return res.status(401).send({ message: "Invalid email or password" });
      }
      if (!process.env.JWT_SECRET_KEY) {
        throw new Error("JWT_SECRET_KEY must be set");
      }

      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET_KEY);
      res.send({ token });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send({ message: "Error: Invalid email or password" });
    });
}

export default { login };
