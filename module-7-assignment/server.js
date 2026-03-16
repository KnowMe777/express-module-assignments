import express from "express";
import booksRouter from "./routes/bookRoutes.js";

const app = express();
app.use(express.json());

app.use("/api/books", booksRouter);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res
    .status(500)
    .json({ message: "Internal Server Error", error: err.message });
});

const PORT = 3000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`),
);
