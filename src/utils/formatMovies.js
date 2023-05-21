const formatResults = (row) => {
  return {
    id_movie: row.id_movie,
    titulo: row.titulo,
    genero: row.genero,
    director: row.director,
    anio: row.anio,
    favorita: row.favorita,
    descripcion: row.descripcion,
    added_date: row.added_date,
  };
};

module.exports = {
  formatResults,
};
