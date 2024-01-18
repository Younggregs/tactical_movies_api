import express from "express";
import movieController from "../controllers/movie";
import authenticateToken from "../middleware/authenticationToken";
const router = express.Router();

router
  .post("/", authenticateToken, movieController.create)
  .get("/", authenticateToken, movieController.getAll);
router
  .get("/:id", authenticateToken, movieController.getById)
  .put("/:id", authenticateToken, movieController.updateOne)
  .delete("/:id", authenticateToken, movieController.deleteOne);

export default router;
