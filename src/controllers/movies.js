const pool = require("../../config/db");
const { movieSchema } = require("../utils/validation");
const {
  checkExistingMovie,
  insertMovie,
  updateMovieById,
  checkMovieExists,
} = require("../utils/queryMovies");

const getMovies = async (req, res, next) => {
  try {
    const response = await pool.query("SELECT * FROM movies");
    res.status(200).json(response.rows);
  } catch (error) {
    next(error);
  }
};

const getMovieById = async (req, res, next) => {
  const id = req.params.id;
  try {
    const response = await pool.query(
      "SELECT * FROM movies WHERE id_movie = $1",
      [id]
    );
    if (response.rows.length === 0) {
      const error = new Error("Movie not found");
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json(response.rows);
  } catch (error) {
    next(error); // pasa el error al middleware
  }
};

const createMovies = async (req, res, next) => {
  try {
    const { error } = movieSchema.validate(req.body);

    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    const { titulo, director, anio, genero, descripcion } = req.body;

    // Verificar si la película ya existe
    const movieAlreadyExists = await checkExistingMovie(
      pool,
      titulo,
      director,
      anio,
      genero,
      descripcion
    );

    if (movieAlreadyExists) {
      return res.status(409).json({
        message: "La película ya existe",
      });
    }

    // Insertar la nueva película
    const movie = await insertMovie(
      pool,
      titulo,
      director,
      anio,
      genero,
      descripcion
    );

    res.status(201).json({
      message: "Película creada correctamente",
      data: movie,
    });
  } catch (error) {
    next(error);
  }
};

const deleteMovie = async (req, res, next) => {
  const id = req.params.id;
  if (isNaN(id)) {
    return res.status(400).json({ message: "El ID debe ser un número válido" });
  }
  try {
    const response = await pool.query(
      "DELETE FROM movies WHERE id_movie = $1",
      [id]
    );
    console.log(response);
    if (response.rowCount === 0) {
      return res.status(404).json({ message: "La película no existe" });
    }
    res
      .status(200)
      .json({ message: `Película ${id} eliminada satisfactoriamente` });
  } catch (error) {
    next(error);
  }
};

const updateMovie = async (req, res, next) => {
  const id = req.params.id;
  const { titulo, director, anio, genero, descripcion } = req.body;

  try {
    await pool.query("BEGIN");

    const movieExists = await checkMovieExists(pool, id);
    if (!movieExists) {
      return res
        .status(404)
        .json({ error: `No se encontró la película con id ${id}` });
    }

    const updatedMovie = await updateMovieById(
      pool,
      id,
      titulo,
      director,
      anio,
      genero,
      descripcion
    );

    await pool.query("COMMIT");

    res.status(200).json({
      message: "Pelicula actualizada correctamente",
      data: updatedMovie,
    });
  } catch (error) {
    await pool.query("ROLLBACK");
    next(error);
  }
};

module.exports = {
  getMovies,
  getMovieById,
  createMovies,
  deleteMovie,
  updateMovie,
};
