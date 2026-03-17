import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import blacklist from "../data/tokenBlacklist.js";

dotenv.config();

export default function protect(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res
      .status(401)
      .json({ message: "missing or invalid authorization header" });
  }

  const [schema, token] = authHeader.split(" ");

  if (schema !== "Bearer" || !token) {
    return res
      .status(401)
      .json({ message: "missing or invalid authorization header" });
  }

  if (blacklist.has(token)) {
    return res
      .status(401)
      .json({ message: "Token has been invalidated. Please log in again." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id, email: decoded.email, role: decoded.role };
    next();
  } catch (error) {
    next(error);
  }
}
