import express from "express";
import {
  getAll,
  getOne,
  createBook,
  updateBook,
  deleteBookById,
} from "../controllers/bookController.js";

const router = express.Router();

// GET all books
router.get("/", getAll);

// GET a book by id
router.get("/:id", getOne);

// create a new book
router.post("/", createBook);

// update a book by ID
router.put("/:id", updateBook);

// DELETE a book by ID
router.delete("/:id", deleteBookById);

export default router;
