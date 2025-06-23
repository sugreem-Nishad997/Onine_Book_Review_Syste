import { Book } from "../models/book_model.js"
import httpStatus from 'http-status'
const getBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getBookById = async (req, res) => {
    try {
        const id = req.params.id;
        const book = await Book.findById(id);
        if (!book) {
            return res.status(httpStatus.NOT_FOUND).json({ message: "Not found", success: false });
        }
        res.status(httpStatus.OK).json({ message: "Book founded", success: true, book });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const createBook = async (req, res) => {
    console.log(req.body.genre);
        console.log("FILE:", req.file);
    try {
        console.log("inside the createBook")
        const { title, author, price, category, description, publishAt, genre } = req.body;
        const coverImageUrl = req.file?.path;

        if (!title || !author || !price || !category || !description || !publishAt || !genre || !coverImageUrl) {
            return res.status(400).json({ message: "All fields are required", success: false });
        }
        const book = await Book.create({
            title,
            author,
            price,
            category,
            description,
            publishAt,
            genre,
            coverImage: coverImageUrl,
        })
        res.status(httpStatus.CREATED).json({ message: "Book created successfully ", success: true, book });

    } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: error.message })
    }
}

export { getBookById, getBooks, createBook }