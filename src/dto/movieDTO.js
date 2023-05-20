class MovieDTO {
  constructor(id_movie, titulo, director, anio, genero, descripcion, favorita) {
    this.id_movie = id_movie;
    this.titulo = titulo;
    this.director = director;
    this.anio = anio;
    this.genero = genero;
    this.descripcion = descripcion;
    this.favorita = favorita;
  }

  static fromDatabaseRow(row) {
    return new MovieDTO(
      row.id_movie,
      row.titulo,
      row.director,
      row.anio,
      row.genero,
      row.descripcion,
      row.favorita
    );
  }

  toDatabaseObject() {
    return {
      id_movie: this.id_movie,
      titulo: this.titulo,
      director: this.director,
      anio: this.anio,
      genero: this.genero,
      descripcion: this.descripcion,
      favorita: this.favorita,
    };
  }
}

module.exports = MovieDTO;
