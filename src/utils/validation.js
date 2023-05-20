const Joi = require("joi");

const movieSchema = Joi.object({
  titulo: Joi.string().required().trim(),
  director: Joi.string().required().trim(),
  anio: Joi.number()
    .required()
    .integer()
    .min(1800)
    .max(new Date().getFullYear()),
  genero: Joi.string().required().trim(),
  descripcion: Joi.string().required().trim(),
});

module.exports = {
  movieSchema,
};
