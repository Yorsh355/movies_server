const express = require("express");
const router = express.Router();

const {
  createFavorite,
  deleteFavorite,
  getFavorites,
} = require("../controllers/favorites");

router.get("/", getFavorites);
router.put("/:id", createFavorite);
router.delete("/:id", deleteFavorite);

module.exports = router;
