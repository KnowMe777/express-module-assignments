import express from "express";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import protect from "../middleware/protect.js";
import authorize from "../middleware/authorize.js";
import users from "../data/Users.js";
import blacklist from "../data/tokenBlacklist.js";

dotenv.config();
const router = express.Router();

// post route for registering the user
router.post("/register", async (req, res, next) => {
  try {
    const { username, email, password, role } = req.body;

    const existingUser = users.find((u) => u.email === email);

    if (existingUser) {
      return res.status(400).json({
        message: `User with email ${email} already exists`,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const id = users.length > 0 ? users[users.length - 1].id + 1 : 1;

    const newUser = {
      id,
      username: username,
      email: email,
      password: hashedPassword,
      role: role,
    };

    users.push(newUser);
    const { password: omittedPassword, ...safeUser } = newUser;

    return res.status(201).json({
      message: "new user created successfully",
      data: safeUser,
    });
  } catch (error) {
    next(error);
  }
});

// login route
router.post("/login", async (req, res, next) => {
  console.log("Current users in memory:", users);
  try {
    const { email, password } = req.body;

    const user = users.find((u) => u.email === email);
    if (!user) {
      return res
        .status(400)
        .json({ messsge: `user with email ${email} not found` });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ messsge: "invalid credentials" });
    }

    const payload = { id: user.id, email: user.email, role: user.role };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "15m",
    });

    return res.json({ token });
  } catch (error) {
    next(error);
  }
});

// protected route
router.get("/me", protect, (req, res) => {
  const { password, ...safeUser } = req.user;
  return res.json({
    message: "current user",
    data: safeUser,
  });
});

// accessible only by Admin
router.get("/admin", protect, authorize("admin"), (req, res) => {
  res.json({ message: "Welcome, Admin. You have access to the dashboard." });
});

// accessible by both Admin and User
router.get("/shared", protect, authorize("user", "admin"), (req, res) => {
  res.json({ message: "This route is visible to both Users and Admins." });
});

// logout route
router.post("/logout", protect, (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  blacklist.add(token);
  return res.json({ message: "Logged out successfully" });
});
export default router;
