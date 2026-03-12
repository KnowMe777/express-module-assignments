import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());

// GET /inspect route
app.get("/inspect", (req, res) => {
  return res.json({
    method: req.method,
    url: req.url,
    headers: req.headers,
    IPAddress: req.ip,
    timeStamp: new Date().toString(),
  });
});

// POST /echo route
app.post("/echo", (req, res) => {
  if (!req.body) {
    return res.status(400).json({
      message: "Request body is empty",
    });
  }

  return res.json({
    message: "success",
    data: req.body,
  });
});

//  GET /users/:id route
app.get("/users/:id", (req, res) => {
  const id = req.params.id;
  if (isNaN(Number(id))) {
    return res.status(400).json({ message: "id must be number" });
  }

  if (Number(id) && id > 100) {
    return res
      .status(404)
      .json({ message: "id should be less than or equal to 100" });
  }

  return res.status(200).json({
    name: "John",
    age: 25,
  });
});

// GET /redirect-me route
app.get("/redirect-me", (req, res) => {
  return res.redirect(301, "/inspect");
});

//  GET /download-sample route
app.get("/download-sample", (req, res) => {
  const filePath = path.join(__dirname, "sample.txt");
  return res.sendFile(filePath);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
