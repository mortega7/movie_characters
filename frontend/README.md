# Universo de Películas: Frontend

Este proyecto es un sistema que permite explorar un universo de películas, incluye funcionalidades de búsqueda, visualización, registro, modificación y eliminación tanto de películas y series como de personajes. Se usan APIs REST para la comunicación entre el backend y el frontend.

## Variables de entorno

Este proyecto usa las siguientes variables de entorno:

| Nombre              | Descripción              | Valor por defecto          |
| ------------------- | ------------------------ | -------------------------- |
| REACT_APP_API_URL  | URL del servidor backend  | http://localhost:8000/api  |

## Pre-requisitos

- Tener instalado [Node.js](https://nodejs.org/en/) versión 20.11.0

## Iniciando la aplicación

- Clona el repositorio

```sh
git clone https://github.com/mortega7/movie_characters.git <directorio>
```

- Instala las dependencias

```sh
cd <directorio>/frontend
npm install
```

- Renombra el archivo _.env.example_ a _.env_, y coloca los valores correctos

```sh
mv .env.example .env
```

- Ejecuta el proyecto

```sh
npm run start
```

El frontend queda funcionando en `http://localhost:3000`

# Contacto

Si tienes alguna pregunta o sugerencia sobre este proyecto, no dudes en ponerte en contacto conmigo a través de [morteguita@gmail.com](morteguita@gmail.com)

&copy; Manuel Ortega - 2024