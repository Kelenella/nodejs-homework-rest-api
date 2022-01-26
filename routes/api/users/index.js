import express from "express";
import AuthControllers from "../../../controllers/auth/index";
import guard from "../../../middlewares/guard";
import limiter from "../../../middlewares/rate-limit";

const router = express.Router();
const authControllers = new AuthControllers();

router.post("/signup", limiter(15 * 60 * 1000, 2), authControllers.signup);
router.post("/login", authControllers.login);
router.post("/logout", guard, authControllers.logout);
router.get("/current", guard, authControllers.current);

export default router;
