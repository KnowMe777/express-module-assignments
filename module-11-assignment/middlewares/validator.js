const validateBook = (req, res, next) => {
  const { title, author, year, genre, pages, price } = req.body;

  let errors = [];

  if (!title) errors.push("Title is required");
  if (!author) errors.push("Author is required");
  if (year === undefined || year === null) errors.push("Year is required");
  if (!genre) errors.push("Genre is required");
  if (pages === undefined || pages === null) errors.push("Pages is required");
  if (price === undefined || price === null) errors.push("Price is required");

  if (title && typeof title !== "string") errors.push("Title must be a string");
  if (author && typeof author !== "string")
    errors.push("Author must be a string");
  if (genre && typeof genre !== "string") errors.push("Genre must be a string");
  if (year != null && typeof year !== "number")
    errors.push("Year must be a number");
  if (pages != null && typeof pages !== "number")
    errors.push("Pages must be a number");
  if (price != null && typeof price !== "number")
    errors.push("Price must be a number");

  if (errors.length > 0) {
    const error = new Error("Validation Failed");
    error.status = 400;
    error.validationErrors = errors;
    return next(error);
  }

  next();
};

export default validateBook;
