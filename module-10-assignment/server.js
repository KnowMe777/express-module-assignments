import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import multer from "multer";
import apiRoutes from "./routes/apiRoutes.js";

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// serve static files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api", apiRoutes);

// global errrorHandler
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    const message =
      err.code === "LIMIT_FILE_SIZE" ? "File too large (Max 2MB)" : err.message;
    return res.status(400).json({ error: message });
  } else if (err) {
    return res.status(400).json({ error: err.message });
  }
  next();
});

const PORT = 3000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`),
);
