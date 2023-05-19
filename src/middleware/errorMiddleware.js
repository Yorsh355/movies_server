const errorMiddleware = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  const error = {
    status: statusCode,
    message: message,
  };
  console.error(err);
  res.status(statusCode).json(error);
};

module.exports = errorMiddleware;
