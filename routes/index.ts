import express from "express";
import { upload } from "../middleware/fileUpload";
const router = express.Router();

/* GET home page. */
router.get("/", function (req, res) {
  res.send("<p>API is live!</p>");
});

router.post("/upload", upload.single("image"), (req, res) => {
  const file = req.file;
  if (!file) {
    return res.status(400).send("Please upload a file");
  }
  res.send(file);
});
export default router;
