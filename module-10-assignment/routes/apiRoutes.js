import express from "express";
import upload from "../middleware/upload.js";
import * as uploadController from "../controllers/uploadController.js";

const router = express.Router();

router.post(
  "/upload/avatar",
  upload.single("avatar"),
  uploadController.uploadAvatar,
);
router.post(
  "/upload/gallery",
  upload.array("photos", 6),
  uploadController.uploadGallery,
);
router.get("/events/uploads", uploadController.streamEvents);

export default router;
