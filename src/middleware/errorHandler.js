// Centralized error handling middleware
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  // Handle specific error types
  if (err.name === "ValidationError") {
    return res.status(400).json({
      status: 400,
      message: "Validation Error",
      errors: err.details.map((detail) => detail.message),
    });
  }

  if (err.code === "23505") {
    // PostgreSQL unique violation
    return res.status(409).json({
      status: 409,
      message: "Resource already exists",
      error: err.detail,
    });
  }

  // Default error
  res.status(err.status || 500).json({
    status: err.status || 500,
    message: err.message || "Internal Server Error",
    error: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
};

export default errorHandler;
