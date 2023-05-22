# Sistema de Gestión de Películas

Este es un sistema de backend para administrar películas, con la capacidad de realizar operaciones como obtener todas las películas, obtener una película individual, agregar una nueva película, actualizar una película existente y eliminar una película. También cuenta con una sección de favoritos donde se pueden agregar y eliminar películas, y una sección de filtros por año, director, género y favoritas.

## Funcionalidades

- http://localhost:4000/api/v1

- **Obtener todas las películas:**
  - Método: GET
  - Ruta: `/movies`
  - Descripción: La ruta recupera todas las películas de la base de datos y las devuelve como respuesta en formato JSON. Utiliza una conexión a la base de datos a través del módulo pool y ejecuta una consulta SQL para seleccionar todas las filas de la tabla "movies". Si la consulta es exitosa, se envían las películas como respuesta con un estado HTTP 200. En caso de error, se maneja el error para su posterior procesamiento. Se requiere configurar la conexión a la base de datos y asegurarse de tener los módulos necesarios instalados para su funcionamiento adecuado.

- **Obtener una película:**
  - Método: GET
  - Ruta: `/movies/{id}`
  - Descripción: La ruta permite obtener una película específica de la base de datos según su ID. Utiliza una conexión a la base de datos a través del módulo pool y ejecuta una consulta SQL para seleccionar la película correspondiente al ID proporcionado. Si no se encuentra ninguna película con ese ID, se devuelve un error con un estado HTTP 404. En caso de éxito, se devuelve la película como respuesta en formato JSON con un estado HTTP 200. Si ocurre un error durante la consulta, se maneja para su posterior procesamiento. 

- **Agregar una nueva película:**
  - Método: POST
  - Ruta: `/movies`
  - Descripción: La ruta permite crear una nueva película en la base de datos. Se valida la información recibida en la solicitud y se verifica si la película ya existe. Si la validación es exitosa y la película no existe, se inserta en la base de datos. Se devuelve una respuesta con un estado HTTP 201 y un mensaje indicando el éxito de la creación, junto con los datos de la película. Si hay errores de validación, se devuelve una respuesta de estado HTTP 400 con el mensaje de error correspondiente. Si la película ya existe, se devuelve una respuesta de estado HTTP 409. En caso de error durante el proceso, se maneja para su posterior procesamiento.

- **Actualizar una película existente:**
  - Método: PUT
  - Ruta: `/movies/{id}`
  - Descripción: La ruta permite actualizar una película existente en la base de datos. Se obtiene el ID de la película y los datos actualizados de la solicitud. Se inicia una transacción para asegurar la consistencia de las actualizaciones. Se verifica si la película existe y, en caso contrario, se devuelve un error con estado HTTP 404. Se actualiza la película en la base de datos con los datos proporcionados. Se confirma la transacción y se devuelve una respuesta con estado HTTP 200 y un mensaje de éxito, junto con los datos actualizados de la película. En caso de error, se realiza un rollback de la transacción y se pasa el error para su posterior manejo. Es necesario contar con la configuración de la conexión a la base de datos y las funciones checkMovieExists y updateMovieById implementadas, así como los módulos necesarios para el correcto funcionamiento de la función.

- **Eliminar una película:**
  - Método: DELETE
  - Ruta: `/movies/{id}`
  - Descripción: La ruta permite eliminar una película de la base de datos. Se valida el ID proporcionado para asegurarse de que sea un número válido. Se ejecuta una consulta SQL para eliminar la película utilizando el ID. Si la eliminación es exitosa y afecta una fila en la base de datos, se devuelve una respuesta con estado HTTP 200 y un mensaje de éxito. Si la eliminación no afecta ninguna fila, se devuelve un error con estado HTTP 404 indicando que la película no existe. En caso de error durante el proceso, se maneja para su posterior procesamiento. Es importante configurar correctamente la conexión a la base de datos y validar el ID antes de realizar la eliminación.
  
- **Obtener favoritos:**
  - Método: GET
  - Ruta: `/movies`
  - Descripción: La ruta recupera la lista de películas favoritas desde una base de datos. Se ejecuta una consulta SQL para obtener los favoritos y se verifica si existen resultados. Si no se encontraron favoritos, se devuelve un error con estado HTTP 404. Luego, los resultados se formatean según el formato deseado y se devuelven en una respuesta de éxito con estado HTTP 200. En caso de error durante el proceso, se maneja para su posterior procesamiento. 
   
-  **Agregar una película a favoritos:**
    - Método: POST
    - Ruta: `/favorites`
    - Descripción: La ruta permite agregar una película a la lista de favoritos en la base de datos. Se verifica si la película existe y si ya está marcada como favorita. Si la película no existe, se devuelve un error con estado HTTP 404. Si la película ya está en favoritos, se devuelve un error con estado HTTP 400. En caso contrario, se agrega la película a la lista de favoritos y se devuelve una respuesta de éxito con estado HTTP 200. En caso de error durante el proceso, se maneja para su posterior procesamiento.
  
-  **Eliminar una película de favoritos:**
    - Método: DELETE
    - Ruta: `/favorites/{id}`
    - Descripción: La ruta elimina una película de la lista de favoritos en la base de datos. Se verifica si la película está marcada como favorita y, en caso contrario, se devuelve un error con estado HTTP 404 indicando que la película no está en favoritos. Luego, se elimina la película de la lista de favoritos en la base de datos utilizando las funciones correspondientes. Además, se actualiza el estado de la película. Finalmente, se devuelve una respuesta de éxito con estado HTTP 200 y un mensaje indicando que la película ha sido eliminada de favoritos correctamente. En caso de error durante el proceso, se maneja para su posterior procesamiento.

- **Filtros:**
  - Método: GET
  - Ruta: `/filterMovies`
  - Descripción: El filtro de películas es una ruta que permite buscar y filtrar películas en la base de datos. Se pueden aplicar filtros por año, género, director y favorita. La función recibe una solicitud HTTP y devuelve una respuesta JSON con las películas que coinciden con los filtros. Si no se encuentran películas que cumplan con los filtros, se devuelve un mensaje de error. La función utiliza consultas dinámicas y parámetros para garantizar la seguridad y prevenir ataques de inyección de SQL. Es necesario configurar la conexión a la base de datos y asegurarse de tener los módulos necesarios instalados.

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