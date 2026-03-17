import * as sseService from "../services/sseService.js";

export const uploadAvatar = (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });

  sseService.broadcast(req.file.filename);
  res.status(201).json({ url: `/uploads/${req.file.filename}` });
};

export const uploadGallery = (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ error: "No files uploaded" });
  }

  const urls = req.files.map((file) => {
    sseService.broadcast(file.filename);
    return `/uploads/${file.filename}`;
  });

  res.status(201).json({ urls });
};

export const streamEvents = (req, res) => {
  sseService.addClient(req, res);
};
