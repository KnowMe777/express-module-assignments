import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/database.js";
import bookRoutes from "./routes/bookRoutes.js";
import errorHandler from "./middlewares/errorHandler.js";
import logger from "./middlewares/logger.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// middlewares
app.use(express.json());
app.use(logger);

// database connection
connectDB();

app.use("/api/books", bookRoutes);

// errorHandler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 Server is live on http://localhost:${PORT}`);
});
