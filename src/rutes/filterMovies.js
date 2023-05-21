const express = require("express");
const router = express.Router();
const convertToLowercase = require("../middleware/lowercaseMiddleware");
const { filterMovies } = require("../controllers/filterMovies");

router.get("/", convertToLowercase, filterMovies);

module.exports = router;
