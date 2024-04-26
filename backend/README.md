# Universo de Películas: Backend

Este proyecto es un sistema que permite explorar un universo de películas, incluye funcionalidades de búsqueda, visualización, registro, modificación y eliminación tanto de películas y series como de personajes. Se usan APIs REST para la comunicación entre el backend y el frontend.

## Variables de entorno

Este proyecto usa las siguientes variables de entorno:

| Nombre       | Descripción                                   | Valor por defecto  |
| ------------ | --------------------------------------------- | ------------------ |
| TZ           | Zona horaria de la BD                         | America/Bogota     |
| DB_HOST      | Servidor de la BD                             | db_server_movies   |
| DB_DATABASE  | Nombre de la BD                               | test               |
| DB_USER      | Usuario de la BD                              | user               |
| DB_PASSWORD  | Contraseña de la BD                           | guest              |
| DB_PORT      | Puerto de la BD                               | 3306               |
| APP_PORT     | Puerto del servidor backend                   | 8000               |
| DB_COLLATION | Propiedad de la BD para caracteres especiales | utf8mb4_unicode_ci |
| API_KEY      | Clave para encriptar                          | UN1V3R53T35T       |

## Pre-requisitos

- Tener instalado [Node.js](https://nodejs.org/en/) versión 20.11.0

## Iniciando la aplicación

- Clona el repositorio

```sh
git clone https://github.com/mortega7/movie_characters.git <directorio>
```

- Instala las dependencias

```sh
cd <directorio>/backend
npm install
```

- Renombra el archivo _.env.example_ a _.env_, y coloca los valores correctos

```sh
mv .env.example .env
```

- Ejecuta el proyecto

```sh
npm start
```

El backend queda funcionando en `http://localhost:8000` (o en el puerto correspondiente, si colocaste otro en el archivo _.env_)

# Contacto

Si tienes alguna pregunta o sugerencia sobre este proyecto, no dudes en ponerte en contacto conmigo a través de [morteguita@gmail.com](morteguita@gmail.com)

&copy; Manuel Ortega - 2024