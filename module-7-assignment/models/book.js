// dummy data for books
const Books = [
  {
    id: 1,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    year: 1925,
    genre: "Classic",
    pages: 218,
  },
  {
    id: 2,
    title: "1984",
    author: "George Orwell",
    year: 1949,
    genre: "Dystopian",
    pages: 328,
  },
  {
    id: 3,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    year: 1960,
    genre: "Classic",
    pages: 281,
  },
  {
    id: 4,
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    year: 1937,
    genre: "Fantasy",
    pages: 310,
  },
  {
    id: 5,
    title: "Pride and Prejudice",
    author: "Jane Austen",
    year: 1813,
    genre: "Romance",
    pages: 279,
  },
  {
    id: 6,
    title: "Brave New World",
    author: "Aldous Huxley",
    year: 1932,
    genre: "Dystopian",
    pages: 268,
  },
  {
    id: 7,
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    year: 1951,
    genre: "Classic",
    pages: 214,
  },
  {
    id: 8,
    title: "Harry Potter and the Philosopher's Stone",
    author: "J.K. Rowling",
    year: 1997,
    genre: "Fantasy",
    pages: 223,
  },
  {
    id: 9,
    title: "The Da Vinci Code",
    author: "Dan Brown",
    year: 2003,
    genre: "Thriller",
    pages: 489,
  },
  {
    id: 10,
    title: "The Alchemist",
    author: "Paulo Coelho",
    year: 1988,
    genre: "Adventure",
    pages: 197,
  },
];

// function for finding all books
function findAll(books) {
  return books;
}

// funtion to get a book by id
function findById(books, id) {
  return books.find((b) => id === b.id);
}

// function to create a new book
function create(books, title, author, genre, year, pages) {
  const newBook = {
    id: books.length + 1,
    title: title,
    author: author,
    genre: genre,
    year: year,
    pages: pages,
  };

  books.push(newBook);
  return newBook;
}

// function for updating a book
function update(books, id, updatedFields) {
  const book = books.find((b) => b.id === id);
  if (book) {
    Object.assign(book, updatedFields);
    return book;
  }
  return null;
}

// function to delete a book
function deleteBook(books, id) {
  const index = books.findIndex((b) => b.id === id);
  if (index !== -1) {
    const deleted = books.splice(index, 1);
    return deleted[0];
  }
  return null;
}

export { Books, findAll, findById, create, update, deleteBook };
