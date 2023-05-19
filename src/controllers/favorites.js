const pool = require("../../config/db");

const getFavorites = async (req, res, next) => {
  try {
    // Consulta para obtener todos los favoritos
    const favoritesQuery = `
      SELECT movies.*, favorites.added_date
      FROM movies
      INNER JOIN favorites ON movies.id_movie = favorites.id_movie
    `;
    const favoritesResult = await pool.query(favoritesQuery);

    // Verifica si existen favoritos
    if (favoritesResult.rowCount === 0) {
      return res.status(404).json({ message: "No se encontraron favoritos." });
    }

    // Formatea los resultados de la consulta
    const favorites = favoritesResult.rows.map((row) => ({
      id_movie: row.id_movie,
      titulo: row.titulo,
      genero: row.genero,
      director: row.director,
      anio: row.anio,
      favorita: row.favorita,
      descripcion: row.descripcion,
      added_date: row.added_date,
    }));

    return res.status(200).json({ favorites });
  } catch (error) {
    // Pasa el error al siguiente middleware de manejo de errores
    return next(error);
  }
};

const createFavorite = async (req, res, next) => {
  // Ruta PUT para agregar una película a favoritos
  try {
    const movieId = parseInt(req.params.id);

    // Verifica si la película ya existe en la base de datos
    const movieExistsQuery = "SELECT * FROM movies WHERE id_movie = $1";
    const movieExistsResult = await pool.query(movieExistsQuery, [movieId]);

    if (movieExistsResult.rowCount === 0) {
      return res.status(404).json({ message: "La película no existe." });
    }

    // Verifica si la película ya está en la tabla de favoritos
    const isFavoriteQuery = "SELECT * FROM favorites WHERE id_movie = $1";
    const isFavoriteResult = await pool.query(isFavoriteQuery, [movieId]);

    if (isFavoriteResult.rowCount === 0) {
      // Si no está en la tabla de favoritos, la agrega
      const addFavoriteQuery =
        "INSERT INTO favorites (id_movie, added_date) VALUES ($1, NOW())";
      await pool.query(addFavoriteQuery, [movieId]);

      // Actualiza el estado de la película a "true" en la tabla "movies"
      const updateMovieQuery =
        "UPDATE movies SET favorita = true WHERE id_movie = $1";
      await pool.query(updateMovieQuery, [movieId]);

      return res
        .status(200)
        .json({ message: "Película agregada a favoritos." });
    } else {
      return res
        .status(400)
        .json({ message: "La película ya está en favoritos." });
    }
  } catch (error) {
    // Pasa el error al siguiente middleware de manejo de errores
    return next(error);
  }
};

const deleteFavorite = async (req, res, next) => {
  try {
    const movieId = parseInt(req.params.id);

    // Verifica si la película está en la tabla de favoritos
    const isFavoriteQuery = "SELECT * FROM favorites WHERE id_movie = $1";
    const isFavoriteResult = await pool.query(isFavoriteQuery, [movieId]);

    if (isFavoriteResult.rowCount === 0) {
      return res
        .status(404)
        .json({ message: "La película no está en favoritos." });
    }

    // Elimina la película de la tabla de favoritos
    const removeFavoriteQuery = "DELETE FROM favorites WHERE id_movie = $1";
    await pool.query(removeFavoriteQuery, [movieId]);

    // Actualiza el estado de la película a "false" en la tabla "movies"
    const updateMovieQuery =
      "UPDATE movies SET favorita = false WHERE id_movie = $1";
    await pool.query(updateMovieQuery, [movieId]);

    return res
      .status(200)
      .json({ message: "Película eliminada de favoritos." });
  } catch (error) {
    // Pasa el error al siguiente middleware de manejo de errores
    return next(error);
  }
};

module.exports = {
  getFavorites,
  createFavorite,
  deleteFavorite,
};
