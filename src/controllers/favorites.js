const pool = require("../../config/db");
const { formatResults } = require("../utils/format");
const {
  getFavoritesQuery,
  checkMovieFavorite,
  addMovieFavorites,
  removeMovieFavorites,
  updateMovieStatus,
} = require("../utils/queryFavorites");

const { checkMovieExists } = require("../utils/queryMovies");

const getFavorites = async (req, res, next) => {
  try {
    const favoritesResponse = await pool.query(getFavoritesQuery);

    if (favoritesResponse.rowCount === 0) {
      return res.status(404).json({ message: "No se encontraron favoritos." });
    }

    const favorites = favoritesResponse.rows.map((row) => formatResults(row));

    return res.status(200).json({ favorites });
  } catch (error) {
    return next(error);
  }
};

const createFavorite = async (req, res, next) => {
  try {
    const movieId = parseInt(req.params.id);

    const movieExists = await checkMovieExists(pool, movieId);
    if (!movieExists) {
      return res.status(404).json({ message: "La película no existe." });
    }

    const isFavorite = await checkMovieFavorite(pool, movieId);
    if (isFavorite) {
      return res
        .status(400)
        .json({ message: "La película ya está en favoritos." });
    }

    await addMovieFavorites(pool, movieId);

    return res.status(200).json({ message: "Película agregada a favoritos." });
  } catch (error) {
    return next(error);
  }
};

const deleteFavorite = async (req, res, next) => {
  try {
    const movieId = parseInt(req.params.id);

    const isFavorite = await checkMovieFavorite(pool, movieId);
    if (!isFavorite) {
      return res
        .status(404)
        .json({ message: "La película no está en favoritos." });
    }

    await removeMovieFavorites(pool, movieId);
    await updateMovieStatus(pool, movieId);

    return res
      .status(200)
      .json({ message: `Película ${movieId} fué eliminada de favoritos.` });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getFavorites,
  createFavorite,
  deleteFavorite,
};
