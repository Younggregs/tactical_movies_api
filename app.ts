import express from "express";
import cors from "cors";

import indexRouter from "./routes/index";
import moviesRouter from "./routes/movies";
import authRouter from "./routes/auth";
import userRouter from "./routes/user";

const app = express();

const subPath = "/api";

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(`${subPath}/users`, userRouter);
app.use(`${subPath}/auth`, authRouter);
app.use(`${subPath}`, indexRouter);
app.use(`${subPath}/movies`, moviesRouter);
app.use("/media", express.static("media"));

export default app;
