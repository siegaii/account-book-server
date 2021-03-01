function notFound(req, res, next) {
  res.status(404);
  const error = new Error(`404 ${req.originalUrl}`);
  next(error);
}

module.exports = {
  notFound
};
