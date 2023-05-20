function isValidYear(year) {
  const currentYear = new Date().getFullYear();
  return year > 1800 && year <= currentYear;
}

module.exports = {
  isValidYear,
};
