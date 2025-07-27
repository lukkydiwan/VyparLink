export const notFound = (req, res, next) =>
  res.status(404).json({ message: `Not Found – ${req.originalUrl}` });

export const errorHandler = (err, req, res, _next) => {
  console.error(err);
  res.status(err.statusCode || 500).json({
    message: err.message || 'Server Error',
  });
};
