const pool = require("../../config/db");
const { normalizeString } = require("../utils/normalize");
const { isValidYear } = require("../utils/ValidateYear");

const filterMovies = async (req, res, next) => {
  try {
    //Marcador de posición para la consulta dinamica
    let query = "SELECT * FROM movies WHERE 1=1";
    const queryParams = [];

    let paramIndex = 1; // Índice inicial para los parámetros

    if (req.query.anio && !isNaN(req.query.anio)) {
      const anio = parseInt(req.query.anio);

      if (!isValidYear(anio)) {
        return res.status(400).json({
          error: "El valor del año debe estar entre 1801 y el año actual.",
        });
      }

      query += ` AND anio = $${paramIndex}`;
      queryParams.push(anio);
      paramIndex++;
    }

    if (req.query.genero) {
      const genero = normalizeString(req.query.genero);
      query += ` AND LOWER(unaccent(genero)) = $${paramIndex}`;
      queryParams.push(genero);
      paramIndex++;
    }

    if (req.query.director) {
      const director = normalizeString(req.query.director);
      query += ` AND LOWER(unaccent(director)) = $${paramIndex}`;
      queryParams.push(director);
      paramIndex++;
    }

    if (req.query.favorita) {
      const favoritas = req.query.favorita.toLowerCase();
      if (favoritas === "true" || favoritas === "false") {
        query += ` AND favorita = $${paramIndex}`;
        queryParams.push(favoritas === "true");
        paramIndex++;
      }
    }

    const result = await pool.query(query, queryParams);

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "No se encontraron películas con los filtros proporcionados",
      });
    }

    return res.status(200).json(result.rows);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  filterMovies,
};
