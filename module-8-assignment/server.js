import express from "express";
import config from "./config/index.js";

const app = express();
app.use(express.json());

// function to validate api key from .env
function apiKeyAuth(req, res, next) {
  const apiKey = req.headers["x-api-key"];
  if (apiKey !== config.apiKey) {
    return res.status(401).json({
      success: false,
      message: "unauthorized access",
    });
  }

  next();
}

//root route
app.get("/", (req, res) => {
  return res.send("everything is good!");
});

// using apiKeyAuth on protected route
app.get("/api/protected", apiKeyAuth, (req, res) => {
  return res.send("you passed the validation");
});

const PORT = config.port;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
