import express from "express";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import { validateContentType } from "./middleware/validateContent.js";
import { apiKeyAuth } from "./middleware/apiKeyAuth.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { requestLogger } from "./middleware/requestLogger.js";

dotenv.config();
const app = express();
const PORT = 3000;
app.use(express.json());

app.use(helmet());
app.use(cors());
app.use(morgan("dev"));

// validating content type
app.use(validateContentType);

// logging requests
app.use(requestLogger);

// test route for error handler
app.get("/error-test", (req, res, next) => {
  next(new Error("Test error"));
});

// root GET route
app.get("/", (req, res) => {
  return res.send("this is the main route");
});

// root POST route
app.post("/", (req, res) => {
  return res.status(201).json({
    success: true,
    message: "Valid JSON received successfully!",
    data: req.body,
  });
});

// root PUT route
app.put("/", (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Valid JSON updated successfully!",
    data: req.body,
  });
});

// using apiKeyAuth on protected route
app.get("/api/protected", apiKeyAuth, (req, res) => {
  return res.send("you passed the validation");
});

// global error handling
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
