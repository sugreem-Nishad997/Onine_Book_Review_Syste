import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { addReview, getReviewByBook } from "../controllers/review_controller.js";

const router = Router();

router.route("/reviews/:id").get(getReviewByBook);
router.route("/reviews/:id").post(authMiddleware, addReview)


export default router;