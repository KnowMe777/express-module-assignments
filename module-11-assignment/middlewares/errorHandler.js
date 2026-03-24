const errorHandler = (err, req, res, next) => {
  console.error(`ERROR: ${err.message}`);

  // middleware validation errors
  if (err.validationErrors) {
    return res.status(400).json({
      success: false,
      message: err.message,
      errors: err.validationErrors,
    });
  }

  // mongoose validation error
  if (err.name === "ValidationError") {
    const messages = Object.values(err.errors).map((e) => e.message);
    return res.status(400).json({
      success: false,
      message: "Validation Failed",
      errors: messages,
    });
  }

  // mongoose bad ObjectId
  if (err.name === "CastError") {
    return res.status(400).json({
      success: false,
      message: `Invalid ID: ${err.value}`,
    });
  }

  // mongoose duplicate key
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    return res.status(409).json({
      success: false,
      message: `${field} already exists`,
    });
  }

  // default
  return res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
};

export default errorHandler;
