import express from "express";
import bookRoutes from "./routes/bookRoutes.js";
import errorHandler from "./middleware/errorHandler.js";
import path from "path";
import { fileURLToPath } from "url";
import Books from "./Books.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/books", bookRoutes);

app.get("/books", (req, res) => {
  try {
    res.render("books", { books: Books });
  } catch (err) {
    res.status(500).send("Error rendering books page");
  }
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
