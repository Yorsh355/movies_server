// Almacena consultar todos los favoritos
const getFavoritesQuery = `
  SELECT movies.*, favorites.added_date
  FROM movies
  INNER JOIN favorites ON movies.id_movie = favorites.id_movie
`;

//función para verificar si la peliculña esta en favoritos
const checkMovieFavorite = async (pool, movieId) => {
  const isFavoriteQuery = "SELECT * FROM favorites WHERE id_movie = $1";
  const isFavoriteResult = await pool.query(isFavoriteQuery, [movieId]);
  return isFavoriteResult.rowCount > 0;
};

//Funcion para adicionar a favoritos
const addMovieFavorites = async (pool, movieId) => {
  const addFavoriteQuery =
    "INSERT INTO favorites (id_movie, added_date) VALUES ($1, NOW())";
  await pool.query(addFavoriteQuery, [movieId]);

  const updateMovieQuery =
    "UPDATE movies SET favorita = true WHERE id_movie = $1";
  await pool.query(updateMovieQuery, [movieId]);
};

// Función para eliminar una película de favoritos
const removeMovieFavorites = async (pool, movieId) => {
  const removeFavoriteQuery = "DELETE FROM favorites WHERE id_movie = $1";
  await pool.query(removeFavoriteQuery, [movieId]);
};

// Función para actualizar el estado de una película a "false" en la tabla "movies"
const updateMovieStatus = async (pool, movieId) => {
  const updateMovieQuery =
    "UPDATE movies SET favorita = false WHERE id_movie = $1";
  await pool.query(updateMovieQuery, [movieId]);
};

module.exports = {
  getFavoritesQuery,
  checkMovieFavorite,
  addMovieFavorites,
  removeMovieFavorites,
  updateMovieStatus,
};
