import {
  Books,
  findAll,
  findById,
  create,
  update,
  deleteBook,
} from "../models/book.js";

function getAll(req, res, next) {
  try {
    return res.json(findAll(Books));
  } catch (error) {
    next(error);
  }
}

function getOne(req, res, next) {
  try {
    const id = Number(req.params.id);
    const book = findById(Books, id);
    if (book) {
      return res.json(book);
    } else {
      return res.status(404).json({ message: "Book not found" });
    }
  } catch (error) {
    next(error);
  }
}

function createBook(req, res, next) {
  try {
    const { title, author, genre, year, pages } = req.body;
    const newBook = create(Books, title, author, genre, year, pages);
    res.status(201).json(newBook);
  } catch (error) {
    res.status(400).json({ message: error.message });
    next(error);
  }
}

function updateBook(req, res, next) {
  try {
    const id = Number(req.params.id);
    const updatedFields = req.body;

    if (
      !updatedFields.title &&
      !updatedFields.author &&
      !updatedFields.genre &&
      !updatedFields.year &&
      !updatedFields.pages
    ) {
      return res
        .status(400)
        .json({ message: "At least one field is required to update." });
    }

    const updated = update(Books, id, updatedFields);
    if (updated) {
      res.json(updated);
    } else {
      res.status(404).json({ message: "Book not found" });
    }
  } catch (error) {
    next(error);
  }
}

function deleteBookById(req, res, next) {
  try {
    const id = Number(req.params.id);
    const deleted = deleteBook(Books, id);
    if (deleted) {
      res.json({ message: "Book deleted", book: deleted });
    } else {
      res.status(404).json({ message: "Book not found" });
    }
  } catch (error) {
    next(error);
  }
}

export { getAll, getOne, createBook, updateBook, deleteBookById };
