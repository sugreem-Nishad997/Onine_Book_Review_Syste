import { Router } from "express";
import { getUserProfile, login, register, updateProfile } from "../controllers/user_controller.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = Router();

router.route("/users/register").post(register);
router.route("/users/login").post(login);
router.route("/users/:id").get(authMiddleware,getUserProfile);
router.route("/users/:id").post(authMiddleware,updateProfile);


export default router;