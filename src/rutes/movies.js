const express = require("express");
const router = express.Router();

const {
  getMovies,
  createMovies,
  getMovieById,
  deleteMovie,
  updateMovie,
} = require("../controllers/movies");

router.get("/", getMovies);
router.get("/:id", getMovieById);
router.post("/", createMovies);
router.delete("/:id", deleteMovie);
router.put("/:id", updateMovie);

module.exports = router;
