export function validateContentType(req, res, next) {
  if (req.method === "POST" || req.method === "PUT") {
    const contentType = req.headers["content-type"];

    if (!contentType || !contentType.includes("application/json")) {
      return res.status(415).json({
        success: false,
        message: "unsupported media type",
      });
    }
  }
  next();
}
