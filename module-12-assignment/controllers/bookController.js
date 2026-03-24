const BookModel = require("../models/book");

// GET all books
const getBooks = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const result = await BookModel.findAll(page, limit);

    res.json({ success: true, ...result });
  } catch (error) {
    console.error("Error in getBooks:", error.message);
    res.status(500).json({ success: false, message: "Server error." });
  }
};

// GET book by ID
const getBook = async (req, res) => {
  try {
    const book = await BookModel.findById(req.params.id);

    if (!book) {
      return res
        .status(404)
        .json({ success: false, message: "Book not found." });
    }

    res.json({ success: true, data: book });
  } catch (error) {
    console.error("Error in getBook:", error.message);
    if (error.name === "CastError") {
      return res
        .status(400)
        .json({ success: false, message: "Invalid book ID." });
    }
    res.status(500).json({ success: false, message: "Server error." });
  }
};

// CREATE book
const createBook = async (req, res) => {
  try {
    const { title, author } = req.body;

    if (!title || !author) {
      return res
        .status(400)
        .json({ success: false, message: "Title and author are required." });
    }

    const book = await BookModel.create(req.body);
    res.status(201).json({ success: true, data: book });
  } catch (error) {
    console.error("Error in createBook:", error.message);
    res.status(500).json({ success: false, message: "Server error." });
  }
};

// UPDATE book
const updateBook = async (req, res) => {
  try {
    const book = await BookModel.update(req.params.id, req.body);

    if (!book) {
      return res
        .status(404)
        .json({ success: false, message: "Book not found." });
    }

    res.json({ success: true, data: book });
  } catch (error) {
    console.error("Error in updateBook:", error.message);
    if (error.name === "CastError") {
      return res
        .status(400)
        .json({ success: false, message: "Invalid book ID." });
    }
    res.status(500).json({ success: false, message: "Server error." });
  }
};

// DELETE book
const deleteBook = async (req, res) => {
  try {
    const book = await BookModel.destroy(req.params.id);

    if (!book) {
      return res
        .status(404)
        .json({ success: false, message: "Book not found." });
    }

    res.status(204).send();
  } catch (error) {
    console.error("Error in deleteBook:", error.message);
    if (error.name === "CastError") {
      return res
        .status(400)
        .json({ success: false, message: "Invalid book ID." });
    }
    res.status(500).json({ success: false, message: "Server error." });
  }
};

module.exports = {
  getBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook,
};
