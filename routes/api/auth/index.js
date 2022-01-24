import express from "express";
import { registration, login, logout } from "../../../controllers/auth";
import guard from "../../../middlewares/guard";

const router = express.Router();

router.post("/registration", registration);
router.post("/login", login);
router.post("/logout", guard, logout);

export default router;
