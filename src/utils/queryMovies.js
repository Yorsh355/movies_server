const checkExistingMovie = async (
  pool,
  titulo,
  director,
  anio,
  genero,
  descripcion
) => {
  const query = {
    text: "SELECT * FROM movies WHERE LOWER(titulo) = LOWER($1) AND LOWER(director) = LOWER($2) AND anio = $3 AND LOWER(genero) = LOWER($4) AND LOWER(descripcion) = LOWER($5)",
    values: [titulo, director, anio, genero, descripcion],
  };

  const existingMovie = await pool.query(query);
  return existingMovie.rows.length > 0;
};

const insertMovie = async (
  pool,
  titulo,
  director,
  anio,
  genero,
  descripcion
) => {
  const query = {
    text: `
      INSERT INTO movies (titulo, director, anio, genero, descripcion)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `,
    values: [titulo, director, anio, genero, descripcion],
  };

  const response = await pool.query(query);
  const movie = response.rows[0];
  return movie;
};

const updateMovieById = async (
  pool,
  id,
  titulo,
  director,
  anio,
  genero,
  descripcion
) => {
  const query = {
    text: `
      UPDATE movies
      SET titulo = $1, director = $2, anio = $3, genero = $4, descripcion = $5
      WHERE id_movie = $6
      RETURNING *
    `,
    values: [titulo, director, anio, genero, descripcion, id],
  };

  const response = await pool.query(query);
  const updatedMovie = response.rows[0];
  return updatedMovie;
};

//función para verificar si la pelicula existe id
const checkMovieExists = async (pool, movieId) => {
  const movieExistsQuery = "SELECT * FROM movies WHERE id_movie = $1";
  const movieExistsResult = await pool.query(movieExistsQuery, [movieId]);
  return movieExistsResult.rowCount > 0;
};

module.exports = {
  checkExistingMovie,
  insertMovie,
  updateMovieById,
  checkMovieExists,
};
