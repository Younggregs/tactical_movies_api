import { Request, Response } from "express";
import Movie from "../models/movie";

function create(req: Request, res: Response) {
  const { title, publishingYear, imageUrl } = req.body;

  Movie.create({ title, publishingYear, imageUrl })
    .then((movie) => {
      res.status(201).json(movie);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error creating the movie");
    });
}

function getAll(req: Request, res: Response) {
  const limit = Number(req.query.limit) || 8; // default limit to 10 items
  const page = Number(req.query.page) || 1; // default to page 1
  const offset = (page - 1) * limit;

  Movie.findAndCountAll({
    limit,
    offset,
    order: [["createdAt", "DESC"]],
  })
    .then((movies) => {
      const totalPages = Math.ceil(movies.count / limit);
      res.status(200).json({
        data: movies.rows,
        meta: {
          totalItems: movies.count,
          totalPages: totalPages,
          page,
          limit,
        },
      });
    })
    .catch((error) => {
      console.error("Error fetching movies:", error);
      res.status(500).json({ error: error });
    });
}

function getById(req: Request, res: Response) {
  const id = req.params.id;
  Movie.findByPk(id)
    .then((movie) => {
      if (movie) {
        res.status(200).json(movie);
      } else {
        res.status(404).send("ID not found");
      }
    })
    .catch((error) => {
      console.error("Error fetching movie by id:", error);
      res.status(404).send("ID not found");
    });
}

function updateOne(req: Request, res: Response) {
  const id = req.params.id;
  const { title, publishingYear, imageUrl } = req.body;

  Movie.update({ title, publishingYear, imageUrl }, { where: { id } })
    .then((movie) => {
      if (movie[0]) {
        res.status(200).json(movie);
      } else {
        res.status(404).send("ID not found");
      }
    })
    .catch((error) => {
      console.error("Error updating movie:", error);
      res.status(500).send("Error updating movie");
    });
}

function deleteOne(req: Request, res: Response) {
  const id = req.params.id;

  Movie.destroy({ where: { id } })
    .then((movie) => {
      if (movie) {
        res.status(200).json(movie);
      } else {
        res.status(404).send("ID not found");
      }
    })
    .catch((error) => {
      console.error("Error deleting movie:", error);
      res.status(500).send("Error deleting movie");
    });
}

export default { create, getAll, getById, updateOne, deleteOne };
