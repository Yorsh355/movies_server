# Sistema de Gestión de Películas

Este es un sistema de backend para administrar películas, con la capacidad de realizar operaciones como obtener todas las películas, obtener una película individual, agregar una nueva película, actualizar una película existente y eliminar una película. También cuenta con una sección de favoritos donde se pueden agregar y eliminar películas, y una sección de filtros por año, director, género y favoritas.

## Funcionalidades

- **Obtener todas las películas:**
  - Método: GET
  - Ruta: `/movies`
  - Descripción: Devuelve todas las películas almacenadas en la base de datos.

- **Obtener una película:**
  - Método: GET
  - Ruta: `/movies/{id}`
  - Descripción: Devuelve una película específica según su ID.

- **Agregar una nueva película:**
  - Método: POST
  - Ruta: `/movies`
  - Descripción: Agrega una nueva película a la base de datos.
  - Valida si existe una pelicula con los mismos datos, de ser asi no la crea.
  - Campos requeridos: título, director, anio, genero, descripcion.

- **Actualizar una película existente:**
  - Método: PUT
  - Ruta: `/movies/{id}`
  - Descripción: Actualiza una película existente según su ID.

- **Eliminar una película:**
  - Método: DELETE
  - Ruta: `/movies/{id}`
  - Descripción: Elimina una película específica según su ID.

- **Sección de favoritos:**
  - Agregar una película a favoritos:
    - Método: POST
    - Ruta: `/favorites`
    - Descripción: Agrega una película a la sección de favoritos.
  - Eliminar una película de favoritos:
    - Método: DELETE
    - Ruta: `/favorites/{id}`
    - Descripción: Elimina una película de la sección de favoritos.

- **Filtros:**
  - Método: GET
  - Ruta: `/movies/filter`
  - Descripción: Permite filtrar películas por anio, director, genero y favoritas. Se pueden usar uno o varios filtros combinados.

## Estructura del Proyecto

- La carpeta principal contiene los archivos de configuración y dependencias, como `.env`, `.gitignore`, `package-lock.json` y `package.json`.
- La carpeta `config` contiene el archivo `db.js`, que establece la conexión a la base de datos utilizando las variables de entorno definidas en `.env` para mayor seguridad.
- La carpeta `src` contiene la lógica principal del servidor Express.
- La carpeta `src/routes` contiene los archivos de enrutamiento, como `index.js`, `movies.js`, `favorites.js` y `filterMovies.js`, que definen las rutas y se conectan a los controladores correspondientes.
- La carpeta `src/controllers` contiene los controladores para cada ruta, como `movies.js`, `favorites.js` y `filterMovies.js`, que implementan la lógica de procesamiento de cada petición.
- La carpeta `src/middleware` contiene los middleware, como `errorMiddleware.js` y `convertToLowercase.js`, que manejan errores y realizan transformaciones en las rutas.
- La carpeta `src/utils` contiene archivos de utilidad, como `queryFavorites.js`, `queryMovies.js`, `format.js`, `normalize.js` y `validateYear.js`, que modularizan la lógica de consultas SQL, formateo de respuestas, normalización de strings y validación de campos.

## Instalación

1. Clona este repositorio en tu máquina local.
2. Ejecuta el comando `npm install` para instalar las dependencias.
3. Configura las variables de entorno en el archivo `.env`.
4. Ejecuta el comando `npm start` para iniciar el servidor.



# Creación tablas en Postgresql

Para crear las tablas en PostgreSQL, sigue estos pasos:

1. Abre una herramienta de administración de bases de datos, como pgAdmin o la línea de comandos de PostgreSQL.
2. Conéctate a tu servidor PostgreSQL utilizando las credenciales adecuadas.
3. Crea una nueva base de datos si aún no la tienes creada. Puedes usar el siguiente comando en la línea de comandos de PostgreSQL:

## Crear la base de datos:
CREATE DATABASE Movies;
   
## Tabla movies
## sql

CREATE TABLE Movies (
  id_movie serial NOT NULL,
  titulo VARCHAR(80) NOT NULL,
  director VARCHAR(50) NOT NULL,
  anio INTEGER NOT NULL,
  genero VARCHAR NOT NULL,
  descripcion TEXT NOT NULL,
  favorita BOOLEAN DEFAULT false,
  PRIMARY KEY (id_movie)
);

La tabla movies almacena la información de las películas, incluyendo su título, director, año, género, descripción y si es una película favorita o no. Utiliza una columna id_movie como clave primaria para identificar de manera única cada película.

## Tabla favorites
## sql

CREATE TABLE favorites (
  id_favorita serial NOT NULL,
  id_movie INTEGER NOT NULL,
  added_date DATE NOT NULL,
  PRIMARY KEY (id_favorita),
  FOREIGN KEY (id_movie) REFERENCES movies(id_movie)
);

La tabla favorites registra las películas marcadas como favoritas, enlazándolas con la tabla movies mediante la columna id_movie. También incluye la fecha en que se añadió la película como favorita en la columna added_date.


# JSON
{
        "titulo": "Stars Wars",
        "director": "Robert",
        "anio": 2000,
        "genero": "Ciencia Ficción",
        "descripcion": "Una saga espectacular"
    },
    {
        "titulo": "El señor de los anillos",
        "director": "Steven",
        "anio": 2010,
        "genero": "Fantasia",
        "descripcion": "Una saga espectacular"
    },
    {
        "titulo": "Juegos del Hambre 2",
        "director": "Steven",
        "anio": 2010,
        "genero": "Acción",
        "descripcion": "Muy regular"
    },
    {
        "titulo": "Intergalactico",
        "director": "Steven",
        "anio": 2010,
        "genero": "Ciencia ficción",
        "descripcion": "Muy regular",
    },
    {
        "titulo": "Intergalactico 2",
        "director": "Steven",
        "anio": 2010,
        "genero": "Ciencia ficción",
        "descripcion": "Muy regular",
    },
    {
        "titulo": "El resplandor",
        "director": "Steven",
        "anio": 2022,
        "genero": "Ciencia ficción",
        "descripcion": "Muy regular ok",
    }

## Contribución

Las contribuciones son bienvenidas. Si encuentras algún problema o tienes una mejora que proponer, por favor crea un "issue" o envía una solicitud de extracción.