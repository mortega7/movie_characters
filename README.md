# Universo de Películas

Este proyecto es un sistema que permite explorar un universo de películas, incluye funcionalidades de búsqueda, visualización, registro, modificación y eliminación tanto de películas y series como de personajes. Se usan APIs REST para la comunicación entre el backend y el frontend.

### Contenido del Repositorio

* frontend/: Contiene el código del frontend de la aplicación.
* backend/: Contiene el código del backend de la aplicación.
* sql_dump/: Contiene el dump inicial para la base de datos, están la estructura de las tablas y unos inserts básicos. También contiene la imagen con el MER (Modelo Entidad-Relación).
* .env.example: Archivo con las variables de entorno de la base de datos.
* docker-compose.yml: Archivo de configuración para orquestar contenedores Docker.
* README.md: Este archivo.

### Despliegue usando Docker

Para desplegar este proyecto en tu entorno local, sigue estos pasos:

* Asegúrate de tener Docker instalado en tu equipo.
* Clona este repositorio en tu equipo local.
```sh
git clone https://github.com/mortega7/movie_characters.git <directorio>
```
* Navega al directorio raíz del repositorio clonado.
```sh
cd <directorio>
```
* Renombra los archivos .env.example que se encuentran en el directorio raíz, en el directorio backend y en el directorio frontend, deben quedar como .env
```sh
mv backend/.env.example backend/.env
mv frontend/.env.example frontend/.env
```
* Coloca los valores de las variables de entorno de cada uno de estos archivos .env según la configuración que necesites. _NOTA:_ Los usuarios de la base de datos del .env de la raiz deben ser iguales a los del backend. Este usuario también te sirve para ingresar al phpMyAdmin.
* Ejecuta este comando en tu terminal.
```sh
docker-compose up
```
* Accede a la aplicación frontend en [http://localhost:3000](http://localhost:3000).
* El backend queda funcionando en [http://localhost:8000](http://localhost:8000).
* _Opcional:_ Puedes acceder al phpMyAdmin para visualizar la base de datos en [http://localhost:8102](http://localhost:8102).

### Tecnologías Utilizadas

* Backend: Node.js, Express y Sequelize.
* Frontend: React y Material UI.
* Base de Datos: MySQL.
* Contenedores: Docker.   

<p>&nbsp;</p>

## Distribución de tareas y tiempos estimados

## BACKEND
> **Estimación total:** 16 horas.

### Configuración del entorno de desarrollo
Configuración de Node.js, Express.js, Sequelize y otras dependencias.  
**Estimación:** 0.5 horas.

### Modelo de la base de datos
Creación de esquema, estructura e información de base de datos.  
**Estimación:** 2.5 horas.

### Implementación de la autenticación de usuarios
**Estimación:** 2 horas.  

- Registro: 1 hora.  
  **Endpoint:** POST /auth/register
- Generar Token: 1 hora.  
  **Endpoint:** POST /auth/login

### Desarrollo de CRUD para Personajes
**Estimación:** 5 horas.  

- Listado de personajes: 1 hora.    
  **Endpoint:** GET /characters
- Crear un personaje: 1 hora.      
  **Endpoint:** POST /characters/create
- Consultar un personaje: 1 hora.      
  **Endpoint:** GET /characters/:id
- Actualizar un personaje: 1 hora.      
  **Endpoint:** PUT /characters/:id
- Eliminar un personaje (eliminación suave): 1 hora.    
  **Endpoint:** DELETE /characters/:id

### Desarrollo de CRUD para Películas/Series
**Estimación:** 2.5 horas.  

- Listado de películas o series: 0.5 horas.      
  **Endpoint:** GET /movies
- Crear una película o serie: 0.5 horas.        
  **Endpoint:** POST /movies/create
- Consultar una película o serie: 0.5 horas.      
  **Endpoint:** GET /movies/:id
- Actualizar una película o serie: 0.5 horas.        
  **Endpoint:** PUT /movies/:id
- Eliminar una película o serie (eliminación suave): 0.5 horas.    
  **Endpoint:** DELETE /movies/:id

### Implementación de funcionalidades de búsqueda y filtrado
**Estimación:** 2 horas.

- Filtros de personajes: 1 hora.  
  **Endpoint:** GET /characters?name=nombre  
  **Endpoint:** GET /characters?age=edad  
  **Endpoint:** GET /characters?movies=idMovie  
  **Endpoint:** GET /characters?history=historia  
  **Endpoint:** GET /characters?weight=peso  
- Filtros de películas o series: 1 hora.  
  **Endpoint:** GET /movies?name=nombre  
  **Endpoint:** GET /movies?genre=idGenero  
  **Endpoint:** GET /movies?order=ASC | DESC  
  **Endpoint:** GET /movies?type=tipo

### Otros
**Estimación:** 0.5 horas.

- Listados de géneros y tipos: 0.5 horas.   
  **Endpoint:** GET /genres  
  **Endpoint:** GET /genres/:id  
  **Endpoint:** GET /mediatypes  

## FRONTEND
> **Estimación total:** 14 horas.

### Configuración del entorno de desarrollo
Configuración de React, React Router, Material UI y otras dependencias.  
**Estimación:** 0.5 horas.

### Plantilla principal y login
**Estimación:** 2 horas.

### Desarrollo de sección para Personajes
**Estimación:** 6.5 horas.  

- Listado de personajes: 2 horas.  
- Página de detalles del personaje: 1 hora.
- Formulario para crear/actualizar un personaje: 2 horas.  
- Eliminar un personaje: 0.5 horas.  
- Formulario de búsqueda de personajes: 1 hora.

### Desarrollo de sección para Películas o Series
**Estimación:** 3.5 horas.  

- Listado de películas o series: 1 hora.  
- Página de detalles de la película o serie: 0.5 horas.
- Formulario para crear/actualizar una película o serie: 1 hora.  
- Eliminar una película o serie: 0.5 horas.  
- Formulario de búsqueda de película o serie: 0.5 horas.

### Otros
**Estimación:** 1.5 horas

- Listado de géneros: 1 hora.  
- Página de detalles del género: 0.5 horas.

### DOCUMENTACIÓN
> **Estimación Total:** 2 horas.  

- Generación de archivos README.
- Presentación con la información relevante al proyecto.

<p>&nbsp;</p>

## Contacto

Si tienes alguna pregunta o sugerencia sobre este proyecto, no dudes en ponerte en contacto conmigo a través de [morteguita@gmail.com](morteguita@gmail.com)

&copy; Manuel Ortega - 2024