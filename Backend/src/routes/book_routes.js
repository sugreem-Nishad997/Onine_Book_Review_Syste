import { Router } from "express";
import { createBook, getBookById, getBooks } from "../controllers/book_controller.js";
import { adminMiddleware } from "../middleware/adminMiddleware.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { upload } from "../utils/cloudinary.js";

const router = Router();

router.route("/books").get(getBooks);
router.route("/books/:id").get(getBookById);
router.route("/books").post(authMiddleware ,adminMiddleware, upload.single("coverImage"), createBook);

export default router;