import { Request, Response } from "express";
import User from "../models/user";

function create(req: Request, res: Response) {
  const { firstName, lastName, email, password } = req.body;
  User.create({ firstName, lastName, email, password })
    .then((user) => {
      res.status(201).json(user);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error creating the user");
    });
}

function getAll(req: Request, res: Response) {
  User.findAll()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((error) => {
      console.error("Error fetching trades:", error);
      res.status(500).json({ error: error });
    });
}

function getById(req: Request, res: Response) {
  const id = req.params.id;
  User.findByPk(id)
    .then((user) => {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).send("ID not found");
      }
    })
    .catch((error) => {
      console.error("Error fetching user by id:", error);
      res.status(404).send("ID not found");
    });
}

export default { create, getAll, getById };
