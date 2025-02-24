import express from "express";
import logger from "morgan";
import cors from "cors";
import helmet from "helmet";

import { HttpCode, LIMIT_JSON } from "./lib/constants";

import contactsRouter from "./routes/api/contacts/index";
import authRouter from "./routes/api/users/index";

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(helmet());
app.use(logger(formatsLogger));

app.use(cors());
app.use(express.json({ limit: LIMIT_JSON }));

app.use("/api/users", authRouter);
app.use("/api/contacts", contactsRouter);

app.use((_req, res) => {
  res.status(HttpCode.NOT_FOUND).json({
    status: "error",
    code: HttpCode.NOT_FOUND,
    message: "Not found",
  });
});

app.use((err, _req, res, _next) => {
  res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
    status: "fail",
    code: HttpCode.INTERNAL_SERVER_ERROR,
    message: err.message,
  });
});

export default app;
