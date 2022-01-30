import { Router } from "express";
import authControllers from "../../../controllers/auth/index";
import guard from "../../../middlewares/guard";
import { upload } from "../../../middlewares/upload";
import userControllers from "../../../controllers/users";
// import limiter from "../../../middlewares/rate-limit";

const router = new Router();

router.post("/signup", authControllers.signup);
router.post("/login", authControllers.login);
router.post("/logout", guard, authControllers.logout);
router.get("/current", guard, authControllers.current);

router.patch(
  "/avatar",
  guard,
  upload.single("avatarURL"),
  userControllers.uploadAvatar
);

router.get("/verify/:token", userControllers.verifyUser);
router.post("/verify", userControllers.repeatEmailForVerifyUser);

export default router;

// limiter(15 * 60 * 1000, 2),
