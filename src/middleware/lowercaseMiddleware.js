const convertToLowercase = (req, res, next) => {
  req.query = Object.fromEntries(
    Object.entries(req.query).map(([key, value]) => [key.toLowerCase(), value])
  );
  next();
};

module.exports = convertToLowercase;
