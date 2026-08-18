# Proyecto 5 - noSQL

API de películas con Express y MongoDB (mongoose). Es la continuación del
proyecto de ejemplo "Movies" de la lección, al que le he añadido el CRUD
completo (crear, modificar y borrar) y he movido las rutas a su propio
archivo.

## Cómo lo he organizado

```
models/Movie.js        el esquema de mongoose
routes/movie.routes.js  todas las rutas (antes estaban metidas en index.js)
utils/db.js             la conexión a mongo
seeds/movies.seed.js    carga las 6 películas de ejemplo
index.js                arranca express y monta las rutas
```

Moví las rutas a su propio archivo porque `index.js` se estaba quedando
muy largo con todos los `router.get(...)` metidos ahí, así que ahora
`index.js` solo arranca el servidor y conecta con la base de datos.

## Para probarlo

Hace falta tener MongoDB corriendo en local (`mongodb://localhost:27017`).

```
npm install
npm run seed    # carga las películas de ejemplo en la base de datos
npm start        # arranca el servidor en el puerto 3000
```

## Endpoints

- `GET /movies` — todas las películas
- `GET /movies/id/:id` — una película por su `_id`
- `GET /movies/title/:title` — películas por título
- `GET /movies/genre/:genre` — películas por género
- `GET /movies/year/:year` — películas estrenadas después de ese año
- `POST /movies` — crea una película nueva (body con title, director, year, genre)
- `PUT /movies/:id` — modifica una película existente
- `DELETE /movies/:id` — borra una película

## Manejo de errores

Si pides un `_id` que no existe (o que no tiene formato de ObjectId de
mongo) o intentas crear una película sin los campos obligatorios
(`title`, `director`, `genre`), la API no se cae: devuelve un código de
error (400 o 404, según el caso) con un mensaje explicando qué ha pasado,
en vez de un 500 en blanco.
