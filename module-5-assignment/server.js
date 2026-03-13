import express from "express";
import bookRoutes from "./routes/bookRoutes.js";
import errorHandler from "./middleware/errorHandler.js";

const app = express();
const PORT = 3000;
app.use(express.json());

app.use("/api/books", bookRoutes);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost${PORT}`);
});
