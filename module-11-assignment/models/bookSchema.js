import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "title is required"],
    minlength: [3, "minimum 3 characters required"],
  },
  author: {
    type: String,
    required: [true, "author is required"],
  },
  year: {
    type: Number,
    required: [true, "year is required"],
    min: [1000, "year must be grater than 1000"],
    max: [new Date().getFullYear(), "year should not be in future"],
  },
  genre: {
    type: String,
    required: true,
    enum: {
      values: [
        "Fiction",
        "Non-Fiction",
        "Science",
        "History",
        "Fantasy",
        "Romance",
        "Thriller",
        "Mystery",
        "Horror",
        "Biography",
        "Self-Help",
        "Poetry",
        "Drama",
        "Adventure",
        "Comedy",
        "Philosophy",
        "Technology",
        "Children",
      ],
      message: "{VALUE} is not valid genre",
    },
  },

  pages: {
    type: Number,
    required: true,
    min: [1, "pages should be greater than 0"],
  },

  price: {
    type: Number,
    required: true,
    min: [1, "price should be greater than 0"],
  },

  inStock: {
    type: Boolean,
    default: true,
  },
});

const Book = mongoose.model("Book", bookSchema);
export default Book;
