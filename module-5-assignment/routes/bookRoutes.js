import Books from "../Books.js";
import express from "express";
import asyncHandler from "../middleware/asyncHandler.js";
import { body, validationResult } from "express-validator";

const bookValidation = [
  body("title").notEmpty().withMessage("Title is required"),
  body("author").notEmpty().withMessage("Author is required"),
  body("genre").notEmpty().withMessage("Genre is required"),
  body("year")
    .notEmpty()
    .withMessage("Year is required")
    .bail()
    .isInt()
    .withMessage("Year must be an integer"),
  body("pages")
    .notEmpty()
    .withMessage("Pages is required")
    .bail()
    .isInt({ min: 1 })
    .withMessage("Pages must be a positive integer"),
];

const router = express.Router();

// GET all books filtered and sorted
router.get(
  "/",
  asyncHandler((req, res) => {
    let results = [...Books];
    const { author, genre, year, sort, page = 1, limit = 5 } = req.query;

    if (author) {
      results = results.filter((b) =>
        b.author.toLowerCase().includes(author.toLowerCase()),
      );
    }
    if (genre) {
      results = results.filter(
        (b) => b.genre.toLowerCase() === genre.toLowerCase(),
      );
    }
    if (year) {
      results = results.filter((b) => b.year === parseInt(year));
    }
    if (sort) {
      results.sort((a, b) => {
        if (sort === "year") return a.year - b.year;
        if (sort === "title") return a.title.localeCompare(b.title);
        return 0;
      });
    }

    const pageNum = parseInt(page) || 1;
    const limitNum = parseInt(limit) || 5;
    const total = results.length;
    const totalPages = Math.ceil(total / limitNum);

    const startIndex = (pageNum - 1) * limitNum;
    const endIndex = startIndex + limitNum;
    const paginatedResults = results.slice(startIndex, endIndex);

    return res.status(200).json({
      success: true,
      count: paginatedResults.length,
      pagination: {
        total,
        page: pageNum,
        totalPages,
        limit: limitNum,
      },
      data: paginatedResults,
    });
  }),
);

// GET book by id
router.get(
  "/:id",
  asyncHandler((req, res) => {
    const bookId = parseInt(req.params.id);
    const book = Books.find((book) => bookId === book.id);
    if (!book) {
      return res.status(404).json({
        success: false,
        message: `Book with id ${bookId} not found`,
      });
    }
    return res.json({
      success: true,
      data: book,
    });
  }),
);

// POST a new book
router.post(
  "/",
  bookValidation,
  asyncHandler((req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const { title, author, year, genre, pages } = req.body;
    const newId = Math.max(...Books.map((b) => b.id), 0) + 1;
    const newBook = { id: newId, title, author, year, genre, pages };
    Books.push(newBook);
    return res.status(201).json({
      success: true,
      message: "New book created successfully",
      data: newBook,
    });
  }),
);

// PUT Update an existing book
router.put(
  "/:id",
  bookValidation,
  asyncHandler((req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }
    const bookId = parseInt(req.params.id);
    const book = Books.find((book) => bookId === book.id);
    if (!book) {
      return res.status(404).json({
        success: false,
        message: `Book with id ${bookId} not found`,
      });
    }
    const { title, author, year, genre, pages } = req.body;
    book.title = title;
    book.author = author;
    book.year = year;
    book.genre = genre;
    book.pages = pages;
    return res.status(201).json({
      success: true,
      message: `Book with id ${bookId} updated successfully`,
      data: book,
    });
  }),
);

// PATCH a book
router.patch(
  "/:id",
  asyncHandler((req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }
    const bookId = parseInt(req.params.id);
    const book = Books.find((book) => bookId === book.id);
    if (!book) {
      return res.status(404).json({
        success: false,
        message: `Book with id ${bookId} not found`,
      });
    }
    const { title, author, year, genre, pages } = req.body;
    if (title !== undefined) book.title = title;
    if (author !== undefined) book.author = author;
    if (year !== undefined) book.year = year;
    if (genre !== undefined) book.genre = genre;
    if (pages !== undefined) book.pages = pages;
    return res.status(200).json({
      success: true,
      message: `Book with id ${bookId} patched successfully`,
      data: book,
    });
  }),
);

// DELETE a boook
router.delete(
  "/:id",
  asyncHandler((req, res) => {
    const bookId = parseInt(req.params.id);
    const bookIndex = Books.findIndex((b) => b.id === bookId);
    if (bookIndex === -1) {
      return res.status(404).json({
        success: false,
        message: `Book with id ${bookId} not found`,
      });
    }
    Books.splice(bookIndex, 1);
    return res.status(200).json({
      success: true,
      message: `Book with id ${bookId} deleted successfully`,
    });
  }),
);

export default router;
