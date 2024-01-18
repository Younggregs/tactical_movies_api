import express from "express";
import userController from "../controllers/user";
import authenticateToken from "../middleware/authenticationToken";
const router = express.Router();

router
  .post("/", userController.create)
  .get("/", authenticateToken, userController.getAll);
router.get("/:id", authenticateToken, userController.getById);

export default router;
