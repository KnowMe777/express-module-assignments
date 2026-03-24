import Book from "./bookSchema.js";

// GET all books
export const findAll = async (page = 1, limit = 10) => {
  const skip = (page - 1) * limit;

  const [books, total] = await Promise.all([
    Book.find().skip(skip).limit(limit),
    Book.countDocuments(),
  ]);

  return {
    data: books,
    total,
    page,
    pages: Math.ceil(total / limit),
  };
};

// GET book by id
export const findById = async (id) => {
  return await Book.findById(id);
};

// CREATE book
export const create = async (data) => {
  return await Book.create(data);
};

// UPDATE a book
export const update = async (id, data) => {
  return await Book.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
};

// DELETE book
export const destroy = async (id) => {
  return await Book.findByIdAndDelete(id);
};
