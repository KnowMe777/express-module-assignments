import * as BookModel from "../models/book.js";

// GET all books
export const getBooks = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  const result = await BookModel.findAll(page, limit);

  res.json({ success: true, ...result });
};

// GET book by id
export const getBook = async (req, res) => {
  const book = await BookModel.findById(req.params.id);

  if (!book) {
    return res.status(404).json({ success: false, message: "Not found" });
  }

  res.json({ success: true, data: book });
};

// CREATE book
export const createBook = async (req, res) => {
  const book = await BookModel.create(req.body);
  res.status(201).json({ success: true, data: book });
};

// UPDATE book
export const updateBook = async (req, res) => {
  const book = await BookModel.update(req.params.id, req.body);

  if (!book) {
    return res.status(404).json({ success: false });
  }

  res.json({ success: true, data: book });
};

// DELETE book
export const deleteBook = async (req, res) => {
  const book = await BookModel.destroy(req.params.id);

  if (!book) {
    return res.status(404).json({ success: false });
  }

  res.json({ success: true });
};
