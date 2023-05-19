const pool = require("../../config/db");
const Joi = require("joi");

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
    const schema = Joi.object({
      titulo: Joi.string().required(),
      director: Joi.string().required(),
      anio: Joi.number().required(),
      genero: Joi.string().required(),
      descripcion: Joi.string().required(),
    });

    const { error } = schema.validate(req.body);

    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    const { titulo, director, anio, genero, descripcion } = req.body;

    const response = await pool.query(
      "INSERT INTO movies (titulo, director, anio, genero, descripcion) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [titulo, director, anio, genero, descripcion]
    );

    const movie = response.rows[0];

    res.status(201).json({
      message: "Pelicula creada correctamente",
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

    // Verificar si la película existe
    const movieExists = await pool.query(
      "SELECT * FROM movies WHERE id_movie = $1",
      [id]
    );
    if (movieExists.rows.length === 0) {
      return res
        .status(404)
        .json({ error: `No se encontró la película con id ${id}` });
    }

    // Actualizar la película
    const response = await pool.query(
      "UPDATE movies SET  titulo = $1, director = $2, anio = $3, genero = $4, descripcion = $5 WHERE id_movie = $6 RETURNING *",
      [titulo, director, anio, genero, descripcion, id]
    );
    const updatedMovie = response.rows[0];

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
